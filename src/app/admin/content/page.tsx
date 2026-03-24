import { AdminContentManager } from "@/components/admin/AdminContentManager";
import { getBlogPosts, getCatalogue, getMediaAssets, getSiteNotifications } from "@/lib/mock-data";

export default async function AdminContentPage() {
  const [tours, notifications, media, blogs] = await Promise.all([getCatalogue(), getSiteNotifications(), getMediaAssets(), getBlogPosts()]);
  return <AdminContentManager initialTours={tours} initialNotifications={notifications} initialMedia={media} initialBlogs={blogs} />;
}
