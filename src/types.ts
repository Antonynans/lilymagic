export interface Project {
  id: number;
  index: string;
  tag: string;
  date?: string;
  image: string;
  title: string;
  description: string;
  gradient: string;
  span?: 'tall';
  gallery?: string[];
}

export interface NavLink {
  label: string;
  href: string;
}