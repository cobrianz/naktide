import { getSiteNotifications } from "@/lib/mock-data";
import { getActivePublicNotice } from "@/lib/public-content";

export default async function NoticeBanner() {
  const notice = getActivePublicNotice(await getSiteNotifications());
  if (!notice) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-secondary-container px-6 py-3 pt-[88px] text-on-secondary-container">
      <span className="material-symbols-outlined rounded-full border border-on-secondary-container/20 p-1 text-xl">campaign</span>
      <span className="text-sm font-bold tracking-wide">
        NOTICE: {notice.title}
        {notice.body ? `: ${notice.body}` : ""}
      </span>
    </div>
  );
}
