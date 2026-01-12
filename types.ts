
export enum PropertyStatus {
  READY = 'Ready-to-Move',
  UNDER_CONSTRUCTION = 'Under-Construction',
}

export interface LocalityInsight {
  type: 'Metro' | 'School' | 'Hospital' | 'Mall';
  name: string;
  distance: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number; // in Lakhs
  bhk: number;
  area: number; // in sqft
  status: PropertyStatus;
  images: string[];
  description: string;
  amenities: string[];
  insights: LocalityInsight[];
  isFeatured?: boolean;
  virtualTourUrl?: string;
  droneVideoUrl?: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
