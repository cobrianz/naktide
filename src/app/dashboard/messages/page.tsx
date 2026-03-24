import { DashboardMessagesManager } from "@/components/dashboard/DashboardMessagesManager";
import { getUserMessages } from "@/lib/mock-data";

export default async function MessagesPage() {
  const messages = await getUserMessages();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Messages</p>
        <h2 className="mt-2 text-4xl font-black italic tracking-tight">Concierge inbox</h2>
      </div>
      <DashboardMessagesManager initialMessages={messages} />
    </div>
  );
}
