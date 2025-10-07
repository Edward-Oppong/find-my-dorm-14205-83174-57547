import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { MessageCircle, Mail, Phone, HelpCircle } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Support Center
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            We're here to help you every step of the way
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">
                Chat with our support team in real-time
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all cursor-pointer">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed help via email
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all cursor-pointer">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Phone Support</h3>
              <p className="text-sm text-muted-foreground">
                Call us during business hours
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-medium transition-all cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Help Center</h3>
              <p className="text-sm text-muted-foreground">
                Browse our knowledge base
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Support Hours</h2>
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Email & Chat Support</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                    <li>Saturday: 10:00 AM - 6:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Phone Support</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Monday - Friday: 10:00 AM - 6:00 PM</li>
                    <li>Saturday: 11:00 AM - 4:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  For urgent issues outside business hours, please email us at{" "}
                  <a href="mailto:urgent@hostelhub.com" className="text-primary hover:underline">
                    urgent@hostelhub.com
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
