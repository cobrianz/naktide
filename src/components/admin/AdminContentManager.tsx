"use client";

import { useMemo, useState } from "react";

import type { Adventure } from "@/api/adventures";
import type { BlogPost, MediaAsset, SiteNotification } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function filesToDataUrls(files: FileList | null) {
  if (!files) return [] as string[];
  return Promise.all(Array.from(files).map(fileToDataUrl));
}

function IconButton({ icon, label, onClick, variant = "outline" }: { icon: string; label: string; onClick: () => void; variant?: "outline" | "destructive" | "ghost" }) {
  return (
    <Button type="button" variant={variant} size="icon-sm" className="rounded-lg" onClick={onClick}>
      <span className="material-symbols-outlined text-[15px]">{icon}</span>
      <span className="sr-only">{label}</span>
    </Button>
  );
}

const emptyTourForm = {
  title: "",
  location: "Kenya",
  price: "Ksh 0",
  date: "2026-07-01",
  overview: "",
  category: "Safari",
  image: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
  gallery: [] as string[],
  status: "upcoming",
};

const emptyNotificationForm = {
  title: "",
  body: "",
  audience: "public" as "public" | "travelers",
  active: true,
};

const emptyMediaForm = {
  title: "",
  tag: "",
  surface: "gallery" as "hero" | "gallery" | "tour",
  selectedTourId: "",
  previews: [] as string[],
};

const emptyBlogForm = {
  title: "",
  category: "Planning",
  excerpt: "",
  body: "",
  image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg",
};

