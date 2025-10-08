import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface RequestInfoDialogProps {
  hostelName: string;
}

const RequestInfoDialog = ({ hostelName }: RequestInfoDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate info request submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Information Request Sent!",
      description: "We'll get back to you with details shortly.",
    });

    setOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
    setLoading(false);
  };

  console.log("RequestInfoDialog rendered, open state:", open);

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      console.log("Dialog open state changing to:", newOpen);
      setOpen(newOpen);
    }}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full" 
          size="lg"
          onClick={() => console.log("Request Info button clicked")}
        >
          Request Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Information</DialogTitle>
          <DialogDescription>
            Get more details about {hostelName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 1234567890"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Questions or Special Requests</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us what you'd like to know..."
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestInfoDialog;
