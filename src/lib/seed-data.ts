import { MOCK_ADVENTURES, type Adventure } from "@/api/adventures";

export type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";
export type MessageStatus = "unread" | "replied" | "archived";
export type InventoryStatus = "scheduled" | "draft" | "archived";

export interface UserProfile {
  id: string;
  name: string;
  firstName: string;
  tier: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  memberSince: string;
  rewardPoints: number;
  nextJourneyWindow: string;
}

export interface UserMessage {
  id: string;
  subject: string;
  preview: string;
  body: string;
  from: string;
  to?: string;
  receivedAt: string;
  status: MessageStatus;
  bookingId?: string;
}

export interface Booking {
  id: string;
  reference: string;
  adventureId: string;
  adventureTitle: string;
  location: string;
  travelDate: string;
  partySize: number;
  amount: number;
  currency: string;
  status: BookingStatus;
  image: string;
  customerId: string;
  customerName: string;
  travelers?: string[];
  notes: string;
}

export interface WishlistItem {
  id: string;
  adventureId: string;
  title: string;
  location: string;
  idealWindow: string;
  priceFrom: number;
  image: string;
  category: string;
}

export interface UserSettings {
  notifications: {
    expeditionAlerts: boolean;
    paymentUpdates: boolean;
    weeklyDigest: boolean;
  };
  preferences: {
    preferredCurrency: string;
    preferredRegion: string;
    travelStyle: string;
  };
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: string;
  lifetimeValue: number;
  activeBookings: number;
  lastSeen: string;
}

export interface InventoryItem {
  id: string;
  adventureId: string;
  title: string;
  departureDate: string;
  capacity: number;
  booked: number;
  waitlist: number;
  status: InventoryStatus;
}

export interface AdminSettings {
  allowPublicBookings: boolean;
  requireManualReview: boolean;
  payoutsEnabled: boolean;
  supportEmail: string;
}

export interface SiteNotification {
  id: string;
  title: string;
  body: string;
  audience: "public" | "travelers";
  active: boolean;
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  tag: string;
  surface: "hero" | "gallery" | "tour";
}

export interface BillingRecord {
  id: string;
  supplier: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: "scheduled" | "paid" | "holding";
  note: string;
}

export interface AnalyticsDatum {
  id: string;
  label: string;
  value: number;
  change: string;
}

