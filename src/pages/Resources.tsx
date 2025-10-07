import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Video, BookOpen, Download } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      title: "Hostel Management Guide",
      description: "Complete guide to managing your hostel efficiently",
      type: "PDF",
      icon: FileText,
    },
    {
      title: "Student Safety Best Practices",
      description: "Essential safety measures every hostel should implement",
      type: "PDF",
      icon: FileText,
    },
    {
      title: "Marketing Your Hostel",
      description: "Tips to attract more students to your hostel",
      type: "Video",
      icon: Video,
    },
    {
      title: "Legal Compliance Checklist",
      description: "Everything you need to know about hostel regulations",
      type: "PDF",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Resources & Guides
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Everything you need to run a successful hostel
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-medium transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-muted rounded">{resource.type}</span>
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <BookOpen className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-3xl font-bold">Need More Help?</h2>
            <p className="text-muted-foreground text-lg">
              Our comprehensive knowledge base and support team are here to help you succeed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/support">
                <Button size="lg">Contact Support</Button>
              </Link>
              <Link to="/faq">
                <Button variant="secondary" size="lg">View FAQs</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
