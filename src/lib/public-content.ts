import type { Adventure } from "@/api/adventures";
import type { BlogPost, MediaAsset, SiteNotification } from "@/lib/mock-data";

export type HeroSlide = {
  image: string;
  date: string;
  category: string;
  title: string;
  id: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function matchesTag(tag: string, tour: Adventure) {
  const normalizedTag = normalize(tag);
  return (
    normalizedTag === tour.id ||
    normalizedTag === normalize(tour.title) ||
    normalizedTag === normalize(tour.location) ||
    normalize(tour.title).includes(normalizedTag) ||
    normalize(tour.location).includes(normalizedTag)
  );
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function getActivePublicNotice(notifications: SiteNotification[]) {
  return notifications.find((item) => item.active && item.audience === "public");
}

export function getHeroSlides(tours: Adventure[], media: MediaAsset[], limit = 6): HeroSlide[] {
  const upcomingTours = tours.filter((tour) => tour.status === "upcoming");
  if (!upcomingTours.length) return [];

  const heroAssets = media.filter((asset) => asset.surface === "hero");
  if (!heroAssets.length) {
    return upcomingTours.slice(0, limit).map((tour) => ({
      image: tour.image,
      date: tour.date,
      category: tour.category,
      title: tour.title,
      id: tour.id,
    }));
  }

  return heroAssets.slice(0, limit).map((asset, index) => {
    const linkedTour = upcomingTours.find((tour) => matchesTag(asset.tag, tour)) ?? upcomingTours[index % upcomingTours.length];
    return {
      image: asset.url || linkedTour.image,
      date: linkedTour.date,
      category: linkedTour.category,
      title: linkedTour.title,
      id: linkedTour.id,
    };
  });
}

export function getTourGalleryImages(tour: Adventure, media: MediaAsset[]) {
  const taggedMedia = media.filter((asset) => asset.surface !== "hero" && matchesTag(asset.tag, tour)).map((asset) => asset.url);
  if (taggedMedia.length) {
    return unique([tour.image, ...taggedMedia]);
  }
  return unique([tour.image, ...(tour.images ?? [])]);
}

export function getFeaturedEditorial(blogPosts: BlogPost[], media: MediaAsset[]) {
  const post = blogPosts[0];
  const image = media.find((asset) => asset.surface === "hero")?.url ?? post?.image ?? "";
  return { post, image };
}
