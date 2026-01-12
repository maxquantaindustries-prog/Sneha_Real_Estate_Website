import { Property, PropertyStatus, Blog, Testimonial } from '../types';

export const AGENT_DATA = {
  name: 'Sneha Rudra',
  role: 'Principal Consultant & Founder',
  firm: 'PropTechdiva',
  photo: '/profile.png',
  
  bio: 'With over 5 years of excellence in high-ticket real estate, I specialize in identifying off-market opportunities and   ury residences that define modern living standards.',
  rera: 'UPRERAPRJ12345',
  experience: '5+ Years',
  deals: '80+ Successful Closures'
};

export const MARKET_INTEL: Blog[] = [
  {
    id: 'mi1',
    title: 'Understanding Stamp Duty & Registration Charges in Delhi NCR (2024–25)',
    excerpt: 'A concise guide to buyer costs across Delhi, Noida, Greater Noida and Gurgaon — including typical stamp duty ranges, registration fees, and practical examples to help estimate upfront transaction costs for residential buyers and investors in 2024–25.',
    category: 'Market Trends',
    date: 'Nov 05, 2024',
    image: '/market_analysis.png'
  },
  {
    id: 'mi2',
    title: 'Top 5 High-Growth Localities for ROI in Noida & Gurgaon',
    excerpt: 'Sector-wise ROI snapshot and rental-yield primer: a data-driven shortlist of neighbourhoods with strong infrastructure catalysts, recent appreciation, and best-in-class tenancy demand for investors evaluating Noida and Gurgaon.',
    category: 'Investment',
    date: 'Nov 01, 2024',
    image: '/invesment.png'
  }
];

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Skyline Penthouse',
    location: 'Sector 44, Noida',
    city: 'Noida',
    price: 450,
    bhk: 4,
    area: 3200,
    status: PropertyStatus.READY,
    images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200', 'https://picsum.photos/id/11/800/600'],
    description: 'Ultra-luxurious sky home with panoramic views of the city skyline.',
    amenities: ['Private Pool', 'Gym', 'Clubhouse', '24/7 Security'],
    isFeatured: true,
    insights: [
      { type: 'Metro', name: 'Sector 44 Station', distance: '500m' },
      { type: 'School', name: 'Step by Step', distance: '2.1km' }
    ]
  },
  {
    id: '2',
    title: 'Emerald Gardenia Estates',
    location: 'Whitefield, Bangalore',
    city: 'Bangalore',
    price: 185,
    bhk: 3,
    area: 1850,
    status: PropertyStatus.UNDER_CONSTRUCTION,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200', 'https://picsum.photos/id/13/800/600'],
    description: 'Eco-friendly sustainable living spaces nestled in the heart of the IT corridor.',
    amenities: ['Yoga Deck', 'Jogging Track', 'EV Charging', 'Smart Home Features'],
    insights: [
      { type: 'Metro', name: 'Kadugodi Metro', distance: '1.2km' },
      { type: 'Hospital', name: 'Manipal Hospital', distance: '3.5km' }
    ]
  },
  {
    id: '3',
    title: 'Urban Oasis Apartments',
    location: 'Worli, Mumbai',
    city: 'Mumbai',
    price: 850,
    bhk: 3,
    area: 2100,
    status: PropertyStatus.READY,
    images: ['/im1.jpeg'], 
    description: 'Luxury ocean-front residency for those who seek the best of coastal living.',
    amenities: ['Sea View', 'Concierge', 'High-speed Elevators', 'Indoor Sports'],
    insights: [
      { type: 'Mall', name: 'Phoenix Palladium', distance: '4.0km' }
    ]
  },
  {
    id: '4',
    title: 'Silicon Valley Heights',
    location: 'Gachibowli, Hyderabad',
    city: 'Hyderabad',
    price: 95,
    bhk: 2,
    area: 1250,
    status: PropertyStatus.UNDER_CONSTRUCTION,
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200', 'https://picsum.photos/id/17/800/600'],
    description: 'Compact luxury for modern professionals. Efficient design with world-class facilities.',
    amenities: ['Coworking Space', 'Rooftop Bar', 'Mini Theater'],
    insights: [
      { type: 'Metro', name: 'Raidurg Station', distance: '2.5km' }
    ]
  }
];

export const BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'Understanding Stamp Duty in Bangalore (2024)',
    excerpt: 'A comprehensive guide on current rates, exemptions, and digital payment methods for homeowners.',
    category: 'Market Trends',
    date: 'Oct 12, 2023',
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea10c4b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'b2',
    title: 'Top 5 Localities for ROI in Noida',
    excerpt: 'Investing in Sector 150 vs Sector 128: Where should your money go for maximum capital appreciation?',
    category: 'Investment',
    date: 'Oct 10, 2023',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ankit Sharma',
    role: 'CEO, TechFlow',
    content: 'The search for our family home was seamless. The virtual tour feature saved us weeks of manual site visits.',
    avatar: 'https://i.pravatar.cc/150?u=ankit'
  },
  {
    id: 't2',
    name: 'Sarah Joseph',
    role: 'Investor',
    content: 'Deep insights into the locality and transparent ROI calculations. Highly professional team.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  }
];
