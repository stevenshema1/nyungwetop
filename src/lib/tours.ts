import primate from "@/assets/tour-primate.jpg";
import canopy from "@/assets/tour-canopy.jpg";
import waterfall from "@/assets/gallery-waterfall.jpg";
import tea from "@/assets/pkg/tea.jpg";
import wellness from "@/assets/pkg/wellness.jpg";
import culture from "@/assets/pkg/culture.jpg"; 
import birds from "@/assets/pkg/birds.jpg";
import night from "@/assets/pkg/night.jpg";

export type Tour = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  difficulty: string;
  price: string;
  image: string;
  includes: string[];
  popular?: boolean;
};

/* Real attractions documented on nyungwehotel.com & visitrwanda.com */
export const tours: Tour[] = [
  {
    slug: "chimpanzee-trek",
    name: "Chimpanzee Trekking — Cyamudongo",
    tagline: "Track habituated chimpanzee families in the isolated Cyamudongo rainforest.",
    description:
      "Set out before dawn with park rangers and a primatologist into the Cyamudongo forest patch — home to one of Nyungwe's two habituated chimpanzee communities. Spend a regulated hour observing their grooming, hunting and social politics from a respectful distance.",
    duration: "Full day · 6–8 hrs",
    difficulty: "Moderate to challenging",
    price: "from $250",
    image: primate,
    includes: ["RDB chimpanzee permit", "Park ranger & primatologist", "Packed forest lunch", "Hotel transfer to trailhead"],
    popular: true,
  },
  {
    slug: "canopy-walkway",
    name: "Canopy Walkway & Igishigishigi Trail",
    tagline: "East Africa's only canopy walkway — 70 metres above the forest floor.",
    description:
      "Hike the Igishigishigi Trail to a 160-metre suspended walkway sitting 70 metres above the rainforest. Pause for the dawn chorus — Great Blue Turaco, Rwenzori Turaco and Paradise Flycatcher — with an ornithologist guide.",
    duration: "Half day · 3–4 hrs",
    difficulty: "Easy to moderate",
    price: "from $90",
    image: canopy,
    includes: ["Park entry & canopy fee", "Ornithologist guide", "Binoculars & field guide", "Refreshments"],
    popular: true,
  },
  {
    slug: "tea-plantation",
    name: "Beautiful Tea Plantation Experience",
    tagline: "An attractive harvest morning across the emerald hills of Gisakura.",
    description:
      "A vivid sunrise walk through the rolling Gisakura tea estate just minutes from the hotel. Pluck the day's leaves with the local cooperatives, follow the green flush to the small factory, and finish with a tasting of single-origin Rwandan tea on the terrace.",
    duration: "Half day · 4 hrs",
    difficulty: "Easy",
    price: "from $65",
    image: tea,
    includes: ["Estate guide", "Tea factory visit", "Single-origin tasting", "Hotel transfer"],
    popular: true,
  },
  {
    slug: "forest-wellness",
    name: "Beautiful Forest Wellness Retreat",
    tagline: "A serene yoga deck above the misty Nyungwe valley at sunrise.",
    description:
      "Begin at first light on a private wooden deck overlooking the rainforest canopy. A 75-minute guided yoga and breathwork session with a Rwandan wellness practitioner, followed by a forest-bathing walk and a herbal infusion of locally grown lemongrass and mint.",
    duration: "Half day · 3 hrs",
    difficulty: "Easy",
    price: "from $75",
    image: wellness,
    includes: ["Certified yoga guide", "Mat & props", "Forest-bathing walk", "Herbal infusion"],
    popular: true,
  },
  {
    slug: "cultural-heritage",
    name: "Attractive Cultural Heritage Evening",
    tagline: "Traditional Intore dancers and storytelling at the edge of the forest.",
    description:
      "An evening of living Rwandan heritage. The Intore — historically the dancers of the royal court — perform with drums and grass headdresses on the hotel lawn. Followed by a shared meal of brochettes, isombe and ibirayi, and stories from local elders.",
    duration: "Evening · 3 hrs",
    difficulty: "Easy",
    price: "from $55",
    image: culture,
    includes: ["Intore dance troupe", "Live drumming", "Traditional dinner", "Storytelling circle"],
  },
  {
    slug: "birdwatching",
    name: "Beautiful Birdwatching Expedition",
    tagline: "Track the Great Blue Turaco through one of Africa's richest bird forests.",
    description:
      "Nyungwe is home to over 310 bird species and 29 Albertine Rift endemics. Spend a guided morning with a specialist ornithologist along the Karamba and Bigugu trails, scoping the iconic Great Blue Turaco, Red-collared Babbler and Rwenzori Nightjar.",
    duration: "Half day · 5 hrs",
    difficulty: "Easy to moderate",
    price: "from $95",
    image: birds,
    includes: ["Specialist bird guide", "Spotting scope & binoculars", "Field checklist", "Packed breakfast"],
    popular: true,
  },
  {
    slug: "night-walk",
    name: "Attractive Night Walk Discovery",
    tagline: "An atmospheric nocturnal tour to find the forest's hidden wildlife.",
    description:
      "Step into Nyungwe after dark with a ranger and red-filter torches. Watch for bushbabies, tree hyrax, chameleons, glowing fungi and a chorus of frogs. One of the few legal night walks in any East African national park.",
    duration: "2 hrs · After dark",
    difficulty: "Easy",
    price: "from $50",
    image: night,
    includes: ["Park ranger", "Red-filter headlamp", "Rain poncho", "Hot drinks on return"],
  },
  {
    slug: "kamiranzovu",
    name: "Kamiranzovu Marsh & Waterfall Hike",
    tagline: "Ancient peat bog, orchids, and a thundering rainforest waterfall.",
    description:
      "A guided hike through the Kamiranzovu Marsh — Rwanda's largest high-altitude wetland — ending at a 17-metre waterfall framed by tree ferns and wild orchids. Look out for L'Hoest's monkey along the way.",
    duration: "Half day · 5 hrs",
    difficulty: "Moderate",
    price: "from $80",
    image: waterfall,
    includes: ["Park entry", "Naturalist guide", "Packed snack", "Hotel transfer"],
  },
];

export const popularTours = tours.filter((t) => t.popular);
