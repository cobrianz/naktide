"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import type { Adventure } from "@/api/adventures";

type BookingDraft = {
  phone: string;
  partySize: string;
  leadTraveler: string;
  companions: string;
  travelDate: string;
  notes: string;
};

function parsePrice(price: string) {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

function toInputDate(value: string) {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return "";
  return new Date(parsed).toISOString().slice(0, 10);
}

function draftKey(adventureId: string) {
  return `naktide-booking-draft:${adventureId}`;
}

export default function BookingModal({ isOpen, onClose, adventure }: { isOpen: boolean; onClose: () => void; adventure: Adventure }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState("1");
  const [leadTraveler, setLeadTraveler] = useState("");
  const [companions, setCompanions] = useState("");
  const [travelDate, setTravelDate] = useState(toInputDate(adventure.date));
  const [notes, setNotes] = useState("");

  const amount = useMemo(() => parsePrice(adventure.price) * Math.max(Number(partySize) || 1, 1), [adventure.price, partySize]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem(draftKey(adventure.id));
    if (!raw) return;
    try {
      const draft = JSON.parse(raw) as Partial<BookingDraft>;
      setPhone(draft.phone ?? "");
      setPartySize(draft.partySize ?? "1");
      setLeadTraveler(draft.leadTraveler ?? "");
      setCompanions(draft.companions ?? "");
      setTravelDate(draft.travelDate ?? toInputDate(adventure.date));
      setNotes(draft.notes ?? "");
    } catch {
      window.sessionStorage.removeItem(draftKey(adventure.id));
    }
  }, [adventure.date, adventure.id, isOpen]);

  if (!isOpen) return null;

  function currentDraft(): BookingDraft {
    return { phone, partySize, leadTraveler, companions, travelDate, notes };
  }

  function persistDraft() {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(draftKey(adventure.id), JSON.stringify(currentDraft()));
  }

  function clearDraft() {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(draftKey(adventure.id));
  }

  function handleClose() {
    if (isSubmitting) return;
    onClose();
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      const travelers = [leadTraveler, ...companions.split("\n")].map((name) => name.trim()).filter(Boolean);
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adventureId: adventure.id,
          travelDate,
          partySize: Math.max(Number(partySize) || 1, 1),
          travelers,
          phone,
          notes,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          persistDraft();
          const callback = `${pathname}?book=1`;
          toast.error("Sign in to continue your booking.");
          router.push(`/auth/login?callback=${encodeURIComponent(callback)}`);
          return;
        }
        throw new Error(payload.error || "Unable to create booking.");
      }

      clearDraft();
      toast.success(`Booking ${payload.data.reference} created successfully.`);
      onClose();
      router.push(`/dashboard/bookings/${payload.data.id}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create booking.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-on-surface/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="fixed left-1/2 top-1/2 z-[110] flex w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-2xl md:h-[700px] md:flex-row">
        <div className="relative hidden w-2/5 overflow-hidden bg-surface-dim md:block">
          <img alt={adventure.altText} className="absolute inset-0 h-full w-full object-cover" src={adventure.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <span className="mb-2 block font-label text-xs uppercase tracking-[0.15rem] text-primary-fixed">NakTide Booking</span>
            <h1 className="font-headline text-3xl font-black leading-tight tracking-tighter text-white">Reserve {adventure.title}</h1>
            <p className="mt-3 text-sm leading-6 text-white/75">If you need to sign in first, NakTide will bring you straight back here with your booking details restored.</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto bg-surface-container-lowest p-8 md:p-12">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Booking checkout</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Submit your safari request with traveler details and a primary contact number.</p>
            </div>
            <button onClick={handleClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:text-primary" type="button">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border-b-2 border-outline-variant/20 bg-surface-container-low p-5">
              <span className="mb-1 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Departure</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                <span className="font-headline text-lg font-bold">{adventure.date}</span>
              </div>
            </div>
            <div className="rounded-lg border-b-2 border-outline-variant/20 bg-surface-container-low p-5">
              <span className="mb-1 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Duration</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">schedule</span>
                <span className="font-headline text-lg font-bold text-secondary">{adventure.duration}</span>
              </div>
            </div>
            <div className="col-span-2 flex items-end justify-between rounded-lg border border-outline-variant/10 bg-surface-container-highest p-6">
              <div>
                <span className="mb-1 block font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Estimated total</span>
                <p className="text-xs text-on-surface-variant">Based on {Math.max(Number(partySize) || 1, 1)} traveler{Math.max(Number(partySize) || 1, 1) > 1 ? "s" : ""}</p>
              </div>
              <div className="text-right">
                <span className="font-headline text-4xl font-black tracking-tighter text-primary">{formatCurrency(amount)}</span>
              </div>
            </div>
          </div>

          <div className="grid flex-grow gap-4">
            <div className="grid gap-2">
              <label htmlFor="booking-phone" className="font-label text-xs font-bold uppercase tracking-wide text-on-surface-variant">Phone number</label>
              <input id="booking-phone" className="rounded-lg border border-outline-variant/25 bg-surface-container-high px-4 py-3 outline-none focus:border-primary" placeholder="+254 712 345 678" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} disabled={isSubmitting} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="booking-party" className="font-label text-xs font-bold uppercase tracking-wide text-on-surface-variant">Party size</label>
                <input id="booking-party" className="rounded-lg border border-outline-variant/25 bg-surface-container-high px-4 py-3 outline-none focus:border-primary" type="number" min="1" value={partySize} onChange={(event) => setPartySize(event.target.value)} disabled={isSubmitting} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="booking-date" className="font-label text-xs font-bold uppercase tracking-wide text-on-surface-variant">Travel date</label>
                <input id="booking-date" className="rounded-lg border border-outline-variant/25 bg-surface-container-high px-4 py-3 outline-none focus:border-primary" type="date" value={travelDate} onChange={(event) => setTravelDate(event.target.value)} disabled={isSubmitting} />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="booking-lead" className="font-label text-xs font-bold uppercase tracking-wide text-on-surface-variant">Lead traveler</label>
              <input id="booking-lead" className="rounded-lg border border-outline-variant/25 bg-surface-container-high px-4 py-3 outline-none focus:border-primary" placeholder="Lead traveler name" type="text" autoComplete="name" value={leadTraveler} onChange={(event) => setLeadTraveler(event.target.value)} disabled={isSubmitting} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="booking-companions" className="font-label text-xs font-bold uppercase tracking-wide text-on-surface-variant">Additional travelers</label>
              <textarea id="booking-companions" className="min-h-28 rounded-lg border border-outline-variant/25 bg-surface-container-high px-4 py-3 outline-none focus:border-primary" placeholder="One traveler name per line" value={companions} onChange={(event) => setCompanions(event.target.value)} disabled={isSubmitting} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="booking-notes" className="font-label text-xs font-bold uppercase tracking-wide text-on-surface-variant">Notes</label>
              <textarea id="booking-notes" className="min-h-28 rounded-lg border border-outline-variant/25 bg-surface-container-high px-4 py-3 outline-none focus:border-primary" placeholder="Dietary notes, special requests, flight timing, room setup" value={notes} onChange={(event) => setNotes(event.target.value)} disabled={isSubmitting} />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-outline-variant/10 pt-6">
            <button onClick={handleSubmit} disabled={isSubmitting} className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-[#ad2c00] to-[#d34011] py-4 font-headline text-lg font-extrabold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-primary/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60" type="button">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              {isSubmitting ? "Submitting booking..." : "Create booking"}
            </button>
            <p className="text-center text-[10px] font-medium uppercase tracking-tight text-on-surface-variant/60">Your booking is saved to NakTide operations and linked to your account.</p>
          </div>
        </div>
      </div>
    </>
  );
}
