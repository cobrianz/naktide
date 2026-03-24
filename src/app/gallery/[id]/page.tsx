import { notFound } from "next/navigation";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { GalleryDetailView } from "@/components/gallery/GalleryDetailView";
import { getCatalogue, getMediaAssets } from "@/lib/mock-data";
import { getTourGalleryImages } from "@/lib/public-content";

export default async function EventGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [tours, media] = await Promise.all([getCatalogue(), getMediaAssets()]);
  const adventure = tours.find((tour) => tour.id === id);

  if (!adventure) notFound();

  const images = getTourGalleryImages(adventure, media);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <GalleryDetailView id={adventure.id} title={adventure.title} location={adventure.location} date={adventure.date} images={images} />
      <Footer />
    </div>
  );
}
