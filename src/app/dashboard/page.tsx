import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate, formatDateTime, titleCase } from "@/lib/formatters";
import { getDashboardSummary, getUserBookings, getUserMessages, getUserProfile } from "@/lib/mock-data";

export default async function DashboardPage() {
  const [profile, summary, bookings, messages] = await Promise.all([
    getUserProfile(),
    getDashboardSummary(),
    getUserBookings(),
    getUserMessages(),
  ]);

  const activeBookings = bookings.filter((booking) => booking.status !== "completed").slice(0, 3);
  const recentMessages = messages.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="rounded-xl border-0 bg-[#1a1c19] text-white">
          <CardContent className="grid gap-8 p-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#f3b38d]">Explorer terminal</p>
              <h2 className="mt-4 text-4xl font-black italic tracking-tight lg:text-6xl">
                Jambo, {profile.firstName}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 lg:text-base">
                Your dashboard is now driven by a shared mock repository and route handlers, so all traveler
                surfaces can move to MongoDB later without changing the page contracts.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge className="bg-white/10 px-4 py-2 text-white">Next window: {profile.nextJourneyWindow}</Badge>
                <Badge className="bg-[#f16529] px-4 py-2 text-white">{profile.tier}</Badge>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] bg-white/6 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/55">Reward points</p>
                <p className="mt-3 text-4xl font-black">{summary.rewardPoints.toLocaleString()}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/6 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/55">Total spend</p>
                <p className="mt-3 text-4xl font-black">{formatCurrency(summary.totalSpend)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <Card className="rounded-xl border-0 bg-[#fff7ef]">
            <CardContent className="p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/55">Open work</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <p className="text-3xl font-black">{summary.activeBookings}</p>
                  <p className="text-sm text-[#5a413a]">Active bookings</p>
                </div>
                <div>
                  <p className="text-3xl font-black">{summary.unreadMessages}</p>
                  <p className="text-sm text-[#5a413a]">Unread messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-0 bg-[#eef6ef]">
            <CardContent className="p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-secondary/60">Saved plans</p>
              <p className="mt-4 text-3xl font-black">{summary.wishlistCount}</p>
              <p className="mt-2 text-sm text-[#36583a]">Destinations queued for your next itinerary review.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-xl border-white/70 bg-white/70">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-xl font-black">Active bookings</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Journey</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="px-6 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{booking.adventureTitle}</p>
                        <p className="text-xs text-muted-foreground">{booking.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(booking.travelDate)}</TableCell>
                    <TableCell>
                      <Badge variant={booking.status === "pending" ? "outline" : "secondary"}>
                        {titleCase(booking.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 text-right font-semibold">
                      {formatCurrency(booking.amount, booking.currency)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-white/70 bg-white/70">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-xl font-black">Concierge feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {recentMessages.map((message) => (
              <div key={message.id} className="rounded-[1.5rem] border border-[#1a1c19]/8 bg-[#faf8f3] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{message.subject}</p>
                  <Badge variant={message.status === "unread" ? "default" : "outline"}>
                    {titleCase(message.status)}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{message.preview}</p>
                <p className="mt-3 text-xs font-medium text-[#5a413a]">
                  {message.from} • {formatDateTime(message.receivedAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
