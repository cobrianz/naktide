import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { getCatalogue, getMediaAssets } from "@/lib/mock-data";
import { getTourGalleryImages } from "@/lib/public-content";

export default async function GalleryPage() {
  const [tours, media] = await Promise.all([getCatalogue(), getMediaAssets()]);
  const cards = tours.flatMap((tour) =>
    getTourGalleryImages(tour, media).map((url) => ({
      id: tour.id,
      url,
      title: tour.title,
      location: tour.location,
      date: tour.date,
    })),
  );

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Navbar />
      <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-32 md:px-8">
        <GalleryBrowser cards={cards} />
      </main>
      <Footer />
    </div>
  );
}
