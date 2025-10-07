import { TrendingUp } from "lucide-react";
import HostelCard from "./HostelCard";

const FeaturedSection = () => {
  const featuredHostels = [
    {
      id: "1",
      name: "Sunrise Student Residency",
      location: "Near IIT Delhi",
      distance: "0.5 km",
      price: { min: 7500, max: 10000 },
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      gender: "male" as const,
      amenities: ["wifi", "food", "security"],
      available: 5,
    },
    {
      id: "2",
      name: "Green Valley Ladies Hostel",
      location: "Near Delhi University",
      distance: "1.2 km",
      price: { min: 6000, max: 8500 },
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      gender: "female" as const,
      amenities: ["wifi", "food", "security"],
      available: 3,
    },
    {
      id: "3",
      name: "Campus Connect Co-Living",
      location: "Near Jamia Millia",
      distance: "0.8 km",
      price: { min: 8500, max: 12000 },
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      gender: "co-ed" as const,
      amenities: ["wifi", "food", "security"],
      available: 8,
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Trending Hostels</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHostels.map((hostel) => (
            <HostelCard key={hostel.id} {...hostel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
