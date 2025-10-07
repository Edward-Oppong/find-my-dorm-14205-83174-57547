import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "",
      description: "Perfect for small hostels starting out",
      features: [
        "List up to 1 hostel",
        "Basic profile page",
        "Student reviews",
        "Email notifications",
        "Community support"
      ]
    },
    {
      name: "Professional",
      price: "₹999",
      period: "/month",
      description: "Ideal for established hostels",
      features: [
        "List up to 3 hostels",
        "Enhanced profile with photos",
        "Priority in search results",
        "Analytics dashboard",
        "Email & phone support",
        "Verified badge"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹2,499",
      period: "/month",
      description: "For hostel chains and premium properties",
      features: [
        "Unlimited hostel listings",
        "Premium profile with virtual tour",
        "Top placement in search",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom branding options",
        "API access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Choose the plan that works best for your hostel
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 space-y-6 relative ${
                  plan.popular ? 'border-primary shadow-medium' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you have specific requirements or manage multiple properties, contact us for a custom enterprise solution
          </p>
          <Button size="lg">Contact Sales</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
