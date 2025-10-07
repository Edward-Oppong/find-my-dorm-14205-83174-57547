import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Shield, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedSection />

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose HostelHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make finding and managing student accommodation simple, secure, and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Prime Locations</h3>
              <p className="text-sm text-muted-foreground">
                Hostels near all major universities and colleges
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold">Verified & Safe</h3>
              <p className="text-sm text-muted-foreground">
                All hostels are verified with proper security measures
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Instant Booking</h3>
              <p className="text-sm text-muted-foreground">
                Book your hostel room in minutes with real-time availability
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Community</h3>
              <p className="text-sm text-muted-foreground">
                Connect with fellow students and build lasting friendships
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Find Your Perfect Hostel?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their ideal accommodation through HostelHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/hostels')} size="lg" variant="secondary" className="h-12 px-8">
              Explore Hostels
            </Button>
            <Button onClick={() => navigate('/list-hostel')} size="lg" variant="outline" className="h-12 px-8 bg-white/10 text-primary-foreground border-primary-foreground/20 hover:bg-white/20">
              List Your Hostel
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
