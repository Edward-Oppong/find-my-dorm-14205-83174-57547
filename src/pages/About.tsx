import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Heart, Users, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About HostelHub
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Connecting students with quality accommodation across India
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              HostelHub was founded in 2024 with a simple mission: make finding student accommodation as easy as booking a hotel. We understand the challenges students face when searching for safe, affordable, and convenient hostels near their campus.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Today, we're proud to connect thousands of students with verified hostels across multiple cities, making the transition to campus life smooth and stress-free.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Student First</h3>
              <p className="text-sm text-muted-foreground">
                Every decision we make prioritizes student safety and satisfaction
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                All hostels are verified and meet our strict quality standards
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Community</h3>
              <p className="text-sm text-muted-foreground">
                Building connections between students, hostels, and universities
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Constantly improving to make hostel discovery seamless
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
