export interface Project {
  id: number;
  index: string;
  tag: string;
  date: string;
  title: string;
  description: string;
  gradient: string;
  span?: 'tall';
}

export interface NavLink {
  label: string;
  href: string;
}
