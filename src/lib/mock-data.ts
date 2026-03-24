
import type { Adventure } from "@/api/adventures";
import { getCurrentSession } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import * as seedSource from "@/lib/seed-data";

export type {
  AdminCustomer,
  AdminSettings,
  AnalyticsDatum,
  BillingRecord,
  BlogPost,
  Booking,
  BookingStatus,
  InventoryItem,
  InventoryStatus,
  MediaAsset,
  MessageStatus,
  PublicContentSnapshot,
  SiteNotification,
  UserMessage,
  UserProfile,
  UserSettings,
  WishlistItem,
} from "@/lib/seed-data";

import type {
  AdminCustomer,
  AdminSettings,
  AnalyticsDatum,
  BillingRecord,
  BlogPost,
  Booking,
  InventoryItem,
  MediaAsset,
  PublicContentSnapshot,
  SiteNotification,
  UserMessage,
  UserProfile,
  UserSettings,
  WishlistItem,
} from "@/lib/seed-data";

type UserRecord = {
  id: string;
  email: string;
  name: string;
  role: "traveler" | "admin";
  passwordHash: string;
};

type OperationsFeedItem = {
  id: string;
  title: string;
  at: string;
  kind: string;
};

let seedPromise: Promise<void> | null = null;

function toPlainValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => toPlainValue(item)) as T;
  }

  if (value instanceof Date) {
    return value.toISOString() as T;
  }

  if (value && typeof value === "object") {
    const candidate = value as { toHexString?: () => string };
    if (typeof candidate.toHexString === "function") {
      return candidate.toHexString() as T;
    }

    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => key !== "_id")
        .map(([key, nestedValue]) => [key, toPlainValue(nestedValue)]),
    ) as T;
  }

  return value;
}

async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const db = await getDb();
      const meta = db.collection<{ key: string; seededAt: string }>("meta");
      const existing = await meta.findOne({ key: "seed-v1" });
      if (existing) return;

      const profile = await seedSource.getUserProfile();
      const messages = await seedSource.getUserMessages();
      const bookings = await seedSource.getUserBookings();
      const wishlist = await seedSource.getWishlist();
      const settings = await seedSource.getUserSettings();
      const customers = await seedSource.getAdminCustomers();
      const inventory = await seedSource.getInventory();
      const adminSettings = await seedSource.getAdminSettings();
      const tours = await seedSource.getCatalogue();
      const notifications = await seedSource.getSiteNotifications();
      const media = await seedSource.getMediaAssets();
      const billing = await seedSource.getBillingRecords();
      const analytics = await seedSource.getAnalytics();
      const blogs = await seedSource.getBlogPosts();
      const ops = await seedSource.getOperationsFeed();

      await db.collection<UserRecord>("users").insertMany([
        {
          id: profile.id,
          email: profile.email.toLowerCase(),
          name: profile.name,
          role: "traveler",
          passwordHash: hashPassword("Traveler123!"),
        },
        {
          id: "admin-001",
          email: "admin@naktide.com",
          name: "NakTide Admin",
          role: "admin",
          passwordHash: hashPassword("Admin123!"),
        },
      ]);

      await db.collection<UserProfile>("userProfiles").insertOne(profile);
      await db.collection<UserMessage>("messages").insertMany(messages.map((item) => ({ ...item, userId: profile.id })) as (UserMessage & { userId: string })[]);
      await db.collection<Booking>("bookings").insertMany(bookings);
      await db.collection<WishlistItem>("wishlist").insertMany(wishlist.map((item) => ({ ...item, userId: profile.id })) as (WishlistItem & { userId: string })[]);
      await db.collection<UserSettings & { userId: string }>("userSettings").insertOne({ ...settings, userId: profile.id });
      await db.collection<AdminCustomer>("adminCustomers").insertMany(customers);
      await db.collection("inventory").insertMany(inventory);
      await db.collection<AdminSettings>("adminSettings").insertOne(adminSettings);
      await db.collection<Adventure>("adventures").insertMany(tours);
      await db.collection<SiteNotification>("siteNotifications").insertMany(notifications);
      await db.collection<MediaAsset>("mediaAssets").insertMany(media);
      await db.collection<BillingRecord>("billingRecords").insertMany(billing);
      await db.collection<AnalyticsDatum>("analytics").insertMany(analytics);
      await db.collection<BlogPost>("blogPosts").insertMany(blogs);
      await db.collection<OperationsFeedItem>("operationsFeed").insertMany(ops);
      await meta.insertOne({ key: "seed-v1", seededAt: new Date().toISOString() });
    })();
  }

  return seedPromise;
}

