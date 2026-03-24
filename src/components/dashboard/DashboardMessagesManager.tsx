"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { MessageStatus, UserMessage } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTime, titleCase } from "@/lib/formatters";

const filters: Array<{ label: string; value: MessageStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Replied", value: "replied" },
  { label: "Archived", value: "archived" },
];

export function DashboardMessagesManager({ initialMessages }: { initialMessages: UserMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [activeId, setActiveId] = useState(initialMessages[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<MessageStatus | "all">("all");
  const [composeForm, setComposeForm] = useState({ subject: "", body: "", bookingId: "" });
  const [replyBody, setReplyBody] = useState("");

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesFilter = filter === "all" || message.status === filter;
      const haystack = `${message.subject} ${message.preview} ${message.body} ${message.from} ${message.to ?? ""}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, messages, query]);

  const activeMessage = useMemo(() => {
    return filteredMessages.find((message) => message.id === activeId) ?? filteredMessages[0] ?? null;
  }, [activeId, filteredMessages]);

  async function updateMessage(id: string, partial: Partial<UserMessage>) {
    const response = await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...partial }),
    });
    const payload = await response.json();
    if (!payload.data) return;
    setMessages((current) => current.map((message) => (message.id === id ? payload.data : message)));
  }

  async function sendMessage() {
    if (!composeForm.subject.trim() || !composeForm.body.trim()) return;

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: composeForm.subject,
        body: composeForm.body,
        from: "Julian Alexander Vance",
        to: "NakTide Concierge",
        status: "unread",
        bookingId: composeForm.bookingId || undefined,
      }),
    });
    const payload = await response.json();
    if (!payload.data) return;
    setMessages((current) => [payload.data, ...current]);
    setActiveId(payload.data.id);
    setComposeForm({ subject: "", body: "", bookingId: "" });
  }

  async function sendReply() {
    if (!activeMessage || !replyBody.trim()) return;

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: `Re: ${activeMessage.subject}`,
        body: replyBody,
        from: "Julian Alexander Vance",
        to: activeMessage.from,
        status: "replied",
        bookingId: activeMessage.bookingId,
      }),
    });
    const payload = await response.json();
    if (!payload.data) return;

    await updateMessage(activeMessage.id, { status: "replied" });
    setMessages((current) => [payload.data, ...current]);
    setReplyBody("");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="rounded-xl border-white/70 bg-white/75">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/60">Inbox</p>
              <p className="mt-1 text-sm text-muted-foreground">Traveler support, operations updates, and booking-linked threads.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{messages.filter((message) => message.status === "unread").length} unread</span>
              <span>{messages.length} total</span>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_160px]">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search subject, sender, or booking" />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as MessageStatus | "all")}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
            >
              {filters.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 space-y-3">
            {filteredMessages.length ? filteredMessages.map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => {
                  setActiveId(message.id);
                  if (message.status === "unread") {
                    void updateMessage(message.id, { status: "replied" });
                  }
                }}
                className={`w-full rounded-xl border p-4 text-left transition ${activeId === message.id ? "border-primary bg-primary/5" : "border-black/10 bg-white hover:border-primary/30"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[#1a1c19]">{message.subject}</p>
                      {message.bookingId ? <Badge variant="outline">{message.bookingId}</Badge> : null}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{message.preview}</p>
                    <p className="mt-3 text-xs font-medium text-[#5a413a]">{message.from} | {formatDateTime(message.receivedAt)}</p>
                  </div>
                  <Badge variant={message.status === "unread" ? "default" : "outline"}>{titleCase(message.status)}</Badge>
                </div>
              </button>
            )) : (
              <div className="rounded-xl border border-dashed border-black/10 bg-white p-6 text-sm text-muted-foreground">
                No messages match the current filter.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="rounded-xl border-white/70 bg-white/75">
          <CardContent className="p-6">
            {activeMessage ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Selected thread</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">{activeMessage.subject}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">From {activeMessage.from} to {activeMessage.to ?? "you"}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="rounded-lg" onClick={() => updateMessage(activeMessage.id, { status: "archived" })}>Archive</Button>
                    <Button className="rounded-lg bg-primary text-white" onClick={() => updateMessage(activeMessage.id, { status: "replied" })}>Mark handled</Button>
                  </div>
                </div>

                <div className="grid gap-3 rounded-xl border border-black/10 bg-[#fbf8f2] p-4 md:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Received</p>
                    <p className="mt-2 text-sm text-[#1a1c19]">{formatDateTime(activeMessage.receivedAt)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Status</p>
                    <p className="mt-2 text-sm text-[#1a1c19]">{titleCase(activeMessage.status)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Linked booking</p>
                    {activeMessage.bookingId ? (
                      <Link href={`/dashboard/bookings/${activeMessage.bookingId}`} className="mt-2 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline">
                        Open {activeMessage.bookingId}
                      </Link>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">General account thread</p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl bg-black/5 p-4">
                  <p className="text-sm leading-7 text-muted-foreground">{activeMessage.body}</p>
                </div>

                <div className="grid gap-3 rounded-xl border border-black/10 bg-white p-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Quick reply</p>
                    <p className="mt-2 text-sm text-muted-foreground">Reply directly to this thread and keep the booking context attached.</p>
                  </div>
                  <Textarea value={replyBody} onChange={(event) => setReplyBody(event.target.value)} placeholder="Reply to concierge or operations here." />
                  <Button className="w-full rounded-lg bg-primary text-white sm:w-auto" onClick={sendReply}>Send reply</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No messages available.</p>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-xl border-white/70 bg-white/75">
          <CardContent className="grid gap-4 p-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Compose</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">Start a new concierge thread</h3>
            </div>
            <Input value={composeForm.subject} onChange={(event) => setComposeForm({ ...composeForm, subject: event.target.value })} placeholder="Subject" />
            <Input value={composeForm.bookingId} onChange={(event) => setComposeForm({ ...composeForm, bookingId: event.target.value })} placeholder="Optional booking ID" />
            <Textarea value={composeForm.body} onChange={(event) => setComposeForm({ ...composeForm, body: event.target.value })} placeholder="Ask about itinerary changes, receipts, rooming, permits, or special requests." />
            <Button className="rounded-lg bg-primary text-white" onClick={sendMessage}>Send message</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
