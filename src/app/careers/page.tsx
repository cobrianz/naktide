import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roles = [
  "Senior safari operations coordinator",
  "Concierge travel designer",
  "Content and expedition storyteller",
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <h1 className="text-5xl font-black tracking-tighter text-on-background md:text-6xl">Careers</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant">
          We hire for judgment, hospitality, and operational calm. If you understand high-touch safari delivery, we want to hear from you.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <Card key={role} className="rounded-xl border-outline-variant/20 bg-white/80">
              <CardHeader>
                <CardTitle>{role}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-on-surface-variant">
                Nairobi-based or hybrid, depending on role and seasonality.
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