export interface PublicContentSnapshot {
  notifications: SiteNotification[];
  media: MediaAsset[];
  tours: Adventure[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  image: string;
}

const userProfile: UserProfile = {
  id: "user-001",
  name: "Julian Alexander Vance",
  firstName: "Julian",
  tier: "Elite Voyager",
  email: "j.vance@naktide.com",
  phone: "+1 (555) 012-8843",
  location: "Nairobi, Kenya",
  avatar: "https://i.pravatar.cc/200?img=12",
  memberSince: "2019-08-12",
  rewardPoints: 14250,
  nextJourneyWindow: "October 12 to October 19, 2026",
};

const messages: UserMessage[] = [
  {
    id: "msg-001",
    subject: "Final traveler brief for Serengeti Crossing",
    preview: "Your private guide assignment, charter timing, and camp notes are ready for review.",
    body: "Your private guide assignment is confirmed, charter timing from Wilson is locked, and camp notes are attached for review before departure.",
    from: "Concierge Desk",
    to: "Julian Alexander Vance",
    receivedAt: "2026-03-22T10:30:00.000Z",
    status: "unread",
    bookingId: "booking-001",
  },
  {
    id: "msg-002",
    subject: "Upgrade available: night photography permit",
    preview: "We can attach a protected conservancy permit to your October departure.",
    body: "Operations has identified an opening for a protected conservancy night photography permit. Reply if you want us to add the supplement.",
    from: "Operations",
    to: "Julian Alexander Vance",
    receivedAt: "2026-03-20T15:00:00.000Z",
    status: "replied",
    bookingId: "booking-001",
  },
  {
    id: "msg-003",
    subject: "Loyalty milestone reached",
    preview: "Your account has crossed the threshold for a private airstrip transfer credit.",
    body: "Your account has crossed the threshold for a private airstrip transfer credit that can be applied to a future Kenya or regional departure.",
    from: "Rewards",
    to: "Julian Alexander Vance",
    receivedAt: "2026-03-18T08:15:00.000Z",
    status: "archived",
  },
];

let bookings: Booking[] = [
  {
    id: "booking-001",
    reference: "NKT-SV-9821",
    adventureId: "serengeti-crossing-2024",
    adventureTitle: "The Serengeti Crossing",
    location: "Northern Serengeti, Tanzania",
    travelDate: "2026-10-12",
    partySize: 2,
    amount: 425000,
    currency: "KES",
    status: "confirmed",
    image: MOCK_ADVENTURES[0]?.image ?? "",
    customerId: "user-001",
    customerName: "Julian Alexander Vance",
    travelers: ["Julian Alexander Vance", "Maya Vance"],
    notes: "Private photo vehicle, premium camp suite, dietary brief submitted.",
  },
  {
    id: "booking-002",
    reference: "NKT-GM-1105",
    adventureId: "gorillas-mist-2024",
    adventureTitle: "Gorillas in the Mist",
    location: "Volcanoes National Park, Rwanda",
    travelDate: "2026-11-05",
    partySize: 4,
    amount: 680000,
    currency: "KES",
    status: "pending",
    image: MOCK_ADVENTURES[1]?.image ?? "",
    customerId: "user-001",
    customerName: "Julian Alexander Vance",
    travelers: ["Julian Alexander Vance", "Maya Vance", "Amani Otieno", "Luca Mercer"],
    notes: "Permit allocation pending final passport verification.",
  },
  {
    id: "booking-003",
    reference: "NKT-SC-0115",
    adventureId: "skeleton-coast-2024",
    adventureTitle: "Skeleton Coast & Dunes",
    location: "Skeleton Coast, Namibia",
    travelDate: "2025-01-15",
    partySize: 2,
    amount: 510000,
    currency: "KES",
    status: "completed",
    image: MOCK_ADVENTURES[3]?.image ?? "",
    customerId: "user-001",
    customerName: "Julian Alexander Vance",
    travelers: ["Julian Alexander Vance", "Maya Vance"],
    notes: "Successfully completed. Editorial asset pack delivered.",
  },
];

const wishlist: WishlistItem[] = [
  {
    id: "wish-001",
    adventureId: "okavango-delta-2024",
    title: "Okavango Delta Photo-Op",
    location: "Okavango Delta, Botswana",
    idealWindow: "December 2026",
    priceFrom: 510000,
    image: MOCK_ADVENTURES[2]?.image ?? "",
    category: "Photography",
  },
  {
    id: "wish-002",
    adventureId: "bwindi-trek-2023",
    title: "Bwindi Forest Trek",
    location: "Bwindi, Uganda",
    idealWindow: "September 2026",
    priceFrom: 320000,
    image: MOCK_ADVENTURES[5]?.image ?? "",
    category: "Trekking",
  },
];

let userSettings: UserSettings = {
  notifications: {
    expeditionAlerts: true,
    paymentUpdates: true,
    weeklyDigest: false,
  },
  preferences: {
    preferredCurrency: "KES",
    preferredRegion: "East Africa",
    travelStyle: "Private photography-led itineraries",
  },
};

let adminCustomers: AdminCustomer[] = [
  {
    id: "customer-001",
    name: "Julian Alexander Vance",
    email: "j.vance@naktide.com",
    phone: "+1 (555) 012-8843",
    tier: "Elite Voyager",
    lifetimeValue: 1615000,
    activeBookings: 2,
    lastSeen: "2026-03-24T07:20:00.000Z",
  },
  {
    id: "customer-002",
    name: "Aisha Njoroge",
    email: "aisha.njoroge@example.com",
    phone: "+254 700 000001",
    tier: "Savannah Circle",
    lifetimeValue: 845000,
    activeBookings: 1,
    lastSeen: "2026-03-23T18:10:00.000Z",
  },
  {
    id: "customer-003",
    name: "Daniel Mercer",
    email: "daniel.mercer@example.com",
    phone: "+44 20 7000 2222",
    tier: "Voyager",
    lifetimeValue: 525000,
    activeBookings: 0,
    lastSeen: "2026-03-21T14:40:00.000Z",
  },
];

const inventory: InventoryItem[] = [
  {
    id: "inv-001",
    adventureId: "serengeti-crossing-2024",
    title: "The Serengeti Crossing",
    departureDate: "2026-10-12",
    capacity: 8,
    booked: 6,
    waitlist: 2,
    status: "scheduled",
  },
  {
    id: "inv-002",
    adventureId: "gorillas-mist-2024",
    title: "Gorillas in the Mist",
    departureDate: "2026-11-05",
    capacity: 6,
    booked: 4,
    waitlist: 1,
    status: "scheduled",
  },
  {
    id: "inv-003",
    adventureId: "new-kenya-rift-camp",
    title: "Rift Valley Fly Camp",
    departureDate: "2026-12-03",
    capacity: 10,
    booked: 0,
    waitlist: 0,
    status: "draft",
  },
];

let adminSettings: AdminSettings = {
  allowPublicBookings: true,
  requireManualReview: true,
  payoutsEnabled: false,
  supportEmail: "ops@naktide.com",
};

const catalogue: Adventure[] = MOCK_ADVENTURES;

let siteNotifications: SiteNotification[] = [
  {
    id: "notif-001",
    title: "Mara season windows open",
    body: "Early allocations for July to October departures are now open from the Nairobi desk.",
    audience: "public",
    active: true,
  },
  {
    id: "notif-002",
    title: "Passport check required",
    body: "Travelers with pending gorilla permits must upload passport scans before confirmation.",
    audience: "travelers",
    active: true,
  },
];

let mediaAssets: MediaAsset[] = [
  {
    id: "media-001",
    title: "Mara dawn hero",
    url: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
    tag: "serengeti-crossing-2024",
    surface: "hero",
  },
  {
    id: "media-002",
    title: "Amboseli elephants",
    url: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg",
    tag: "serengeti-crossing-2024",
    surface: "gallery",
  },
  {
    id: "media-003",
    title: "Samburu editorial frame",
    url: "https://images.pexels.com/photos/1670984/pexels-photo-1670984.jpeg",
    tag: "okavango-delta-2024",
    surface: "hero",
  },
];

let billingRecords: BillingRecord[] = [
  {
    id: "bill-001",
    supplier: "Mara River Camp",
    amount: 220000,
    currency: "KES",
    dueDate: "2026-04-02",
    status: "scheduled",
    note: "October crossing departure room hold",
  },
  {
    id: "bill-002",
    supplier: "Rwanda Permit Office",
    amount: 150000,
    currency: "KES",
    dueDate: "2026-03-30",
    status: "holding",
    note: "Awaiting traveler passport verification",
  },
  {
    id: "bill-003",
    supplier: "Wilson Charter Desk",
    amount: 98000,
    currency: "KES",
    dueDate: "2026-03-18",
    status: "paid",
    note: "Nairobi-Wilson to Kogatende allocation",
  },
];

const analytics: AnalyticsDatum[] = [
  { id: "ana-001", label: "Qualified leads", value: 128, change: "+14%" },
  { id: "ana-002", label: "Booking conversion", value: 37, change: "+6%" },
  { id: "ana-003", label: "Average order value", value: 462000, change: "+9%" },
  { id: "ana-004", label: "Repeat traveler rate", value: 42, change: "+5%" },
];

let blogPosts: BlogPost[] = [
  {
    id: "blog-001",
    title: "When to book the Maasai Mara for migration season",
    slug: "maasai-mara-migration-timing",
    category: "Planning",
    excerpt: "A practical view of lodge windows, river crossing timing, and how to avoid overbuilt safari schedules.",
    body: "Booking well for the Mara means understanding crossing windows, camp positioning, and how to keep transfer days from consuming your best light.",
    image: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
  },
  {
    id: "blog-002",
    title: "Amboseli photography briefs that actually matter",
    slug: "amboseli-photo-brief",
    category: "Field Notes",
    excerpt: "Dust, elephants, and Kilimanjaro demand a different pacing model than typical game-drive itineraries.",
    body: "The strongest Amboseli itineraries trade speed for positioning. You want clear horizon access, fewer location changes, and slower tracking around family groups.",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg",
  },
];

function sumRevenue(source: Booking[]) {
  return source.reduce((total, booking) => total + booking.amount, 0);
}

function stampNow() {
  return new Date().toISOString();
}

function updateArrayItem<T extends { id: string }>(items: T[], id: string, partial: Partial<T>) {
  return items.map((item) => (item.id === id ? { ...item, ...partial } : item));
}

export async function getUserProfile() {
  return userProfile;
}

export async function getUserMessages() {
  return messages;
}

export async function createUserMessage(payload: Omit<UserMessage, "id" | "receivedAt" | "preview"> & { preview?: string }) {
  const message: UserMessage = {
    ...payload,
    id: `msg-${Date.now()}`,
    receivedAt: stampNow(),
    preview: payload.preview ?? payload.body.slice(0, 88),
  };
  messages.unshift(message);
  return message;
}

export async function updateUserMessage(id: string, partial: Partial<UserMessage>) {
  const index = messages.findIndex((message) => message.id === id);
  if (index === -1) {
    return undefined;
  }
  messages[index] = { ...messages[index], ...partial };
  return messages[index];
}

export async function getUserBookings() {
  return bookings;
}

export async function getBookingById(id: string) {
  return bookings.find((booking) => booking.id === id);
}

export async function getWishlist() {
  return wishlist;
}

export async function getUserSettings() {
  return userSettings;
}

export async function updateUserSettings(partial: Partial<UserSettings>) {
  userSettings = {
    notifications: {
      ...userSettings.notifications,
      ...partial.notifications,
    },
    preferences: {
      ...userSettings.preferences,
      ...partial.preferences,
    },
  };
  return userSettings;
}

export async function getDashboardSummary() {
  const activeBookings = bookings.filter((booking) => booking.status === "confirmed" || booking.status === "pending");
  return {
    rewardPoints: userProfile.rewardPoints,
    activeBookings: activeBookings.length,
    unreadMessages: messages.filter((message) => message.status === "unread").length,
    wishlistCount: wishlist.length,
    nextDeparture: activeBookings[0]?.travelDate ?? null,
    totalSpend: sumRevenue(bookings.filter((booking) => booking.status !== "cancelled")),
  };
}

export async function getAdminCustomers() {
  return adminCustomers;
}

export async function createAdminCustomer(payload: Omit<AdminCustomer, "id" | "lastSeen">) {
  const customer: AdminCustomer = {
    ...payload,
    id: `customer-${Date.now()}`,
    lastSeen: stampNow(),
  };
  adminCustomers = [customer, ...adminCustomers];
  return customer;
}

export async function updateAdminCustomer(id: string, partial: Partial<AdminCustomer>) {
  adminCustomers = updateArrayItem(adminCustomers, id, { ...partial, lastSeen: stampNow() });
  return adminCustomers.find((customer) => customer.id === id);
}

export async function deleteAdminCustomer(id: string) {
  adminCustomers = adminCustomers.filter((customer) => customer.id !== id);
  return { ok: true };
}

export async function getInventory() {
  return inventory;
}

export async function getAdminSettings() {
  return adminSettings;
}

export async function updateAdminSettings(partial: Partial<AdminSettings>) {
  adminSettings = { ...adminSettings, ...partial };
  return adminSettings;
}

export async function getCatalogue(): Promise<Adventure[]> {
  return catalogue;
}

export async function createTour(payload: {
  title: string;
  location: string;
  price: string;
  date: string;
  overview: string;
  category: string;
  image: string;
  status?: "upcoming" | "completed";
  gallery?: string[];
}) {
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
  catalogue.unshift(tour);
  return tour;
}

export async function updateTour(id: string, partial: Partial<Adventure>) {
  const index = catalogue.findIndex((tour) => tour.id === id);
  if (index === -1) {
    return undefined;
  }
  catalogue[index] = { ...catalogue[index], ...partial };
  return catalogue[index];
}

export async function deleteTour(id: string) {
  const index = catalogue.findIndex((tour) => tour.id === id);
  if (index >= 0) {
    catalogue.splice(index, 1);
  }
  return { ok: true };
}

export async function getSiteNotifications() {
  return siteNotifications;
}

export async function createNotification(payload: Omit<SiteNotification, "id">) {
  const notification: SiteNotification = { ...payload, id: `notif-${Date.now()}` };
  siteNotifications = [notification, ...siteNotifications];
  return notification;
}

export async function updateNotification(id: string, partial: Partial<SiteNotification>) {
  siteNotifications = updateArrayItem(siteNotifications, id, partial);
  return siteNotifications.find((item) => item.id === id);
}

export async function deleteNotification(id: string) {
  siteNotifications = siteNotifications.filter((item) => item.id !== id);
  return { ok: true };
}

export async function getMediaAssets() {
  return mediaAssets;
}

export async function createMediaAsset(payload: Omit<MediaAsset, "id">) {
  const asset: MediaAsset = { ...payload, id: `media-${Date.now()}` };
  mediaAssets = [asset, ...mediaAssets];
  return asset;
}

export async function updateMediaAsset(id: string, partial: Partial<MediaAsset>) {
  mediaAssets = updateArrayItem(mediaAssets, id, partial);
  return mediaAssets.find((asset) => asset.id === id);
}

export async function deleteMediaAsset(id: string) {
  mediaAssets = mediaAssets.filter((asset) => asset.id !== id);
  return { ok: true };
}

export async function getBillingRecords() {
  return billingRecords;
}

export async function updateBillingRecord(id: string, partial: Partial<BillingRecord>) {
  billingRecords = updateArrayItem(billingRecords, id, partial);
  return billingRecords.find((record) => record.id === id);
}

export async function createBillingRecord(payload: Omit<BillingRecord, "id">) {
  const record: BillingRecord = { ...payload, id: `bill-${Date.now()}` };
  billingRecords = [record, ...billingRecords];
  return record;
}

export async function deleteBillingRecord(id: string) {
  billingRecords = billingRecords.filter((record) => record.id !== id);
  return { ok: true };
}

export async function getAnalytics() {
  return analytics;
}

export async function getAdminOverview() {
  const confirmed = bookings.filter((booking) => booking.status === "confirmed").length;
  const pending = bookings.filter((booking) => booking.status === "pending").length;
  return {
    bookings: {
      total: bookings.length,
      confirmed,
      pending,
      revenue: sumRevenue(bookings.filter((booking) => booking.status !== "cancelled")),
    },
    customers: {
      total: adminCustomers.length,
      vip: adminCustomers.filter((customer) => customer.tier === "Elite Voyager").length,
    },
    inventory: {
      totalDepartures: inventory.length,
      seatsOpen: inventory.reduce((total, item) => total + Math.max(item.capacity - item.booked, 0), 0),
      waitlist: inventory.reduce((total, item) => total + item.waitlist, 0),
    },
    billing: {
      outstanding: billingRecords.filter((record) => record.status !== "paid").reduce((total, record) => total + record.amount, 0),
      paid: billingRecords.filter((record) => record.status === "paid").reduce((total, record) => total + record.amount, 0),
    },
  };
}

export async function updateBooking(id: string, partial: Partial<Booking>) {
  bookings = updateArrayItem(bookings, id, partial);
  return bookings.find((booking) => booking.id === id);
}

export async function deleteBooking(id: string) {
  bookings = bookings.filter((booking) => booking.id !== id);
  return { ok: true };
}

export async function getOperationsFeed() {
  return [
    {
      id: "ops-001",
      title: "Concierge replied to 4 high-value travelers",
      at: "2026-03-24T06:45:00.000Z",
      kind: "support",
    },
    {
      id: "ops-002",
      title: "Serengeti Crossing waitlist increased to 2",
      at: "2026-03-23T17:15:00.000Z",
      kind: "inventory",
    },
    {
      id: "ops-003",
      title: "Manual review still required for Gorilla permits",
      at: "2026-03-23T10:05:00.000Z",
      kind: "compliance",
    },
  ];
}

export async function getPublicContentSnapshot(): Promise<PublicContentSnapshot> {
  return {
    notifications: siteNotifications,
    media: mediaAssets,
    tours: catalogue,
  };
}

export async function getBlogPosts() {
  return blogPosts;
}

export async function createBlogPost(payload: Omit<BlogPost, "id" | "slug"> & { slug?: string }) {
  const post: BlogPost = {
    ...payload,
    id: `blog-${Date.now()}`,
    slug: payload.slug ?? payload.title.toLowerCase().replace(/\s+/g, "-"),
  };
  blogPosts = [post, ...blogPosts];
  return post;
}

export async function updateBlogPost(id: string, partial: Partial<BlogPost>) {
  blogPosts = updateArrayItem(blogPosts, id, partial);
  return blogPosts.find((post) => post.id === id);
}

export async function deleteBlogPost(id: string) {
  blogPosts = blogPosts.filter((post) => post.id !== id);
  return { ok: true };
}
