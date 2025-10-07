import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Utensils, Shield, Phone, Mail } from "lucide-react";
import { useParams } from "react-router-dom";

const HostelDetail = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const hostel = {
    name: "Sunrise Student Residency",
    location: "Near IIT Delhi",
    distance: "0.5 km from campus",
    roomTypes: [
      { type: "Single AC", price: 10000, available: 2 },
      { type: "Double Sharing AC", price: 8500, available: 4 },
      { type: "Triple Sharing Non-AC", price: 7500, available: 6 },
    ],
    rating: 4.8,
    reviews: 124,
    gender: "male",
    totalAvailable: 12,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=600&fit=crop",
    ],
    amenities: ["WiFi", "Food Included", "24/7 Security", "Laundry", "AC Rooms", "Study Area"],
    description: "A modern hostel facility with excellent amenities for students. Located close to IIT Delhi campus with easy access to public transport. All rooms are well-ventilated with natural light. We offer multiple room types to suit different budgets and preferences.",
    rules: ["No smoking", "Visitor hours: 9 AM - 8 PM", "Quiet hours after 10 PM"],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Image Gallery */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden">
          <img 
            src={hostel.images[0]} 
            alt="Main" 
            className="w-full h-[400px] object-cover"
          />
          <div className="grid grid-cols-2 gap-2">
            <img 
              src={hostel.images[1]} 
              alt="View 2" 
              className="w-full h-[196px] object-cover"
            />
            <img 
              src={hostel.images[2]} 
              alt="View 3" 
              className="w-full h-[196px] object-cover"
            />
            <div className="col-span-2 bg-muted flex items-center justify-center h-[196px] cursor-pointer hover:bg-muted/80 transition-colors">
              <span className="text-sm font-medium">View all photos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hostel.location}</span>
                    </div>
                    <span>•</span>
                    <span>{hostel.distance}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{hostel.rating}</span>
                  <span className="text-muted-foreground">({hostel.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge>{hostel.gender}</Badge>
                <Badge variant="secondary">{hostel.totalAvailable} beds available</Badge>
              </div>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About this hostel</h2>
              <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Room Types & Pricing</h2>
              <div className="space-y-3">
                {hostel.roomTypes.map((room, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{room.type}</h3>
                      <p className="text-sm text-muted-foreground">{room.available} beds available</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">₹{room.price}</div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Wifi className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Hostel Rules</h2>
              <ul className="space-y-2">
                {hostel.rules.map((rule, i) => (
                  <li key={i} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20 space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Starting from</div>
                <div className="text-3xl font-bold text-primary">
                  ₹{Math.min(...hostel.roomTypes.map(r => r.price))}
                </div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg">Book Now</Button>
                <Button variant="outline" className="w-full" size="lg">Request Info</Button>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>contact@hostel.com</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Quick Facts</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {hostel.totalAvailable} beds available</li>
                  <li>• {hostel.gender.charAt(0).toUpperCase() + hostel.gender.slice(1)} only</li>
                  <li>• Food included in rent</li>
                  <li>• 24/7 security</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HostelDetail;
