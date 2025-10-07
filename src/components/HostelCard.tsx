import { MapPin, Star, Users, Wifi, Utensils, Shield } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface HostelCardProps {
  id: string;
  name: string;
  location: string;
  distance: string;
  price: number | { min: number; max: number };
  rating: number;
  reviews: number;
  image: string;
  gender: "male" | "female" | "co-ed";
  amenities: string[];
  available: number;
}

const HostelCard = ({
  id,
  name,
  location,
  distance,
  price,
  rating,
  reviews,
  image,
  gender,
  amenities,
  available,
}: HostelCardProps) => {
  const navigate = useNavigate();
  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    food: Utensils,
    security: Shield,
  };

  return (
    <Card onClick={() => navigate(`/hostel/${id}`)} className="overflow-hidden hover:shadow-medium transition-all duration-300 cursor-pointer group bg-gradient-card">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-card text-card-foreground">
          {available} beds available
        </Badge>
        <Badge
          className="absolute top-3 left-3"
          variant={gender === "co-ed" ? "secondary" : "default"}
        >
          {gender}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-sm">{rating}</span>
              <span className="text-muted-foreground text-xs">({reviews})</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
            <span className="mx-1">•</span>
            <span>{distance} from campus</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3 py-2">
          {amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity] || Users;
            return (
              <div
                key={amenity}
                className="flex items-center gap-1 text-xs text-muted-foreground"
              >
                <Icon className="h-4 w-4" />
                <span className="capitalize">{amenity}</span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <div className="text-2xl font-bold text-primary">
              {typeof price === 'number' 
                ? `₹${price}` 
                : `₹${price.min} - ₹${price.max}`
              }
            </div>
            <div className="text-xs text-muted-foreground">per month</div>
          </div>
          <Button onClick={(e) => { e.stopPropagation(); navigate(`/hostel/${id}`); }} size="sm" variant="default">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HostelCard;
