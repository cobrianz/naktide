export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Adventure {
  id: string;
  image: string;
  images?: string[];
  altText: string;
  category: string;
  location: string;
  title: string;
  price: string;
  date: string;
  slots: string;
  status: "upcoming" | "completed";
  duration: string;
  difficulty: "Easy" | "Moderate" | "Strenuous";
  groupSize: string;
  overview: string;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
}

export const MOCK_ADVENTURES: Adventure[] = [
  {
    id: "serengeti-crossing-2024",
    image: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    altText: "Close up of a majestic lion in tall grass",
    category: "Safari",
    location: "Tanzania",
    title: "The Serengeti Crossing",
    price: "Ksh 425,000",
    date: "Oct 12, 2024",
    slots: "4 slots left",
    status: "upcoming",
    duration: "7 Days",
    difficulty: "Easy",
    groupSize: "2 - 8 People",
    overview: "Witness one of nature's greatest spectacles. The Great Migration sees millions of wildebeest and zebra brave the treacherous Mara River. Led by expert biologists, this expedition provides unparalleled front-row access to the crossing from both custom modified land cruisers and private bush planes.",
    included: ["All domestic puddle-jumper flights", "Luxury tented camp accommodations", "All meals and select beverages", "Park fees and conservation levies", "Expert photography guidance"],
    excluded: ["International airfare", "Premium spirits & champagne", "Staff gratuities", "Travel insurance (required)"],
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Land at Kilimanjaro International. Private transfer to a colonial-era coffee lodge. Evening briefing with your lead tracker." },
      { day: 2, title: "Flight to Northern Serengeti", description: "A dawn flight drops you directly onto a dirt airstrip in Kogatende. First afternoon game drive focusing on lion pride dynamics." },
      { day: 3, title: "The Mara River Banks", description: "Full day stationed at established crossing points. We wait for the 'trigger'—that electric moment when the herds plunge into the crocodile-infested waters." },
      { day: 4, title: "Aerial Perspective", description: "Take flight in a privately chartered Cessna 208 to photograph the seemingly infinite herds snaking across the golden plains from above." },
      { day: 5, title: "Predator Tracking", description: "Focus shifts from the herds to the apex predators tracking them: cheetahs, leopards, and crocodiles." },
      { day: 6, title: "Grumeti Reserves", description: "Move south to the private Singita Grumeti reserve for exclusive off-road driving and a celebratory bush dinner under the stars." },
      { day: 7, title: "Departure", description: "Morning walking safari before flying back to Arusha for your onward international connections." }
    ]
  },
  {
    id: "gorillas-mist-2024",
    image: "https://images.pexels.com/photos/4034871/pexels-photo-4034871.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/4034871/pexels-photo-4034871.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    altText: "Misty mountain range in Rwanda",
    category: "Trekking",
    location: "Rwanda",
    title: "Gorillas in the Mist",
    price: "Ksh 680,000",
    date: "Nov 05, 2024",
    slots: "2 slots left",
    status: "upcoming",
    duration: "5 Days",
    difficulty: "Strenuous",
    groupSize: "Maximum 6 People",
    overview: "An intensely physical and deeply emotional journey into the heart of the Volcanoes National Park. Track habituated mountain gorilla families through thick, verdant jungle.",
    included: ["Two gorilla tracking permits ($3,000 value)", "Luxury lodge accommodations", "Expert trackers and porters"],
    excluded: ["International flights", "Visas"],
    itinerary: [
      { day: 1, title: "Arrival in Kigali", description: "Transfer to Volcanoes National Park base." },
      { day: 2, title: "First Ascent", description: "Early morning hike into the dense jungle to locate your first gorilla family." },
      { day: 3, title: "Golden Monkeys", description: "A lighter day tracking the endangered and highly active golden monkeys." },
      { day: 4, title: "Second Gorilla Encounter", description: "A longer trek to find a different, larger family group high on the volcano slopes." },
      { day: 5, title: "Return to Kigali", description: "Visit the Kigali Genocide Memorial before departing." }
    ]
  },
  {
    id: "okavango-delta-2024",
    image: "https://images.pexels.com/photos/1670984/pexels-photo-1670984.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1670984/pexels-photo-1670984.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    altText: "Distant silhouette of an elephant against a dusty sunset",
    category: "Photography",
    location: "Botswana",
    title: "Okavango Delta Photo-Op",
    price: "Ksh 510,000",
    date: "Dec 20, 2024",
    slots: "8 slots left",
    status: "upcoming",
    duration: "6 Days",
    difficulty: "Easy",
    groupSize: "4 - 8 People",
    overview: "Gliding quietly through the mirrored waterways of the Okavango Delta in a traditional mokoro canoe.",
    included: ["Mokoro excursions", "Waterway flights", "Photography workshops"],
    excluded: ["International flights", "Lens rentals"],
    itinerary: [
      { day: 1, title: "Maun to Delta", description: "Helicopter transfer directly into the delta camps." },
      { day: 2, title: "Mokoro Trails", description: "Silent gliding through waterways photographing birds and drinking elephants." },
      { day: 3, title: "Island Walking Safari", description: "Tracking wild dogs and leopards on foot." },
      { day: 4, title: "Night Photography", description: "Astrophotography masterclass highlighting the pristine African night sky." },
      { day: 5, title: "Chief's Island", description: "Full day game drive in the game-rich chief's island sector." },
      { day: 6, title: "Departure", description: "Morning birdwatching before departing." }
    ]
  },
  {
    id: "migration-aerial-2023",
    image: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    altText: "Golden sunset over the African Serengeti plains",
    category: "Safari",
    location: "Tanzania",
    title: "The Great Migration Aerial Safari",
    price: "Ksh 485,000",
    date: "Summer 2023",
    slots: "Completed",
    status: "completed",
    duration: "7 Days",
    difficulty: "Moderate",
    groupSize: "8 People",
    overview: "An unprecedented perspective of the wildebeest crossing from a private bush plane expedition.",
    included: ["Flights", "Accommodation", "Meals"],
    excluded: ["Tips"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Meet and greet at Arusha." }
    ]
  },
  {
    id: "bwindi-trek-2023",
    image: "https://images.pexels.com/photos/4034871/pexels-photo-4034871.jpeg?auto=compress&cs=tinysrgb&w=800",
    altText: "Close up of a mountain gorilla in green jungle",
    category: "Trekking",
    location: "Uganda",
    title: "Bwindi Forest Trek",
    price: "Ksh 320,000",
    date: "Oct 2023",
    slots: "Completed",
    status: "completed",
    duration: "4 Days",
    difficulty: "Strenuous",
    groupSize: "6 People",
    overview: "Deep jungle trek.",
    included: ["Trek permit", "Accommodation"],
    excluded: ["Flights"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Arrival in Entebbe." }
    ]
  },
  {
    id: "mokoro-delta-2023",
    image: "https://images.pexels.com/photos/1670984/pexels-photo-1670984.jpeg?auto=compress&cs=tinysrgb&w=800",
    altText: "Canoe moving through quiet waters",
    category: "Safari",
    location: "Botswana",
    title: "Mokoro Delta Discovery",
    price: "Ksh 295,000",
    date: "Dec 2023",
    slots: "Completed",
    status: "completed",
    duration: "5 Days",
    difficulty: "Easy",
    groupSize: "8 People",
    overview: "Classic delta experience.",
    included: ["Canoe hire", "Guide"],
    excluded: ["Flights"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Arrival in Maun." }
    ]
  },
  {
    id: "skeleton-coast-2024",
    image: "https://images.pexels.com/photos/609749/pexels-photo-609749.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/609749/pexels-photo-609749.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    altText: "Red sand dunes of the Namib desert",
    category: "Photography",
    location: "Namibia",
    title: "Skeleton Coast & Dunes",
    price: "$5,100",
    date: "Jan 2024",
    slots: "Completed",
    status: "completed",
    duration: "7 Days",
    difficulty: "Moderate",
    groupSize: "6 People",
    overview: "A photography-focused expedition through the world's oldest desert landscapes.",
    included: ["Desert vehicles", "Accommodation"],
    excluded: ["Flights"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Arrival in Windhoek." }
    ]
  }
];

export async function getFutureAdventures(): Promise<Adventure[]> {
  return MOCK_ADVENTURES.filter(a => a.status === "upcoming");
}

export async function getPastAdventures(): Promise<Adventure[]> {
  return MOCK_ADVENTURES.filter(a => a.status === "completed");
}

export async function getAdventureById(id: string): Promise<Adventure | undefined> {
  return MOCK_ADVENTURES.find(a => a.id === id);
}
