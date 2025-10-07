import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-hostel.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    navigate(`/hostels?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Find Your Perfect Hostel Near Campus
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Discover, compare, and book student hostels across your region with ease
            </p>

            {/* Search Bar */}
            <div className="bg-card rounded-2xl p-2 shadow-medium">
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, university, or hostel name..."
                    className="pl-12 h-14 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90">
                  Search Hostels
                </Button>
              </form>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4 text-primary-foreground">
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm opacity-90">Hostels Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm opacity-90">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm opacity-90">Universities</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-medium">
              <img 
                src={heroImage} 
                alt="Modern student hostel with students studying and socializing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