async function requireSession() {
  await ensureSeeded();
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return session;
}

async function currentUserId() {
  return (await requireSession()).userId;
}

function now() {
  return new Date().toISOString();
}

function id(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

async function dataDb() {
  await ensureSeeded();
  return getDb();
}


export async function bootstrapTravelerAccount(input: { userId: string; name: string; email: string; location?: string }) {
  await ensureSeeded();
  const db = await dataDb();
  const profile: UserProfile = {
    id: input.userId,
    name: input.name,
    firstName: input.name.split(" ")[0] ?? input.name,
    tier: "Voyager",
    email: input.email.toLowerCase(),
    phone: "",
    location: input.location || "Kenya",
    avatar: "https://i.pravatar.cc/200?img=32",
    memberSince: now().slice(0, 10),
    rewardPoints: 0,
    nextJourneyWindow: "Planning in progress",
  };

  await db.collection<UserProfile>("userProfiles").insertOne(profile);
  await db.collection<UserSettings & { userId: string }>("userSettings").insertOne({
    userId: input.userId,
    notifications: { expeditionAlerts: true, paymentUpdates: true, weeklyDigest: false },
    preferences: { preferredCurrency: "KES", preferredRegion: "East Africa", travelStyle: "Custom safari planning" },
  });
  await db.collection<AdminCustomer>("adminCustomers").insertOne({
    id: `customer-${Date.now()}`,
    name: input.name,
    email: input.email.toLowerCase(),
    phone: "",
    tier: "Voyager",
    lifetimeValue: 0,
    activeBookings: 0,
    lastSeen: now(),
  });
  await db.collection<UserMessage & { userId: string }>("messages").insertOne({
    id: id("msg"),
    userId: input.userId,
    subject: "Welcome to NakTide",
    preview: "Your account is ready for safari planning.",
    body: "Your traveler account is active. You can now manage bookings, messages, and receipts from your dashboard.",
    from: "NakTide Concierge",
    to: input.name,
    receivedAt: now(),
    status: "unread",
  });
}

export async function getUserProfile(): Promise<UserProfile> {
  const db = await dataDb();
  const profile = await db.collection<UserProfile>("userProfiles").findOne({ id: await currentUserId() });
  if (!profile) throw new Error("Profile not found");
  return toPlainValue(profile);
}

export async function getUserMessages() {
  const db = await dataDb();
  const messages = await db.collection<UserMessage & { userId: string }>("messages").find({ userId: await currentUserId() }).sort({ receivedAt: -1 }).toArray();
  return toPlainValue(messages);
}

export async function createUserMessage(payload: Omit<UserMessage, "id" | "receivedAt" | "preview"> & { preview?: string }) {
  const db = await dataDb();
  const message = { ...payload, userId: await currentUserId(), id: id("msg"), receivedAt: now(), preview: payload.preview ?? payload.body.slice(0, 88) };
  await db.collection<UserMessage & { userId: string }>("messages").insertOne(message);
  return message;
}

export async function createMessageForUser(userId: string, payload: Omit<UserMessage, "id" | "receivedAt" | "preview"> & { preview?: string }) {
  const db = await dataDb();
  const message = { ...payload, userId, id: id("msg"), receivedAt: now(), preview: payload.preview ?? payload.body.slice(0, 88) };
  await db.collection<UserMessage & { userId: string }>("messages").insertOne(message);
  return message;
}

export async function updateUserMessage(idValue: string, partial: Partial<UserMessage>) {
  const db = await dataDb();
  await db.collection<UserMessage & { userId: string }>("messages").updateOne({ id: idValue }, { $set: partial });
  return toPlainValue(await db.collection<UserMessage & { userId: string }>("messages").findOne({ id: idValue }));
}

export async function getUserBookings() {
  const session = await requireSession();
  const db = await dataDb();
  if (session.role === "admin") {
    return toPlainValue(await db.collection<Booking>("bookings").find({}).sort({ travelDate: 1 }).toArray());
  }
  return toPlainValue(await db.collection<Booking>("bookings").find({ customerId: session.userId }).sort({ travelDate: 1 }).toArray());
}

export async function getBookingById(idValue: string) {
  const db = await dataDb();
  const booking = await db.collection<Booking>("bookings").findOne({ id: idValue });
  const session = await requireSession();
  if (session.role !== "admin" && booking?.customerId !== session.userId) return undefined;
  return booking ? toPlainValue(booking) : undefined;
}

function parseBookingAmount(price: string, partySize: number) {
  const numeric = Number(price.replace(/[^0-9.]/g, "")) || 0;
  return numeric * Math.max(partySize, 1);
}

function normalizeTravelDate(value: string) {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return now().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}

function bookingReference(title: string) {
  const code = title
    .split(/\s+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");
  return `NKT-${code}-${String(Date.now()).slice(-4)}`;
}

export async function createBooking(payload: {
  adventureId: string;
  travelDate?: string;
  partySize: number;
  travelers: string[];
  phone: string;
  notes?: string;
}) {
  const session = await requireSession();
  if (session.role !== "traveler") {
    throw new Error("Only traveler accounts can create bookings.");
  }

  const db = await dataDb();
  const settings = await getAdminSettings();
  if (!settings.allowPublicBookings) {
    throw new Error("Public bookings are currently disabled.");
  }

  const adventure = await db.collection<Adventure>("adventures").findOne({ id: payload.adventureId });
  if (!adventure || adventure.status !== "upcoming") {
    throw new Error("That safari is no longer available for booking.");
  }

  const profile = await getUserProfile();
  const partySize = Math.max(payload.partySize || 1, 1);
  const travelerNames = payload.travelers.map((traveler) => traveler.trim()).filter(Boolean);
  const booking: Booking = {
    id: id("booking"),
    reference: bookingReference(adventure.title),
    adventureId: adventure.id,
    adventureTitle: adventure.title,
    location: adventure.location,
    travelDate: normalizeTravelDate(payload.travelDate || adventure.date),
    partySize,
    amount: parseBookingAmount(adventure.price, partySize),
    currency: "KES",
    status: settings.requireManualReview ? "pending" : "confirmed",
    image: adventure.image,
    customerId: session.userId,
    customerName: profile.name,
    travelers: travelerNames.length ? travelerNames : [profile.name],
    notes: [payload.notes?.trim(), payload.phone.trim() ? `Primary contact: ${payload.phone.trim()}` : ""].filter(Boolean).join("\n\n"),
  };

  await db.collection<Booking>("bookings").insertOne(booking);
  await db.collection<AdminCustomer>("adminCustomers").updateOne(
    { email: profile.email.toLowerCase() },
    {
      $setOnInsert: { id: id("customer"), email: profile.email.toLowerCase(), activeBookings: 0, lifetimeValue: 0 },
      $set: { name: profile.name, phone: payload.phone.trim(), tier: profile.tier, lastSeen: now() },
      $inc: { activeBookings: booking.status === "cancelled" || booking.status === "completed" ? 0 : 1, lifetimeValue: booking.amount },
    },
    { upsert: true },
  );
  await db.collection<UserMessage & { userId: string }>("messages").insertOne({
    id: id("msg"),
    userId: session.userId,
    subject: `Booking received: ${adventure.title}`,
    preview: `Reference ${booking.reference} is now ${booking.status}.`,
    body: settings.requireManualReview
      ? `We received your booking request for ${adventure.title}. Reference ${booking.reference} is pending manual review by the Nairobi desk.`
      : `Your booking for ${adventure.title} is confirmed. Reference ${booking.reference} is ready in your traveler dashboard.`,
    from: "NakTide Bookings",
    to: profile.name,
    receivedAt: now(),
    status: "unread",
    bookingId: booking.id,
  });

  return booking;
}

export async function getWishlist() {
  const db = await dataDb();
  const wishlist = await db.collection<WishlistItem & { userId: string }>("wishlist").find({ userId: await currentUserId() }).toArray();
  return toPlainValue(wishlist);
}

export async function getUserSettings(): Promise<UserSettings> {
  const db = await dataDb();
  const userId = await currentUserId();
  const doc = await db.collection<UserSettings & { userId: string }>("userSettings").findOne({ userId });
  if (doc) return { notifications: doc.notifications, preferences: doc.preferences };
  const fallback: UserSettings = { notifications: { expeditionAlerts: true, paymentUpdates: true, weeklyDigest: false }, preferences: { preferredCurrency: "KES", preferredRegion: "East Africa", travelStyle: "Custom safari planning" } };
  await db.collection<UserSettings & { userId: string }>("userSettings").insertOne({ userId, ...fallback });
  return fallback;
}

export async function updateUserSettings(partial: Partial<UserSettings>) {
  const db = await dataDb();
  const userId = await currentUserId();
  const current = await getUserSettings();
  const next = {
    notifications: { ...current?.notifications, ...partial.notifications },
    preferences: { ...current?.preferences, ...partial.preferences },
  } as UserSettings;
  await db.collection<UserSettings & { userId: string }>("userSettings").updateOne({ userId }, { $set: { ...next, userId } }, { upsert: true });
  return next;
}

export async function getDashboardSummary() {
  const profile = await getUserProfile();
  const bookings = await getUserBookings();
  const messages = await getUserMessages();
  const wishlist = await getWishlist();
  const activeBookings = bookings.filter((booking) => booking.status === "confirmed" || booking.status === "pending");
  return {
    rewardPoints: profile?.rewardPoints ?? 0,
    activeBookings: activeBookings.length,
    unreadMessages: messages.filter((message) => message.status === "unread").length,
    wishlistCount: wishlist.length,
    nextDeparture: activeBookings[0]?.travelDate ?? null,
    totalSpend: bookings.filter((booking) => booking.status !== "cancelled").reduce((sum, booking) => sum + booking.amount, 0),
  };
}

export async function getAdminCustomers() {
  const db = await dataDb();
  return toPlainValue(await db.collection<AdminCustomer>("adminCustomers").find({}).sort({ name: 1 }).toArray());
}

export async function createAdminCustomer(payload: Omit<AdminCustomer, "id" | "lastSeen">) {
  const db = await dataDb();
  const customer = { ...payload, id: id("customer"), lastSeen: now() };
  await db.collection<AdminCustomer>("adminCustomers").insertOne(customer);
  return customer;
}

export async function updateAdminCustomer(idValue: string, partial: Partial<AdminCustomer>) {
  const db = await dataDb();
  await db.collection<AdminCustomer>("adminCustomers").updateOne({ id: idValue }, { $set: { ...partial, lastSeen: now() } });
  return toPlainValue(await db.collection<AdminCustomer>("adminCustomers").findOne({ id: idValue }));
}

export async function deleteAdminCustomer(idValue: string) {
  const db = await dataDb();
  await db.collection<AdminCustomer>("adminCustomers").deleteOne({ id: idValue });
  return { ok: true };
}

export async function getInventory(): Promise<InventoryItem[]> {
  const db = await dataDb();
  return toPlainValue(await db.collection<InventoryItem>("inventory").find({}).toArray());
}

export async function getAdminSettings(): Promise<AdminSettings> {
  const db = await dataDb();
  const settings = await db.collection<AdminSettings>("adminSettings").findOne({});
  if (settings) return toPlainValue(settings);
  const fallback = await seedSource.getAdminSettings();
  await db.collection<AdminSettings>("adminSettings").insertOne(fallback);
  return fallback;
}

export async function updateAdminSettings(partial: Partial<AdminSettings>) {
  const db = await dataDb();
  const current = await getAdminSettings();
  const next = { ...current, ...partial } as AdminSettings;
  await db.collection<AdminSettings>("adminSettings").updateOne({}, { $set: next });
  return next;
}

export async function getCatalogue(): Promise<Adventure[]> {
  const db = await dataDb();
  return toPlainValue(await db.collection<Adventure>("adventures").find({}).toArray());
}

export async function createTour(payload: { title: string; location: string; price: string; date: string; overview: string; category: string; image: string; status?: "upcoming" | "completed"; gallery?: string[]; }) {
  const db = await dataDb();
  const tour: Adventure = {
    id: `${payload.title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    image: payload.image,
    images: payload.gallery?.length ? [payload.image, ...payload.gallery] : [payload.image],
    altText: payload.title,
    category: payload.category,
    location: payload.location,
    title: payload.title,
    price: payload.price,
    date: payload.date,
    slots: "8 slots left",
    status: payload.status ?? "upcoming",
    duration: "6 Days",
    difficulty: "Moderate",
    groupSize: "2 - 8 People",
    overview: payload.overview,
    included: ["Park logistics", "Guide services", "Accommodation"],
    excluded: ["International flights", "Visa fees"],
    itinerary: [{ day: 1, title: "Arrival and briefing", description: "Arrival, welcome, and field briefing from the Nairobi desk." }],
  };
  await db.collection<Adventure>("adventures").insertOne(tour);
  return tour;
}

export async function updateTour(idValue: string, partial: Partial<Adventure>) {
  const db = await dataDb();
  await db.collection<Adventure>("adventures").updateOne({ id: idValue }, { $set: partial });
  return toPlainValue(await db.collection<Adventure>("adventures").findOne({ id: idValue }));
}

export async function deleteTour(idValue: string) {
  const db = await dataDb();
  await db.collection<Adventure>("adventures").deleteOne({ id: idValue });
  return { ok: true };
}

export async function getSiteNotifications() { const db = await dataDb(); return toPlainValue(await db.collection<SiteNotification>("siteNotifications").find({}).toArray()); }
export async function createNotification(payload: Omit<SiteNotification, "id">) { const db = await dataDb(); const item = { ...payload, id: id("notif") }; await db.collection<SiteNotification>("siteNotifications").insertOne(item); return item; }
export async function updateNotification(idValue: string, partial: Partial<SiteNotification>) { const db = await dataDb(); await db.collection<SiteNotification>("siteNotifications").updateOne({ id: idValue }, { $set: partial }); return toPlainValue(await db.collection<SiteNotification>("siteNotifications").findOne({ id: idValue })); }
export async function deleteNotification(idValue: string) { const db = await dataDb(); await db.collection<SiteNotification>("siteNotifications").deleteOne({ id: idValue }); return { ok: true }; }

export async function getMediaAssets() { const db = await dataDb(); return toPlainValue(await db.collection<MediaAsset>("mediaAssets").find({}).toArray()); }
export async function createMediaAsset(payload: Omit<MediaAsset, "id">) { const db = await dataDb(); const item = { ...payload, id: id("media") }; await db.collection<MediaAsset>("mediaAssets").insertOne(item); return item; }
export async function updateMediaAsset(idValue: string, partial: Partial<MediaAsset>) { const db = await dataDb(); await db.collection<MediaAsset>("mediaAssets").updateOne({ id: idValue }, { $set: partial }); return toPlainValue(await db.collection<MediaAsset>("mediaAssets").findOne({ id: idValue })); }
export async function deleteMediaAsset(idValue: string) { const db = await dataDb(); await db.collection<MediaAsset>("mediaAssets").deleteOne({ id: idValue }); return { ok: true }; }

export async function getBillingRecords() { const db = await dataDb(); return toPlainValue(await db.collection<BillingRecord>("billingRecords").find({}).toArray()); }
export async function updateBillingRecord(idValue: string, partial: Partial<BillingRecord>) { const db = await dataDb(); await db.collection<BillingRecord>("billingRecords").updateOne({ id: idValue }, { $set: partial }); return toPlainValue(await db.collection<BillingRecord>("billingRecords").findOne({ id: idValue })); }
export async function createBillingRecord(payload: Omit<BillingRecord, "id">) { const db = await dataDb(); const item = { ...payload, id: id("bill") }; await db.collection<BillingRecord>("billingRecords").insertOne(item); return item; }
export async function deleteBillingRecord(idValue: string) { const db = await dataDb(); await db.collection<BillingRecord>("billingRecords").deleteOne({ id: idValue }); return { ok: true }; }

export async function getAnalytics() { const db = await dataDb(); return toPlainValue(await db.collection<AnalyticsDatum>("analytics").find({}).toArray()); }
export async function getOperationsFeed() { const db = await dataDb(); return toPlainValue(await db.collection<OperationsFeedItem>("operationsFeed").find({}).sort({ at: -1 }).toArray()); }

export async function getAdminOverview() {
  const bookings = toPlainValue(await dataDb().then((db) => db.collection<Booking>("bookings").find({}).toArray()));
  const customers = await getAdminCustomers();
  const inventory = await getInventory();
  const billing = await getBillingRecords();
  return {
    bookings: {
      total: bookings.length,
      confirmed: bookings.filter((booking) => booking.status === "confirmed").length,
      pending: bookings.filter((booking) => booking.status === "pending").length,
      revenue: bookings.filter((booking) => booking.status !== "cancelled").reduce((sum, booking) => sum + booking.amount, 0),
    },
    customers: { total: customers.length, vip: customers.filter((customer) => customer.tier === "Elite Voyager").length },
    inventory: {
      totalDepartures: inventory.length,
      seatsOpen: inventory.reduce((sum, item) => sum + Math.max(item.capacity - item.booked, 0), 0),
      waitlist: inventory.reduce((sum, item) => sum + item.waitlist, 0),
    },
    billing: {
      outstanding: billing.filter((record) => record.status !== "paid").reduce((sum, record) => sum + record.amount, 0),
      paid: billing.filter((record) => record.status === "paid").reduce((sum, record) => sum + record.amount, 0),
    },
  };
}

export async function updateBooking(idValue: string, partial: Partial<Booking>) { const db = await dataDb(); await db.collection<Booking>("bookings").updateOne({ id: idValue }, { $set: partial }); return toPlainValue(await db.collection<Booking>("bookings").findOne({ id: idValue })); }
export async function deleteBooking(idValue: string) { const db = await dataDb(); await db.collection<Booking>("bookings").deleteOne({ id: idValue }); return { ok: true }; }
export async function getPublicContentSnapshot(): Promise<PublicContentSnapshot> { return { notifications: await getSiteNotifications(), media: await getMediaAssets(), tours: await getCatalogue() }; }
export async function getBlogPosts() { const db = await dataDb(); return toPlainValue(await db.collection<BlogPost>("blogPosts").find({}).toArray()); }
export async function createBlogPost(payload: Omit<BlogPost, "id" | "slug"> & { slug?: string }) { const db = await dataDb(); const item = { ...payload, id: id("blog"), slug: payload.slug ?? payload.title.toLowerCase().replace(/\s+/g, "-") }; await db.collection<BlogPost>("blogPosts").insertOne(item); return item; }
export async function updateBlogPost(idValue: string, partial: Partial<BlogPost>) { const db = await dataDb(); await db.collection<BlogPost>("blogPosts").updateOne({ id: idValue }, { $set: partial }); return toPlainValue(await db.collection<BlogPost>("blogPosts").findOne({ id: idValue })); }
export async function deleteBlogPost(idValue: string) { const db = await dataDb(); await db.collection<BlogPost>("blogPosts").deleteOne({ id: idValue }); return { ok: true }; }

export { ensureSeeded };











