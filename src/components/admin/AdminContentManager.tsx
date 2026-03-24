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
      <span className="material-symbols-outlined text-base">{icon}</span>
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
