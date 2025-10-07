import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a hostel?",
      answer: "Browse available hostels, select your preferred one, and click 'View Details'. You can then submit a booking request or contact the hostel directly."
    },
    {
      question: "Are all hostels verified?",
      answer: "Yes, all hostels listed on HostelHub are verified by our team. We check safety measures, cleanliness, and amenities before listing."
    },
    {
      question: "What payment methods are accepted?",
      answer: "Most hostels accept online payments, bank transfers, and cash. Specific payment options are mentioned on each hostel's page."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Cancellation policies vary by hostel. Please check the specific hostel's cancellation policy before booking."
    },
    {
      question: "Do hostels provide food?",
      answer: "Many hostels offer meal plans. Look for the 'Food' amenity tag on hostel listings or check the hostel details page."
    },
    {
      question: "How close are hostels to universities?",
      answer: "We display the distance from the nearest university or campus on each hostel card. Most hostels are within 2km of major universities."
    },
    {
      question: "Are visitors allowed?",
      answer: "Visitor policies vary by hostel. Most hostels have designated visiting hours. Check with the hostel management for specific rules."
    },
    {
      question: "How do I list my hostel?",
      answer: "Click on 'List Your Hostel' in the navigation menu and fill out the registration form. Our team will verify your hostel and list it within 48 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Find answers to common questions about HostelHub
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">Can't find the answer you're looking for? Please contact our support team.</p>
          <Link to="/contact">
            <Button size="lg">Contact Support</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
