import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Last updated: January 2024
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-6">
              HostelHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Account credentials</li>
              <li>Profile information and preferences</li>
              <li>Booking and payment information</li>
              <li>Communications with us</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process bookings and transactions</li>
              <li>Send you updates and marketing communications</li>
              <li>Respond to your requests and support needs</li>
              <li>Protect against fraud and abuse</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Information Sharing</h2>
            <p className="text-muted-foreground mb-6">
              We do not sell your personal information. We may share your information with hostel owners for booking purposes and with service providers who assist us in operating our platform.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Your Rights</h2>
            <p className="text-muted-foreground mb-6">
              You have the right to access, update, or delete your personal information. You may also opt out of marketing communications at any time.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@hostelhub.com" className="text-primary hover:underline">
                privacy@hostelhub.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
