import type { Project, NavLink } from "./types";

const assetModules = import.meta.glob<{ default: string }>("./assets/**/*", {
  eager: true,
});

function asset(path: string) {
  const resolved = assetModules[`./assets/${path}`]?.default;

  if (!resolved) {
    throw new Error(`Missing asset: ${path}`);
  }

  return resolved;
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: 1,
    index: "01",
    tag: "Bridal Makeup",
    date: "2024",
    image: asset("bridal-makeup/IMG_2436.JPG"),
    title: "Bridal Elegance",
    description:
      "Soft glam bridal looks crafted for timeless wedding moments, focusing on radiant skin and subtle definition.",
    gradient: "linear-gradient(160deg, #c9bfb3 0%, #a8998a 50%, #8c7d70 100%)",
    span: "tall",
    gallery: [
      asset("bridal-makeup/IMG_2436.JPG"),
      asset("bridal-makeup/IMG_2438.JPG"),
      asset("bridal-makeup/IMG_2437.JPG"),
      asset("bridal-makeup/IMG_2439.JPG"),
      asset("bridal-makeup/IMG_2440.JPG"),
    ],
  },
  {
    id: 2,
    index: "02",
    tag: "Soft Glam",
    date: "2024",
    image: asset("soft-glam/IMG_2406.JPG"),
    title: "Soft Glow",
    description:
      "Everyday soft glam makeup with a focus on natural tones, glowing skin, and effortless beauty.",
    gradient: "linear-gradient(135deg, #d6cfc4 0%, #b8ad9e 60%, #9e917f 100%)",
    gallery: [
      asset("soft-glam/IMG_2406.JPG"),
      asset("soft-glam/IMG_2407.JPG"),
      asset("soft-glam/IMG_2412.JPG"),
      asset("soft-glam/IMG_2413.JPG"),
      asset("soft-glam/IMG_2427.JPG"),
    ],
  },
  {
    id: 3,
    index: "03",
    tag: "Full Glam",
    date: "2024",
    image: asset("full-glam/IMG_2396.JPG"),
    title: "Bold Glam",
    description:
      "High-impact glam looks featuring bold eyes, contouring, and statement finishes for events.",
    gradient: "linear-gradient(120deg, #bdb4a8 0%, #a09386 55%, #877568 100%)",
    gallery: [
      asset("full-glam/IMG_2396.JPG"),
      asset("full-glam/IMG_2397.JPG"),
      asset("full-glam/IMG_2405.JPG"),
      asset("full-glam/IMG_2441.JPG"),
      asset("full-glam/IMG_2442.JPG"),
    ],
  },
  {
    id: 4,
    index: "04",
    tag: "Editorial Makeup",
    date: "2023",
    image: asset("editorial-makeup/IMG_2405.JPG"),
    title: "Editorial Edge",
    description:
      "Creative editorial makeup exploring textures, colors, and unconventional beauty expressions.",
    gradient: "linear-gradient(150deg, #cac2b6 0%, #b0a494 50%, #968676 100%)",
    gallery: [
      asset("editorial-makeup/IMG_2405.JPG"),
      asset("editorial-makeup/IMG_2398.JPG"),
      asset("editorial-makeup/IMG_2404.JPG"),
      asset("editorial-makeup/IMG_2396.JPG"),
      asset("editorial-makeup/IMG_2425.JPG"),
    ],
  },
  {
    id: 5,
    index: "05",
    tag: "Skincare",
    date: "2024",
    image: asset("skincare/IMG_2408.JPG"),
    title: "Skin First",
    description:
      "Skincare-focused beauty emphasizing healthy, glowing, and hydrated skin routines.",
    gradient: "linear-gradient(150deg, #cac2b6 0%, #b0a494 50%, #968676 100%)",
    gallery: [
      asset("skincare/IMG_2408.JPG"),
      asset("skincare/IMG_2409.JPG"),
      asset("skincare/IMG_2410.JPG"),
      asset("skincare/IMG_2411.JPG"),
      asset("skincare/IMG_2414.JPG"),
    ],
  },
  {
    id: 6,
    index: "06",
    tag: "Makeup Artistry",
    date: "2023",
    image: asset("makeup-artistry/IMG_2404.JPG"),
    title: "Art in Beauty",
    description:
      "Precision makeup artistry highlighting technique, blending, and flawless finishes.",
    gradient: "linear-gradient(150deg, #cfc6ba 0%, #b5a899 50%, #998a79 100%)",
    gallery: [
      asset("makeup-artistry/IMG_2404.JPG"),
      asset("makeup-artistry/IMG_2416.JPG"),
      asset("makeup-artistry/IMG_2429.JPG"),
      asset("makeup-artistry/IMG_2443.JPG"),
      asset("makeup-artistry/IMG_2444.JPG"),
    ],
  },
  {
    id: 7,
    index: "07",
    tag: "Luxe Beauty",
    date: "2024",
    image: asset("luxe-beauty/IMG_2414.JPG"),
    title: "Luxury Finish",
    description:
      "Premium beauty looks inspired by luxury brands, delivering polished and refined aesthetics.",
    gradient: "linear-gradient(140deg, #d4c9bb 0%, #b9ab9a 60%, #9e8d7b 100%)",
    gallery: [
      asset("luxe-beauty/IMG_2414.JPG"),
      asset("luxe-beauty/IMG_2415.JPG"),
      asset("luxe-beauty/IMG_2421.JPG"),
      asset("luxe-beauty/IMG_2422.JPG"),
      asset("luxe-beauty/IMG_2424.JPG"),
    ],
  },
  {
    id: 8,
    index: "08",
    tag: "Natural Beauty",
    date: "2023",
    image: asset("natural-beauty/IMG_2431.JPG"),
    title: "Bare Beauty",
    description:
      "Minimal makeup looks that enhance natural features with light coverage and soft tones.",
    gradient: "linear-gradient(130deg, #d8cec0 0%, #bfb1a0 60%, #a49381 100%)",
    gallery: [
      asset("natural-beauty/IMG_2431.JPG"),
      asset("natural-beauty/IMG_2432.JPG"),
      asset("natural-beauty/IMG_2433.JPG"),
      asset("natural-beauty/IMG_2434.JPG"),
      asset("natural-beauty/IMG_2435.JPG"),
    ],
  },
  {
    id: 9,
    index: "09",
    tag: "Runway Makeup",
    date: "2024",
    image: asset("runway-makeup/IMG_2423.JPG"),
    title: "Runway Ready",
    description:
      "Fashion-forward runway makeup looks designed for high-impact visual storytelling.",
    gradient: "linear-gradient(140deg, #cec3b6 0%, #b2a393 60%, #978674 100%)",
    gallery: [
      asset("runway-makeup/IMG_2423.JPG"),
      asset("runway-makeup/IMG_2426.JPG"),
      asset("runway-makeup/IMG_2428.JPG"),
      asset("runway-makeup/IMG_2430.JPG"),
    ],
  },
  {
    id: 10,
    index: "10",
    tag: "Beauty Campaign",
    date: "2024",
    image: asset("beauty-campaign/IMG_2399.JPG"),
    title: "Glow Campaign",
    description:
      "Beauty campaign visuals focused on radiant skin, product storytelling, and brand identity.",
    gradient: "linear-gradient(150deg, #d0c6b8 0%, #b6a898 50%, #9b8a78 100%)",
    gallery: [
      asset("beauty-campaign/IMG_2399.JPG"),
      asset("beauty-campaign/IMG_2400.JPG"),
      asset("beauty-campaign/IMG_2401.JPG"),
      asset("beauty-campaign/IMG_2402.JPG"),
      asset("beauty-campaign/IMG_2403.JPG"),
    ],
  },
  {
    id: 11,
    index: "11",
    tag: "Lip Art",
    date: "2024",
    image: asset("lip-art/IMG_2416.JPG"),
    title: "Statement Lips",
    description:
      "Creative lip artistry featuring bold colors, gloss finishes, and detailed precision work.",
    gradient: "linear-gradient(140deg, #d8b4a0 0%, #c08f7a 60%, #9e6f5c 100%)",
    gallery: [
      asset("lip-art/IMG_2416.JPG"),
      asset("lip-art/IMG_2417.JPG"),
      asset("lip-art/IMG_2418.JPG"),
      asset("lip-art/IMG_2419.JPG"),
      asset("lip-art/IMG_2420.JPG"),
    ],
  },
];

export const marqueeItems = [
  { text: "Bridal", italic: false },
  { text: "Soft Glam", italic: true },
  { text: "Events", italic: false },
  { text: "Photography", italic: true },
  { text: "Natural Beauty", italic: false },
  { text: "Fashion", italic: true },
  { text: "Skincare", italic: true },
  { text: "Artistry", italic: true },
];
