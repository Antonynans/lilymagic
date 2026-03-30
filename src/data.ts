import type { Project, NavLink } from './types';

export const navLinks: NavLink[] = [
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '#contact' },
];

export const projects: Project[] = [
  {
    id: 1,
    index: '01',
    tag: 'Bridal Makeup',
    date: '2024',
    image: '/bridal-elagance.jpeg',
    title: 'Bridal Elegance',
    description:
      'Soft glam bridal looks crafted for timeless wedding moments, focusing on radiant skin and subtle definition.',
    gradient: 'linear-gradient(160deg, #c9bfb3 0%, #a8998a 50%, #8c7d70 100%)',
    span: 'tall',
    gallery: [
      '/bridal-elagance.jpeg',
      '/bridal-image1.jpeg',
      '/bridal-image2.jpeg',
      '/bridal-image3.jpeg',
      '/bridal-image4.jpeg',
    ],
  },
  {
    id: 2,
    index: '02',
    tag: 'Soft Glam',
    date: '2024',
    image: '/soft-glam.jpeg',
    title: 'Soft Glow',
    description:
      'Everyday soft glam makeup with a focus on natural tones, glowing skin, and effortless beauty.',
    gradient: 'linear-gradient(135deg, #d6cfc4 0%, #b8ad9e 60%, #9e917f 100%)',
    gallery: [
      '/soft-glam.jpeg',
      '/image-4.jpeg',
      '/editorial-makeup.jpeg',
      '/soft-glam1.jpeg',
      '/makeup-artistry.jpeg',
    ],
  },
  {
    id: 3,
    index: '03',
    tag: 'Full Glam',
    date: '2024',
    image: '/image-4.jpeg',
    title: 'Bold Glam',
    description:
      'High-impact glam looks featuring bold eyes, contouring, and statement finishes for events.',
    gradient: 'linear-gradient(120deg, #bdb4a8 0%, #a09386 55%, #877568 100%)',
    gallery: [
      '/image-4.jpeg',
      '/image-4.jpeg',
      '/fullglam1.jpeg',
      '/fullglam2.jpeg',
      '/editorial-makeup.jpeg',
    ],
  },
  {
    id: 4,
    index: '04',
    tag: 'Editorial Makeup',
    date: '2023',
    image: '/editorial-makeup.jpeg',
    title: 'Editorial Edge',
    description:
      'Creative editorial makeup exploring textures, colors, and unconventional beauty expressions.',
    gradient: 'linear-gradient(150deg, #cac2b6 0%, #b0a494 50%, #968676 100%)',
    gallery: [
      '/editorial-makeup.jpeg',
      '/soft-glam1.jpeg',
      '/makeup-artistry.jpeg',
      '/image-5.jpeg',
      '/bare-beauty.jpeg',
    ],
  },
  {
    id: 5,
    index: '05',
    tag: 'Skincare',
    date: '2024',
    image: '/skincare.jpeg',
    title: 'Skin First',
    description:
      'Skincare-focused beauty emphasizing healthy, glowing, and hydrated skin routines.',
    gradient: 'linear-gradient(150deg, #cac2b6 0%, #b0a494 50%, #968676 100%)',
    gallery: [
      '/skincare.jpeg',
      '/skincare1.jpeg',
      '/skincare2.jpeg',
      '/skincare4.jpeg',
      '/skincare3.jpeg',
    ],
  },
  {
    id: 6,
    index: '06',
    tag: 'Makeup Artistry',
    date: '2023',
    image: '/makeup-artistry.jpeg',
    title: 'Art in Beauty',
    description:
      'Precision makeup artistry highlighting technique, blending, and flawless finishes.',
    gradient: 'linear-gradient(150deg, #cfc6ba 0%, #b5a899 50%, #998a79 100%)',
    gallery: [
      '/makeup-artistry.jpeg',
      '/soft-glam.jpeg',
      '/fullglam2.jpeg',
      '/editorial-makeup.jpeg',
      '/image-4.jpeg',
    ],
  },
  {
    id: 7,
    index: '07',
    tag: 'Luxe Beauty',
    date: '2024',
    image: '/luxe-beauty.jpeg',
    title: 'Luxury Finish',
    description:
      'Premium beauty looks inspired by luxury brands, delivering polished and refined aesthetics.',
    gradient: 'linear-gradient(140deg, #d4c9bb 0%, #b9ab9a 60%, #9e8d7b 100%)',
    gallery: [
      '/luxe-beauty.jpeg',
      '/fullglam2.jpeg',
      '/runway-makeup.jpeg',
      '/bare-beauty.jpeg',
      '/image-4.jpeg',
    ],
  },
  {
    id: 8,
    index: '08',
    tag: 'Natural Beauty',
    date: '2023',
    image: '/bare-beauty.jpeg',
    title: 'Bare Beauty',
    description:
      'Minimal makeup looks that enhance natural features with light coverage and soft tones.',
    gradient: 'linear-gradient(130deg, #d8cec0 0%, #bfb1a0 60%, #a49381 100%)',
    gallery: [
      '/bare-beauty.jpeg',
      '/soft-glam.jpeg',
      '/image-4.jpeg',
      '/makeup-artistry.jpeg',
      '/editorial-makeup.jpeg',
    ],
  },
  {
    id: 9,
    index: '09',
    tag: 'Runway Makeup',
    date: '2024',
    image: '/runway-makeup.jpeg',
    title: 'Runway Ready',
    description:
      'Fashion-forward runway makeup looks designed for high-impact visual storytelling.',
    gradient: 'linear-gradient(140deg, #cec3b6 0%, #b2a393 60%, #978674 100%)',
    gallery: [
      '/runway-makeup.jpeg',
      '/fullglam2.jpeg',
      '/image-4.jpeg',
      '/editorial-makeup.jpeg',
      '/makeup-artistry.jpeg',
    ],
  },
  {
    id: 10,
    index: '10',
    tag: 'Beauty Campaign',
    date: '2024',
    image: '/glow-campaign.jpeg',
    title: 'Glow Campaign',
    description:
      'Beauty campaign visuals focused on radiant skin, product storytelling, and brand identity.',
    gradient: 'linear-gradient(150deg, #d0c6b8 0%, #b6a898 50%, #9b8a78 100%)',
    gallery: [
      '/glow-campaign.jpeg',
      '/bare-beauty.jpeg',
      '/soft-glam.jpeg',
      '/fullglam2.jpeg',
      '/makeup-artistry.jpeg',
    ],
  },
  {
  id: 11,
  index: '11',
  tag: 'Lip Art',
  date: '2024',
  image: '/lips.jpeg',
  title: 'Statement Lips',
  description:
    'Creative lip artistry featuring bold colors, gloss finishes, and detailed precision work.',
  gradient: 'linear-gradient(140deg, #d8b4a0 0%, #c08f7a 60%, #9e6f5c 100%)',
  gallery: [
    '/lips.jpeg',
    '/lips4.jpg',
    '/lips1.jpg',
    '/lips2.jpg',
    '/lips1.jpg',
  ],
}
];

export const marqueeItems = [
  { text: 'Bridal', italic: false },
  { text: 'Soft Glam', italic: true },
  { text: 'Events', italic: false },
  { text: 'Photography', italic: true },
  { text: 'Natural Beauty', italic: false },
  { text: 'Fashion', italic: true },
    { text: 'Skincare', italic: true },
  { text: 'Artistry', italic: true },
];