import { business } from "./business";

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  location: string;
  date: string;
  avatar?: string;
  service?: string;
  verified?: boolean;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    text: "Absolutely fantastic service! The team was punctual, thorough, and very professional. My house looks spotless. Highly recommend Classic Cleaning to anyone in Pune.",
    location: "Kothrud",
    date: "2 weeks ago",
    service: "Deep Cleaning",
    verified: true,
  },
  {
    id: "2",
    name: "Rahul Deshmukh",
    rating: 5,
    text: "Best cleaning service in Pune! They did an amazing job with my 2 BHK deep cleaning. The attention to detail is exceptional. Will definitely book again.",
    location: "Baner",
    date: "1 month ago",
    service: "2 BHK Deep Cleaning",
    verified: true,
  },
  {
    id: "3",
    name: "Sneha Patil",
    rating: 5,
    text: "The sofa cleaning was incredible. My white sofa looks brand new again! The team used safe chemicals and was very careful with the fabric.",
    location: "Aundh",
    date: "3 weeks ago",
    service: "Sofa Cleaning",
    verified: true,
  },
  {
    id: "4",
    name: "Amit Joshi",
    rating: 4,
    text: "Great service for office cleaning. Our workspace has never been cleaner. The team came after office hours so it didn't disturb our work. Very professional.",
    location: "Hinjewadi",
    date: "1 week ago",
    service: "Office Cleaning",
    verified: true,
  },
  {
    id: "5",
    name: "Meera Kulkarni",
    rating: 5,
    text: "I booked Classic Cleaning for my move-out cleaning and they exceeded all expectations. The landlord was impressed and returned the full deposit!",
    location: "Warje",
    date: "2 months ago",
    service: "Move-Out Cleaning",
    verified: true,
  },
  {
    id: "6",
    name: "Vikram Singh",
    rating: 5,
    text: "The kitchen cleaning was phenomenal. The chimney and appliances look brand new. Very thorough work and the pricing is very reasonable.",
    location: "Karve Nagar",
    date: "3 weeks ago",
    service: "Kitchen Cleaning",
    verified: true,
  },
  {
    id: "7",
    name: "Ananya Reddy",
    rating: 5,
    text: "I've been using Classic Cleaning for 6 months now for regular home cleaning. They're always on time, consistent, and do a great job every single time.",
    location: "Wakad",
    date: "1 month ago",
    service: "Home Cleaning",
    verified: true,
  },
  {
    id: "8",
    name: "Suresh Patel",
    rating: 5,
    text: "Booked same-day service and they arrived within 2 hours! Emergency cleaning was handled very professionally. Thank you Classic Cleaning team!",
    location: "Pashan",
    date: "2 weeks ago",
    service: "Emergency Cleaning",
    verified: true,
  },
];

export const reviewStats = {
  average: business.rating,
  total: business.reviewCount,
  distribution: {
    5: 85,
    4: 10,
    3: 3,
    2: 1,
    1: 1,
  },
};
