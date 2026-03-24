"use client";

import { useMemo, useState } from "react";

import type { Adventure } from "@/api/adventures";
import type { BlogPost, MediaAsset, SiteNotification } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function AdminContentManager({
  initialTours,
  initialNotifications,
  initialMedia,
  initialBlogs,
}: {
  initialTours: Adventure[];
  initialNotifications: SiteNotification[];
  initialMedia: MediaAsset[];
  initialBlogs: BlogPost[];
}) {
  const [tours, setTours] = useState(initialTours);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [media, setMedia] = useState(initialMedia);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [editingNotificationId, setEditingNotificationId] = useState<string | null>(null);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [tourForm, setTourForm] = useState({
    title: "",
    location: "Kenya",
    price: "Ksh 0",
    date: "2026-07-01",
    overview: "",
    category: "Safari",
    image: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
    gallery: [] as string[],
    status: "upcoming",
  });
  const [notificationForm, setNotificationForm] = useState({ title: "", body: "", audience: "public", active: true });
  const [mediaForm, setMediaForm] = useState({ title: "", tag: "", surface: "gallery", selectedTourId: "", previews: [] as string[] });
  const [blogForm, setBlogForm] = useState({ title: "", category: "Planning", excerpt: "", body: "", image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg" });
  const pastTours = useMemo(() => tours.filter((tour) => tour.status === "completed"), [tours]);

  function resetTourForm() {
    setEditingTourId(null);
    setTourForm({
      title: "",
      location: "Kenya",
      price: "Ksh 0",
      date: "2026-07-01",
      overview: "",
      category: "Safari",
      image: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
      gallery: [],
      status: "upcoming",
    });
  }

  function resetMediaForm() {
    setEditingMediaId(null);
    setMediaForm({ title: "", tag: "", surface: "gallery", selectedTourId: "", previews: [] });
  }

  function resetBlogForm() {
    setEditingBlogId(null);
    setBlogForm({ title: "", category: "Planning", excerpt: "", body: "", image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg" });
  }

  function resetNotificationForm() {
    setEditingNotificationId(null);
    setNotificationForm({ title: "", body: "", audience: "public", active: true });
  }

  async function saveTour() {
    const payload = {
      ...tourForm,
      image: tourForm.image,
      gallery: tourForm.gallery,
    };

    if (editingTourId) {
      const response = await fetch("/api/admin/tours", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingTourId, ...payload, images: [tourForm.image, ...tourForm.gallery] }),
      });
      const result = await response.json();
      setTours((current) => current.map((tour) => (tour.id === editingTourId ? result.data : tour)));
    } else {
      const response = await fetch("/api/admin/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setTours((current) => [result.data, ...current]);
    }

    resetTourForm();
  }

  async function deleteTour(id: string) {
    await fetch("/api/admin/tours", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setTours((current) => current.filter((tour) => tour.id !== id));
  }

  function startEditTour(tour: Adventure) {
    setEditingTourId(tour.id);
    setTourForm({
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

  async function saveNotification() {
    if (editingNotificationId) {
      const response = await fetch("/api/admin/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingNotificationId, ...notificationForm }) });
      const result = await response.json();
      setNotifications((current) => current.map((item) => (item.id === editingNotificationId ? result.data : item)));
    } else {
      const response = await fetch("/api/admin/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(notificationForm) });
      const result = await response.json();
      setNotifications((current) => [result.data, ...current]);
    }
    resetNotificationForm();
  }

  async function deleteNotificationItem(id: string) {
    await fetch("/api/admin/notifications", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setNotifications((current) => current.filter((item) => item.id !== id));
  }

  async function saveMedia() {
    if (editingMediaId && mediaForm.previews[0]) {
      const response = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingMediaId,
          title: mediaForm.title,
          tag: mediaForm.tag || mediaForm.selectedTourId,
          surface: mediaForm.surface,
          url: mediaForm.previews[0],
        }),
      });
      const result = await response.json();
      setMedia((current) => current.map((item) => (item.id === editingMediaId ? result.data : item)));
      resetMediaForm();
      return;
    }

    const createdItems: MediaAsset[] = [];
    for (const [index, preview] of mediaForm.previews.entries()) {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${mediaForm.title || "Gallery image"} ${index + 1}`,
          url: preview,
          tag: mediaForm.tag || mediaForm.selectedTourId,
          surface: mediaForm.surface,
        }),
      });
      const result = await response.json();
      createdItems.push(result.data);
    }
    setMedia((current) => [...createdItems, ...current]);

    if (mediaForm.selectedTourId && mediaForm.previews.length) {
      const selectedTour = tours.find((tour) => tour.id === mediaForm.selectedTourId);
      if (selectedTour) {
        const nextImages = Array.from(new Set([...(selectedTour.images ?? [selectedTour.image]), ...mediaForm.previews]));
        const response = await fetch("/api/admin/tours", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedTour.id, images: nextImages }),
        });
        const result = await response.json();
        setTours((current) => current.map((tour) => (tour.id === selectedTour.id ? result.data : tour)));
      }
    }

    resetMediaForm();
  }

  async function deleteMediaItem(id: string) {
    await fetch("/api/admin/media", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setMedia((current) => current.filter((item) => item.id !== id));
  }

  function startEditMedia(item: MediaAsset) {
    setEditingMediaId(item.id);
    setMediaForm({ title: item.title, tag: item.tag, surface: item.surface, selectedTourId: item.tag, previews: [item.url] });
  }

  async function saveBlog() {
    if (editingBlogId) {
      const response = await fetch("/api/admin/blogs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingBlogId, ...blogForm }),
      });
      const result = await response.json();
      setBlogs((current) => current.map((item) => (item.id === editingBlogId ? result.data : item)));
    } else {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogForm),
      });
      const result = await response.json();
      setBlogs((current) => [result.data, ...current]);
    }
    resetBlogForm();
  }

  async function deleteBlog(id: string) {
    await fetch("/api/admin/blogs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setBlogs((current) => current.filter((item) => item.id !== id));
  }

  function startEditBlog(blog: BlogPost) {
    setEditingBlogId(blog.id);
    setBlogForm({ title: blog.title, category: blog.category, excerpt: blog.excerpt, body: blog.body, image: blog.image });
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
            <CardHeader><CardTitle>{editingTourId ? "Edit tour" : "Create tour"}</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              <Input value={tourForm.title} onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })} placeholder="Tour title" />
              <Input value={tourForm.location} onChange={(e) => setTourForm({ ...tourForm, location: e.target.value })} placeholder="Location" />
              <div className="grid grid-cols-2 gap-3">
                <Input value={tourForm.price} onChange={(e) => setTourForm({ ...tourForm, price: e.target.value })} placeholder="Price" />
                <Input value={tourForm.date} onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })} type="date" />
              </div>
              <Input value={tourForm.category} onChange={(e) => setTourForm({ ...tourForm, category: e.target.value })} placeholder="Category" />
              <Input value={tourForm.image} onChange={(e) => setTourForm({ ...tourForm, image: e.target.value })} placeholder="Hero image URL" />
              <input type="file" accept="image/*" onChange={async (e) => { const images = await filesToDataUrls(e.target.files); if (images[0]) setTourForm((current) => ({ ...current, image: images[0] })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" />
              <input type="file" multiple accept="image/*" onChange={async (e) => { const images = await filesToDataUrls(e.target.files); if (images.length) setTourForm((current) => ({ ...current, gallery: images })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" />
              <select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={tourForm.status} onChange={(e) => setTourForm({ ...tourForm, status: e.target.value })}>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
              <Textarea value={tourForm.overview} onChange={(e) => setTourForm({ ...tourForm, overview: e.target.value })} placeholder="Overview" />
              <div className="rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/60">Preview</p>
                <img src={tourForm.image} alt={tourForm.title || "Tour preview"} className="mt-3 h-48 w-full rounded-lg object-cover" />
                {tourForm.gallery.length ? <div className="mt-3 grid grid-cols-3 gap-2">{tourForm.gallery.map((image) => <img key={image} src={image} alt="Gallery preview" className="h-20 w-full rounded-lg object-cover" />)}</div> : null}
              </div>
              <div className="flex gap-3">
                <Button className="rounded-xl bg-primary text-white" onClick={saveTour}>{editingTourId ? "Update tour" : "Create tour"}</Button>
                {editingTourId ? <Button variant="outline" className="rounded-xl" onClick={resetTourForm}>Cancel</Button> : null}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white">
            <CardHeader><CardTitle>Tour catalogue</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {tours.map((tour) => (
                <div key={tour.id} className="flex items-center gap-4 rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4">
                  <img src={tour.image} alt={tour.title} className="h-20 w-24 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{tour.title}</p>
                    <p className="text-xs text-on-surface-variant">{tour.location} | {tour.date} | {tour.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl" onClick={() => startEditTour(tour)}>Edit</Button>
                    <Button variant="destructive" className="rounded-xl" onClick={() => deleteTour(tour.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="past">
        <Card className="rounded-xl border-[#1a1c19]/8 bg-white"><CardHeader><CardTitle>Past adventures</CardTitle></CardHeader><CardContent className="grid gap-3">{pastTours.map((tour) => <div key={tour.id} className="flex items-center justify-between rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4"><div><p className="font-semibold">{tour.title}</p><p className="text-xs text-on-surface-variant">{tour.location} | {tour.date}</p></div><div className="flex gap-2"><Button variant="outline" className="rounded-xl" onClick={() => startEditTour(tour)}>Edit</Button><Button variant="destructive" className="rounded-xl" onClick={() => deleteTour(tour.id)}>Delete</Button></div></div>)}</CardContent></Card>
      </TabsContent>

      <TabsContent value="notifications">
        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white"><CardHeader><CardTitle>{editingNotificationId ? "Edit notification" : "Add notification"}</CardTitle></CardHeader><CardContent className="grid gap-3"><Input value={notificationForm.title} onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })} placeholder="Notification title" /><Textarea value={notificationForm.body} onChange={(e) => setNotificationForm({ ...notificationForm, body: e.target.value })} placeholder="Body" /><select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={notificationForm.audience} onChange={(e) => setNotificationForm({ ...notificationForm, audience: e.target.value as "public" | "travelers" })}><option value="public">Public</option><option value="travelers">Travelers</option></select><Button className="rounded-xl bg-primary text-white" onClick={saveNotification}>{editingNotificationId ? "Update notification" : "Publish notification"}</Button>{editingNotificationId ? <Button variant="outline" className="rounded-xl" onClick={resetNotificationForm}>Cancel</Button> : null}</CardContent></Card>
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white"><CardHeader><CardTitle>Live notifications</CardTitle></CardHeader><CardContent className="grid gap-3">{notifications.map((item) => <div key={item.id} className="rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold">{item.title}</p><p className="mt-1 text-xs text-on-surface-variant">{item.audience}</p></div><div className="flex gap-2"><Button variant="outline" className="rounded-xl" onClick={() => { setEditingNotificationId(item.id); setNotificationForm({ title: item.title, body: item.body, audience: item.audience, active: item.active }); }}>Edit</Button><Button variant="destructive" className="rounded-xl" onClick={() => deleteNotificationItem(item.id)}>Delete</Button></div></div><p className="mt-3 text-sm text-on-surface-variant">{item.body}</p></div>)}</CardContent></Card>
        </div>
      </TabsContent>

      <TabsContent value="media">
        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white"><CardHeader><CardTitle>{editingMediaId ? "Edit gallery asset" : "Add gallery to tour"}</CardTitle></CardHeader><CardContent className="grid gap-3"><select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={mediaForm.selectedTourId} onChange={(e) => setMediaForm({ ...mediaForm, selectedTourId: e.target.value, tag: e.target.value })}><option value="">Select tour</option>{tours.map((tour: Adventure) => <option key={tour.id} value={tour.id}>{tour.title}</option>)}</select><Input value={mediaForm.title} onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })} placeholder="Asset title" /><Input value={mediaForm.tag} onChange={(e) => setMediaForm({ ...mediaForm, tag: e.target.value })} placeholder="Tag" /><select className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" value={mediaForm.surface} onChange={(e) => setMediaForm({ ...mediaForm, surface: e.target.value })}><option value="gallery">Gallery</option><option value="hero">Hero</option><option value="tour">Tour</option></select><input type="file" multiple accept="image/*" onChange={async (e) => { const images = await filesToDataUrls(e.target.files); if (images.length) setMediaForm((current) => ({ ...current, previews: images })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" />{mediaForm.previews.length ? <div className="grid grid-cols-3 gap-2">{mediaForm.previews.map((image) => <img key={image} src={image} alt="Media preview" className="h-24 w-full rounded-lg object-cover" />)}</div> : null}<div className="flex gap-3"><Button className="rounded-xl bg-primary text-white" onClick={saveMedia}>{editingMediaId ? "Update asset" : "Upload gallery"}</Button>{editingMediaId ? <Button variant="outline" className="rounded-xl" onClick={resetMediaForm}>Cancel</Button> : null}</div></CardContent></Card>
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white"><CardHeader><CardTitle>Gallery library</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{media.map((item) => <div key={item.id} className="rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-3"><img src={item.url} alt={item.title} className="h-40 w-full rounded-lg object-cover" /><div className="mt-3"><p className="font-semibold">{item.title}</p><p className="text-xs text-on-surface-variant">{item.tag} | {item.surface}</p></div><div className="mt-3 flex gap-2"><Button variant="outline" className="rounded-xl" onClick={() => startEditMedia(item)}>Edit</Button><Button variant="destructive" className="rounded-xl" onClick={() => deleteMediaItem(item.id)}>Delete</Button></div></div>)}</CardContent></Card>
        </div>
      </TabsContent>

      <TabsContent value="blogs">
        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white"><CardHeader><CardTitle>{editingBlogId ? "Edit blog" : "Add blog"}</CardTitle></CardHeader><CardContent className="grid gap-3"><Input value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="Blog title" /><Input value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })} placeholder="Category" /><Input value={blogForm.image} onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })} placeholder="Cover image URL" /><input type="file" accept="image/*" onChange={async (e) => { const images = await filesToDataUrls(e.target.files); if (images[0]) setBlogForm((current) => ({ ...current, image: images[0] })); }} className="rounded-lg border border-[#1a1c19]/10 bg-[#faf6ed] px-3 py-2 text-sm" /><img src={blogForm.image} alt="Blog preview" className="h-48 w-full rounded-lg object-cover" /><Textarea value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} placeholder="Excerpt" /><Textarea value={blogForm.body} onChange={(e) => setBlogForm({ ...blogForm, body: e.target.value })} placeholder="Body" /><div className="flex gap-3"><Button className="rounded-xl bg-primary text-white" onClick={saveBlog}>{editingBlogId ? "Update blog" : "Publish blog"}</Button>{editingBlogId ? <Button variant="outline" className="rounded-xl" onClick={resetBlogForm}>Cancel</Button> : null}</div></CardContent></Card>
          <Card className="rounded-xl border-[#1a1c19]/8 bg-white"><CardHeader><CardTitle>Landing blog feed</CardTitle></CardHeader><CardContent className="grid gap-3">{blogs.map((blog) => <div key={blog.id} className="rounded-xl border border-[#1a1c19]/8 bg-[#faf6ed] p-4"><div className="flex items-center gap-4"><img src={blog.image} alt={blog.title} className="h-20 w-24 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="font-semibold">{blog.title}</p><p className="text-xs text-on-surface-variant">{blog.category}</p></div></div><div className="mt-3 flex gap-2"><Button variant="outline" className="rounded-xl" onClick={() => startEditBlog(blog)}>Edit</Button><Button variant="destructive" className="rounded-xl" onClick={() => deleteBlog(blog.id)}>Delete</Button></div></div>)}</CardContent></Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}