export function AdminContentManager({ initialTours, initialNotifications, initialMedia, initialBlogs }: { initialTours: Adventure[]; initialNotifications: SiteNotification[]; initialMedia: MediaAsset[]; initialBlogs: BlogPost[]; }) {
  const [tours, setTours] = useState(initialTours);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [media, setMedia] = useState(initialMedia);
  const [blogs, setBlogs] = useState(initialBlogs);

  const [tourForm, setTourForm] = useState(emptyTourForm);
  const [notificationForm, setNotificationForm] = useState(emptyNotificationForm);
  const [mediaForm, setMediaForm] = useState(emptyMediaForm);
  const [blogForm, setBlogForm] = useState(emptyBlogForm);

  const [tourView, setTourView] = useState<Adventure | null>(null);
  const [tourEdit, setTourEdit] = useState<Adventure | null>(null);
  const [tourDelete, setTourDelete] = useState<Adventure | null>(null);
  const [tourEditForm, setTourEditForm] = useState(emptyTourForm);

  const [notificationView, setNotificationView] = useState<SiteNotification | null>(null);
  const [notificationEdit, setNotificationEdit] = useState<SiteNotification | null>(null);
  const [notificationDelete, setNotificationDelete] = useState<SiteNotification | null>(null);
  const [notificationEditForm, setNotificationEditForm] = useState(emptyNotificationForm);

  const [mediaView, setMediaView] = useState<MediaAsset | null>(null);
  const [mediaEdit, setMediaEdit] = useState<MediaAsset | null>(null);
  const [mediaDelete, setMediaDelete] = useState<MediaAsset | null>(null);
  const [mediaEditForm, setMediaEditForm] = useState(emptyMediaForm);

  const [blogView, setBlogView] = useState<BlogPost | null>(null);
  const [blogEdit, setBlogEdit] = useState<BlogPost | null>(null);
  const [blogDelete, setBlogDelete] = useState<BlogPost | null>(null);
  const [blogEditForm, setBlogEditForm] = useState(emptyBlogForm);

  const pastTours = useMemo(() => tours.filter((tour) => tour.status === "completed"), [tours]);

  function openTourEdit(tour: Adventure) {
    setTourEdit(tour);
    setTourEditForm({
      title: tour.title,
      location: tour.location,
      price: tour.price,
      date: tour.date,
      overview: tour.overview,
      category: tour.category,
      image: tour.image,
      gallery: (tour.images ?? []).filter((image) => image !== tour.image),
      status: tour.status,
    });
  }

  function openNotificationEdit(item: SiteNotification) {
    setNotificationEdit(item);
    setNotificationEditForm({ title: item.title, body: item.body, audience: item.audience, active: item.active });
  }

  function openMediaEdit(item: MediaAsset) {
    setMediaEdit(item);
    setMediaEditForm({ title: item.title, tag: item.tag, surface: item.surface, selectedTourId: item.tag, previews: [item.url] });
  }

  function openBlogEdit(item: BlogPost) {
    setBlogEdit(item);
    setBlogEditForm({ title: item.title, category: item.category, excerpt: item.excerpt, body: item.body, image: item.image });
  }

  async function createTourItem() {
    const response = await fetch("/api/admin/tours", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(tourForm) });
    const payload = await response.json();
    if (!payload.data) return;
    setTours((current) => [payload.data, ...current]);
    setTourForm(emptyTourForm);
  }

  async function updateTourItem() {
    if (!tourEdit) return;
    const response = await fetch("/api/admin/tours", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tourEdit.id, ...tourEditForm, images: [tourEditForm.image, ...tourEditForm.gallery] }),
    });
    const payload = await response.json();
    if (!payload.data) return;
    setTours((current) => current.map((tour) => (tour.id === tourEdit.id ? payload.data : tour)));
    setTourEdit(null);
  }

  async function deleteTourItem() {
    if (!tourDelete) return;
    await fetch("/api/admin/tours", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: tourDelete.id }) });
    setTours((current) => current.filter((tour) => tour.id !== tourDelete.id));
    setTourDelete(null);
  }

  async function createNotificationItem() {
    const response = await fetch("/api/admin/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(notificationForm) });
    const payload = await response.json();
    if (!payload.data) return;
    setNotifications((current) => [payload.data, ...current]);
    setNotificationForm(emptyNotificationForm);
  }

  async function updateNotificationItem() {
    if (!notificationEdit) return;
    const response = await fetch("/api/admin/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: notificationEdit.id, ...notificationEditForm }) });
    const payload = await response.json();
    if (!payload.data) return;
    setNotifications((current) => current.map((item) => (item.id === notificationEdit.id ? payload.data : item)));
    setNotificationEdit(null);
  }

  async function deleteNotificationItem() {
    if (!notificationDelete) return;
    await fetch("/api/admin/notifications", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: notificationDelete.id }) });
    setNotifications((current) => current.filter((item) => item.id !== notificationDelete.id));
    setNotificationDelete(null);
  }
  async function createMediaItems() {
    const createdItems: MediaAsset[] = [];
    for (const [index, preview] of mediaForm.previews.entries()) {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `${mediaForm.title || "Gallery image"} ${index + 1}`, url: preview, tag: mediaForm.tag || mediaForm.selectedTourId, surface: mediaForm.surface }),
      });
      const payload = await response.json();
      if (payload.data) createdItems.push(payload.data);
    }
    if (createdItems.length) setMedia((current) => [...createdItems, ...current]);

    if (mediaForm.selectedTourId && mediaForm.previews.length) {
      const selectedTour = tours.find((tour) => tour.id === mediaForm.selectedTourId);
      if (selectedTour) {
        const nextImages = Array.from(new Set([...(selectedTour.images ?? [selectedTour.image]), ...mediaForm.previews]));
        const response = await fetch("/api/admin/tours", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedTour.id, images: nextImages }),
        });
        const payload = await response.json();
        if (payload.data) setTours((current) => current.map((tour) => (tour.id === selectedTour.id ? payload.data : tour)));
      }
    }

    setMediaForm(emptyMediaForm);
  }

  async function updateMediaItem() {
    if (!mediaEdit || !mediaEditForm.previews[0]) return;
    const response = await fetch("/api/admin/media", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: mediaEdit.id, title: mediaEditForm.title, tag: mediaEditForm.tag || mediaEditForm.selectedTourId, surface: mediaEditForm.surface, url: mediaEditForm.previews[0] }),
    });
    const payload = await response.json();
    if (!payload.data) return;
    setMedia((current) => current.map((item) => (item.id === mediaEdit.id ? payload.data : item)));
    setMediaEdit(null);
  }

  async function deleteMediaItem() {
    if (!mediaDelete) return;
    await fetch("/api/admin/media", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: mediaDelete.id }) });
    setMedia((current) => current.filter((item) => item.id !== mediaDelete.id));
    setMediaDelete(null);
  }

  async function createBlogItem() {
    const response = await fetch("/api/admin/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(blogForm) });
    const payload = await response.json();
    if (!payload.data) return;
    setBlogs((current) => [payload.data, ...current]);
    setBlogForm(emptyBlogForm);
  }

  async function updateBlogItem() {
    if (!blogEdit) return;
    const response = await fetch("/api/admin/blogs", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: blogEdit.id, ...blogEditForm }) });
    const payload = await response.json();
    if (!payload.data) return;
    setBlogs((current) => current.map((item) => (item.id === blogEdit.id ? payload.data : item)));
    setBlogEdit(null);
  }

  async function deleteBlogItem() {
    if (!blogDelete) return;
    await fetch("/api/admin/blogs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: blogDelete.id }) });
    setBlogs((current) => current.filter((item) => item.id !== blogDelete.id));
    setBlogDelete(null);
  }

  return (
    <Tabs defaultValue="tours" className="gap-6">
      <TabsList className="flex w-full overflow-x-auto rounded-xl bg-black/5 p-1">
        <TabsTrigger value="tours">Tours</TabsTrigger>
        <TabsTrigger value="past">Past adventures</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="media">Gallery</TabsTrigger>
        <TabsTrigger value="blogs">Blogs</TabsTrigger>
      </TabsList>

      <TabsContent value="tours">
        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Create tour</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              <Input value={tourForm.title} onChange={(event) => setTourForm({ ...tourForm, title: event.target.value })} placeholder="Tour title" />
              <Input value={tourForm.location} onChange={(event) => setTourForm({ ...tourForm, location: event.target.value })} placeholder="Location" />
              <div className="grid grid-cols-2 gap-3">
                <Input value={tourForm.price} onChange={(event) => setTourForm({ ...tourForm, price: event.target.value })} placeholder="Price" />
                <Input value={tourForm.date} onChange={(event) => setTourForm({ ...tourForm, date: event.target.value })} type="date" />
              </div>
              <Input value={tourForm.category} onChange={(event) => setTourForm({ ...tourForm, category: event.target.value })} placeholder="Category" />
              <Input value={tourForm.image} onChange={(event) => setTourForm({ ...tourForm, image: event.target.value })} placeholder="Hero image URL" />
              <input type="file" accept="image/*" onChange={async (event) => { const images = await filesToDataUrls(event.target.files); if (images[0]) setTourForm((current) => ({ ...current, image: images[0] })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" />
              <input type="file" multiple accept="image/*" onChange={async (event) => { const images = await filesToDataUrls(event.target.files); if (images.length) setTourForm((current) => ({ ...current, gallery: images })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" />
              <select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={tourForm.status} onChange={(event) => setTourForm({ ...tourForm, status: event.target.value })}>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
              <Textarea value={tourForm.overview} onChange={(event) => setTourForm({ ...tourForm, overview: event.target.value })} placeholder="Overview" />
              <div className="rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/60">Preview</p>
                <img src={tourForm.image} alt={tourForm.title || "Tour preview"} className="mt-3 h-48 w-full rounded-lg object-cover" />
                {tourForm.gallery.length ? <div className="mt-3 grid grid-cols-3 gap-2">{tourForm.gallery.map((image) => <img key={image} src={image} alt="Gallery preview" className="h-20 w-full rounded-lg object-cover" />)}</div> : null}
              </div>
              <Button className="rounded-xl bg-primary text-white" onClick={createTourItem}>Create tour</Button>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Tour catalogue</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {tours.map((tour) => (
                <div key={tour.id} className="flex items-center gap-4 rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4">
                  <img src={tour.image} alt={tour.title} className="h-20 w-24 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1"><p className="font-semibold">{tour.title}</p><p className="text-xs text-on-surface-variant">{tour.location} | {tour.date} | {tour.status}</p></div>
                  <div className="flex gap-2">
                    <IconButton icon="visibility" label="View tour" onClick={() => setTourView(tour)} />
                    <IconButton icon="edit" label="Edit tour" onClick={() => openTourEdit(tour)} />
                    <IconButton icon="delete" label="Delete tour" variant="destructive" onClick={() => setTourDelete(tour)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="past">
        <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
          <CardHeader><CardTitle>Past adventures</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {pastTours.map((tour) => (
              <div key={tour.id} className="flex items-center justify-between rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4">
                <div><p className="font-semibold">{tour.title}</p><p className="text-xs text-on-surface-variant">{tour.location} | {tour.date}</p></div>
                <div className="flex gap-2">
                  <IconButton icon="visibility" label="View past adventure" onClick={() => setTourView(tour)} />
                  <IconButton icon="edit" label="Edit past adventure" onClick={() => openTourEdit(tour)} />
                  <IconButton icon="delete" label="Delete past adventure" variant="destructive" onClick={() => setTourDelete(tour)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Add notification</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              <Input value={notificationForm.title} onChange={(event) => setNotificationForm({ ...notificationForm, title: event.target.value })} placeholder="Notification title" />
              <Textarea value={notificationForm.body} onChange={(event) => setNotificationForm({ ...notificationForm, body: event.target.value })} placeholder="Body" />
              <select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={notificationForm.audience} onChange={(event) => setNotificationForm({ ...notificationForm, audience: event.target.value as "public" | "travelers" })}>
                <option value="public">Public</option><option value="travelers">Travelers</option>
              </select>
              <Button className="rounded-xl bg-primary text-white" onClick={createNotificationItem}>Publish notification</Button>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Live notifications</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {notifications.map((item) => (
                <div key={item.id} className="rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div><p className="font-semibold">{item.title}</p><p className="mt-1 text-xs text-on-surface-variant">{item.audience}</p></div>
                    <div className="flex gap-2">
                      <IconButton icon="visibility" label="View notification" onClick={() => setNotificationView(item)} />
                      <IconButton icon="edit" label="Edit notification" onClick={() => openNotificationEdit(item)} />
                      <IconButton icon="delete" label="Delete notification" variant="destructive" onClick={() => setNotificationDelete(item)} />
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-on-surface-variant">{item.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="media">
        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Add gallery to tour</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              <select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={mediaForm.selectedTourId} onChange={(event) => setMediaForm({ ...mediaForm, selectedTourId: event.target.value, tag: event.target.value })}>
                <option value="">Select tour</option>{tours.map((tour) => <option key={tour.id} value={tour.id}>{tour.title}</option>)}
              </select>
              <Input value={mediaForm.title} onChange={(event) => setMediaForm({ ...mediaForm, title: event.target.value })} placeholder="Asset title" />
              <Input value={mediaForm.tag} onChange={(event) => setMediaForm({ ...mediaForm, tag: event.target.value })} placeholder="Tag" />
              <select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={mediaForm.surface} onChange={(event) => setMediaForm({ ...mediaForm, surface: event.target.value as "hero" | "gallery" | "tour" })}>
                <option value="gallery">Gallery</option><option value="hero">Hero</option><option value="tour">Tour</option>
              </select>
              <input type="file" multiple accept="image/*" onChange={async (event) => { const images = await filesToDataUrls(event.target.files); if (images.length) setMediaForm((current) => ({ ...current, previews: images })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" />
              {mediaForm.previews.length ? <div className="grid grid-cols-3 gap-2">{mediaForm.previews.map((image) => <img key={image} src={image} alt="Media preview" className="h-24 w-full rounded-lg object-cover" />)}</div> : null}
              <Button className="rounded-xl bg-primary text-white" onClick={createMediaItems}>Upload gallery</Button>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Gallery library</CardTitle></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {media.map((item) => (
                <div key={item.id} className="rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-3">
                  <img src={item.url} alt={item.title} className="h-40 w-full rounded-lg object-cover" />
                  <div className="mt-3"><p className="font-semibold">{item.title}</p><p className="text-xs text-on-surface-variant">{item.tag} | {item.surface}</p></div>
                  <div className="mt-3 flex gap-2">
                    <IconButton icon="visibility" label="View asset" onClick={() => setMediaView(item)} />
                    <IconButton icon="edit" label="Edit asset" onClick={() => openMediaEdit(item)} />
                    <IconButton icon="delete" label="Delete asset" variant="destructive" onClick={() => setMediaDelete(item)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="blogs">
        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Add blog</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              <Input value={blogForm.title} onChange={(event) => setBlogForm({ ...blogForm, title: event.target.value })} placeholder="Blog title" />
              <Input value={blogForm.category} onChange={(event) => setBlogForm({ ...blogForm, category: event.target.value })} placeholder="Category" />
              <Input value={blogForm.image} onChange={(event) => setBlogForm({ ...blogForm, image: event.target.value })} placeholder="Cover image URL" />
              <input type="file" accept="image/*" onChange={async (event) => { const images = await filesToDataUrls(event.target.files); if (images[0]) setBlogForm((current) => ({ ...current, image: images[0] })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" />
              <img src={blogForm.image} alt="Blog preview" className="h-48 w-full rounded-lg object-cover" />
              <Textarea value={blogForm.excerpt} onChange={(event) => setBlogForm({ ...blogForm, excerpt: event.target.value })} placeholder="Excerpt" />
              <Textarea value={blogForm.body} onChange={(event) => setBlogForm({ ...blogForm, body: event.target.value })} placeholder="Body" />
              <Button className="rounded-xl bg-primary text-white" onClick={createBlogItem}>Publish blog</Button>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Landing blog feed</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {blogs.map((blog) => (
                <div key={blog.id} className="rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4">
                  <div className="flex items-center gap-4">
                    <img src={blog.image} alt={blog.title} className="h-20 w-24 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1"><p className="font-semibold">{blog.title}</p><p className="text-xs text-on-surface-variant">{blog.category}</p></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <IconButton icon="visibility" label="View blog" onClick={() => setBlogView(blog)} />
                    <IconButton icon="edit" label="Edit blog" onClick={() => openBlogEdit(blog)} />
                    <IconButton icon="delete" label="Delete blog" variant="destructive" onClick={() => setBlogDelete(blog)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <Dialog open={!!tourView} onOpenChange={(open) => { if (!open) setTourView(null); }}>
        <DialogContent className="max-w-2xl rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>{tourView?.title}</DialogTitle><DialogDescription>Tour preview for the public catalogue.</DialogDescription></DialogHeader>{tourView ? <div className="grid gap-4"><img src={tourView.image} alt={tourView.title} className="h-64 w-full rounded-lg object-cover" /><p className="text-sm leading-7 text-[#6d5c48]">{tourView.overview}</p>{(tourView.images ?? []).length ? <div className="grid grid-cols-3 gap-3">{(tourView.images ?? []).map((image) => <img key={image} src={image} alt="Tour gallery" className="h-24 w-full rounded-lg object-cover" />)}</div> : null}</div> : null}</DialogContent>
      </Dialog>
      <Dialog open={!!tourEdit} onOpenChange={(open) => { if (!open) setTourEdit(null); }}>
        <DialogContent className="max-w-2xl rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>Edit tour</DialogTitle><DialogDescription>Update tour content, media, and status.</DialogDescription></DialogHeader><div className="grid gap-3"><Input value={tourEditForm.title} onChange={(event) => setTourEditForm({ ...tourEditForm, title: event.target.value })} placeholder="Tour title" /><Input value={tourEditForm.location} onChange={(event) => setTourEditForm({ ...tourEditForm, location: event.target.value })} placeholder="Location" /><div className="grid grid-cols-2 gap-3"><Input value={tourEditForm.price} onChange={(event) => setTourEditForm({ ...tourEditForm, price: event.target.value })} placeholder="Price" /><Input value={tourEditForm.date} onChange={(event) => setTourEditForm({ ...tourEditForm, date: event.target.value })} type="date" /></div><Input value={tourEditForm.category} onChange={(event) => setTourEditForm({ ...tourEditForm, category: event.target.value })} placeholder="Category" /><Input value={tourEditForm.image} onChange={(event) => setTourEditForm({ ...tourEditForm, image: event.target.value })} placeholder="Hero image URL" /><input type="file" accept="image/*" onChange={async (event) => { const images = await filesToDataUrls(event.target.files); if (images[0]) setTourEditForm((current) => ({ ...current, image: images[0] })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" /><input type="file" multiple accept="image/*" onChange={async (event) => { const images = await filesToDataUrls(event.target.files); if (images.length) setTourEditForm((current) => ({ ...current, gallery: images })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" /><select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={tourEditForm.status} onChange={(event) => setTourEditForm({ ...tourEditForm, status: event.target.value })}><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select><Textarea value={tourEditForm.overview} onChange={(event) => setTourEditForm({ ...tourEditForm, overview: event.target.value })} placeholder="Overview" /></div><DialogFooter><Button variant="outline" className="rounded-lg" onClick={() => setTourEdit(null)}>Cancel</Button><Button className="rounded-lg bg-primary text-white" onClick={updateTourItem}>Update tour</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={!!tourDelete} onOpenChange={(open) => { if (!open) setTourDelete(null); }}>
        <DialogContent className="max-w-md rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>Delete tour</DialogTitle><DialogDescription>Remove this tour from the catalogue.</DialogDescription></DialogHeader><p className="text-sm text-[#6d5c48]">Delete {tourDelete?.title}?</p><DialogFooter><Button variant="outline" className="rounded-lg" onClick={() => setTourDelete(null)}>Cancel</Button><Button variant="destructive" className="rounded-lg" onClick={deleteTourItem}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={!!notificationView} onOpenChange={(open) => { if (!open) setNotificationView(null); }}>
        <DialogContent className="max-w-lg rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>{notificationView?.title}</DialogTitle><DialogDescription>Audience and message preview.</DialogDescription></DialogHeader>{notificationView ? <div className="grid gap-4 rounded-lg border border-[#eadbc7] bg-white p-4"><p className="text-sm font-semibold text-[#23180d]">Audience: {notificationView.audience}</p><p className="text-sm leading-7 text-[#6d5c48]">{notificationView.body}</p></div> : null}</DialogContent>
      </Dialog>
      <Dialog open={!!notificationEdit} onOpenChange={(open) => { if (!open) setNotificationEdit(null); }}>
        <DialogContent className="max-w-lg rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>Edit notification</DialogTitle><DialogDescription>Update copy and audience settings.</DialogDescription></DialogHeader><div className="grid gap-3"><Input value={notificationEditForm.title} onChange={(event) => setNotificationEditForm({ ...notificationEditForm, title: event.target.value })} placeholder="Notification title" /><Textarea value={notificationEditForm.body} onChange={(event) => setNotificationEditForm({ ...notificationEditForm, body: event.target.value })} placeholder="Body" /><select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={notificationEditForm.audience} onChange={(event) => setNotificationEditForm({ ...notificationEditForm, audience: event.target.value as "public" | "travelers" })}><option value="public">Public</option><option value="travelers">Travelers</option></select></div><DialogFooter><Button variant="outline" className="rounded-lg" onClick={() => setNotificationEdit(null)}>Cancel</Button><Button className="rounded-lg bg-primary text-white" onClick={updateNotificationItem}>Update notification</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={!!notificationDelete} onOpenChange={(open) => { if (!open) setNotificationDelete(null); }}>
        <DialogContent className="max-w-md rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>Delete notification</DialogTitle><DialogDescription>Remove this notification from the feed.</DialogDescription></DialogHeader><p className="text-sm text-[#6d5c48]">Delete {notificationDelete?.title}?</p><DialogFooter><Button variant="outline" className="rounded-lg" onClick={() => setNotificationDelete(null)}>Cancel</Button><Button variant="destructive" className="rounded-lg" onClick={deleteNotificationItem}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={!!mediaView} onOpenChange={(open) => { if (!open) setMediaView(null); }}>
        <DialogContent className="max-w-xl rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>{mediaView?.title}</DialogTitle><DialogDescription>Gallery asset preview and placement details.</DialogDescription></DialogHeader>{mediaView ? <div className="grid gap-4"><img src={mediaView.url} alt={mediaView.title} className="h-72 w-full rounded-lg object-cover" /><div className="grid gap-4 rounded-lg border border-[#eadbc7] bg-white p-4 md:grid-cols-2"><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Tag</p><p className="mt-2 text-sm">{mediaView.tag}</p></div><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Surface</p><p className="mt-2 text-sm">{mediaView.surface}</p></div></div></div> : null}</DialogContent>
      </Dialog>
      <Dialog open={!!mediaEdit} onOpenChange={(open) => { if (!open) setMediaEdit(null); }}>
        <DialogContent className="max-w-xl rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>Edit gallery asset</DialogTitle><DialogDescription>Update linked tour, placement, and image preview.</DialogDescription></DialogHeader><div className="grid gap-3"><select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={mediaEditForm.selectedTourId} onChange={(event) => setMediaEditForm({ ...mediaEditForm, selectedTourId: event.target.value, tag: event.target.value })}><option value="">Select tour</option>{tours.map((tour) => <option key={tour.id} value={tour.id}>{tour.title}</option>)}</select><Input value={mediaEditForm.title} onChange={(event) => setMediaEditForm({ ...mediaEditForm, title: event.target.value })} placeholder="Asset title" /><Input value={mediaEditForm.tag} onChange={(event) => setMediaEditForm({ ...mediaEditForm, tag: event.target.value })} placeholder="Tag" /><select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={mediaEditForm.surface} onChange={(event) => setMediaEditForm({ ...mediaEditForm, surface: event.target.value as "hero" | "gallery" | "tour" })}><option value="gallery">Gallery</option><option value="hero">Hero</option><option value="tour">Tour</option></select><input type="file" accept="image/*" onChange={async (event) => { const images = await filesToDataUrls(event.target.files); if (images[0]) setMediaEditForm((current) => ({ ...current, previews: [images[0]] })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" />{mediaEditForm.previews[0] ? <img src={mediaEditForm.previews[0]} alt="Asset preview" className="h-48 w-full rounded-lg object-cover" /> : null}</div><DialogFooter><Button variant="outline" className="rounded-lg" onClick={() => setMediaEdit(null)}>Cancel</Button><Button className="rounded-lg bg-primary text-white" onClick={updateMediaItem}>Update asset</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={!!mediaDelete} onOpenChange={(open) => { if (!open) setMediaDelete(null); }}>
        <DialogContent className="max-w-md rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>Delete asset</DialogTitle><DialogDescription>Remove this image from the library.</DialogDescription></DialogHeader><p className="text-sm text-[#6d5c48]">Delete {mediaDelete?.title}?</p><DialogFooter><Button variant="outline" className="rounded-lg" onClick={() => setMediaDelete(null)}>Cancel</Button><Button variant="destructive" className="rounded-lg" onClick={deleteMediaItem}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={!!blogView} onOpenChange={(open) => { if (!open) setBlogView(null); }}>
        <DialogContent className="max-w-2xl rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>{blogView?.title}</DialogTitle><DialogDescription>Landing-page article preview.</DialogDescription></DialogHeader>{blogView ? <div className="grid gap-4"><img src={blogView.image} alt={blogView.title} className="h-64 w-full rounded-lg object-cover" /><p className="text-sm font-semibold text-[#23180d]">{blogView.category}</p><p className="text-sm text-[#6d5c48]">{blogView.excerpt}</p><p className="text-sm leading-7 text-[#6d5c48]">{blogView.body}</p></div> : null}</DialogContent>
      </Dialog>
      <Dialog open={!!blogEdit} onOpenChange={(open) => { if (!open) setBlogEdit(null); }}>
        <DialogContent className="max-w-2xl rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>Edit blog</DialogTitle><DialogDescription>Update article imagery and editorial copy.</DialogDescription></DialogHeader><div className="grid gap-3"><Input value={blogEditForm.title} onChange={(event) => setBlogEditForm({ ...blogEditForm, title: event.target.value })} placeholder="Blog title" /><Input value={blogEditForm.category} onChange={(event) => setBlogEditForm({ ...blogEditForm, category: event.target.value })} placeholder="Category" /><Input value={blogEditForm.image} onChange={(event) => setBlogEditForm({ ...blogEditForm, image: event.target.value })} placeholder="Cover image URL" /><input type="file" accept="image/*" onChange={async (event) => { const images = await filesToDataUrls(event.target.files); if (images[0]) setBlogEditForm((current) => ({ ...current, image: images[0] })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" /><img src={blogEditForm.image} alt="Blog preview" className="h-48 w-full rounded-lg object-cover" /><Textarea value={blogEditForm.excerpt} onChange={(event) => setBlogEditForm({ ...blogEditForm, excerpt: event.target.value })} placeholder="Excerpt" /><Textarea value={blogEditForm.body} onChange={(event) => setBlogEditForm({ ...blogEditForm, body: event.target.value })} placeholder="Body" /></div><DialogFooter><Button variant="outline" className="rounded-lg" onClick={() => setBlogEdit(null)}>Cancel</Button><Button className="rounded-lg bg-primary text-white" onClick={updateBlogItem}>Update blog</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={!!blogDelete} onOpenChange={(open) => { if (!open) setBlogDelete(null); }}>
        <DialogContent className="max-w-md rounded-lg bg-[#fffaf2]"><DialogHeader><DialogTitle>Delete blog</DialogTitle><DialogDescription>Remove this article from the landing feed.</DialogDescription></DialogHeader><p className="text-sm text-[#6d5c48]">Delete {blogDelete?.title}?</p><DialogFooter><Button variant="outline" className="rounded-lg" onClick={() => setBlogDelete(null)}>Cancel</Button><Button variant="destructive" className="rounded-lg" onClick={deleteBlogItem}>Delete</Button></DialogFooter></DialogContent>
      </Dialog>
    </Tabs>
  );
}

