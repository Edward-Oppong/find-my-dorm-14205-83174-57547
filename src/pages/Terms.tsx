import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Last updated: January 2024
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing or using HostelHub, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Use of Service</h2>
            <p className="text-muted-foreground mb-4">
              You may use our service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Use the service in any way that violates applicable laws</li>
              <li>Impersonate or attempt to impersonate HostelHub or another user</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
              <li>Use any automated system to access the service</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Bookings and Payments</h2>
            <p className="text-muted-foreground mb-6">
              All bookings are subject to availability and confirmation. Prices are subject to change. Payment terms and cancellation policies vary by hostel.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">User Content</h2>
            <p className="text-muted-foreground mb-6">
              You retain ownership of any content you submit. By posting content, you grant us a license to use, modify, and display that content in connection with our service.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Disclaimer</h2>
            <p className="text-muted-foreground mb-6">
              The service is provided "as is" without warranties of any kind. We do not guarantee the accuracy of hostel information or availability.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              HostelHub shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@hostelhub.com" className="text-primary hover:underline">
                legal@hostelhub.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
