import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime, titleCase } from "@/lib/formatters";
import { getUserMessages } from "@/lib/mock-data";

export default async function MessagesPage() {
  const messages = await getUserMessages();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Messages</p>
        <h2 className="mt-2 text-4xl font-black italic tracking-tight">Concierge inbox</h2>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id} className="rounded-xl border-white/70 bg-white/75">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-lg font-bold">{message.subject}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{message.preview}</p>
                  <p className="mt-3 text-xs font-medium text-[#5a413a]">
                    {message.from} • {formatDateTime(message.receivedAt)}
                  </p>
                </div>
                <Badge variant={message.status === "unread" ? "default" : "outline"}>{titleCase(message.status)}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
