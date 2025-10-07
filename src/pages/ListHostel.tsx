import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const roomTypeSchema = z.object({
  type: z.string().min(1, "Room type is required").max(50),
  price: z.number().min(0).max(100000),
  beds: z.number().min(1).max(100),
});

const hostelSchema = z.object({
  name: z.string().trim().min(1, "Hostel name is required").max(100),
  ownerName: z.string().trim().min(1, "Owner name is required").max(100),
  contact: z.string().trim().min(10, "Valid contact number is required").max(15),
  email: z.string().trim().email("Valid email is required").max(255),
  address: z.string().trim().min(10, "Complete address is required").max(500),
  gender: z.enum(["male", "female", "co-ed"], { required_error: "Please select gender" }),
  roomTypes: z.array(roomTypeSchema).min(1, "At least one room type is required"),
  amenities: z.string().trim().max(1000),
  additionalInfo: z.string().trim().max(1000),
});

const ListHostel = () => {
  const { toast } = useToast();
  const [roomTypes, setRoomTypes] = useState([
    { type: "Single Room", price: 0, beds: 0 }
  ]);
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    contact: "",
    email: "",
    address: "",
    gender: "",
    amenities: "",
    additionalInfo: "",
  });

  const addRoomType = () => {
    setRoomTypes([...roomTypes, { type: "", price: 0, beds: 0 }]);
  };

  const removeRoomType = (index: number) => {
    if (roomTypes.length > 1) {
      setRoomTypes(roomTypes.filter((_, i) => i !== index));
    }
  };

  const updateRoomType = (index: number, field: string, value: string | number) => {
    const updated = [...roomTypes];
    updated[index] = { ...updated[index], [field]: value };
    setRoomTypes(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = hostelSchema.parse({
        ...formData,
        roomTypes: roomTypes.map(rt => ({
          type: rt.type,
          price: Number(rt.price),
          beds: Number(rt.beds),
        })),
      });

      console.log("Form submitted:", validatedData);
      
      toast({
        title: "Application Submitted!",
        description: "Our team will review your application and get back to you within 48 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        ownerName: "",
        contact: "",
        email: "",
        address: "",
        gender: "",
        amenities: "",
        additionalInfo: "",
      });
      setRoomTypes([{ type: "Single Room", price: 0, beds: 0 }]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            List Your Hostel
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Reach thousands of students looking for accommodation
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Wide Reach</h3>
              <p className="text-sm text-muted-foreground">
                Get your hostel in front of thousands of students actively searching
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold">Easy Management</h3>
              <p className="text-sm text-muted-foreground">
                Update availability, pricing, and photos anytime from your dashboard
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Verified Badge</h3>
              <p className="text-sm text-muted-foreground">
                Build trust with students through our verification process
              </p>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Hostel Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Hostel Name *</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Sunrise Student Residency"
                  maxLength={100}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Owner Name *</label>
                  <Input 
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    placeholder="Your full name"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Contact Number *</label>
                  <Input 
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    maxLength={15}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email *</label>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                  maxLength={255}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Complete Address *</label>
                <Textarea 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Full address with pincode" 
                  className="min-h-[80px]"
                  maxLength={500}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Gender *</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 outline-none transition-colors"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="co-ed">Co-ed</option>
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Room Types & Pricing *</label>
                  <Button type="button" onClick={addRoomType} variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Room Type
                  </Button>
                </div>
                
                {roomTypes.map((room, index) => (
                  <Card key={index} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Room Type {index + 1}</span>
                      {roomTypes.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeRoomType(index)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Room Type</label>
                        <Input
                          value={room.type}
                          onChange={(e) => updateRoomType(index, "type", e.target.value)}
                          placeholder="e.g., Single AC"
                          maxLength={50}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Price (₹/month)</label>
                        <Input
                          type="number"
                          value={room.price || ""}
                          onChange={(e) => updateRoomType(index, "price", e.target.value)}
                          placeholder="7000"
                          min="0"
                          max="100000"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Available Beds</label>
                        <Input
                          type="number"
                          value={room.beds || ""}
                          onChange={(e) => updateRoomType(index, "beds", e.target.value)}
                          placeholder="10"
                          min="1"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                <p className="text-xs text-muted-foreground">
                  Add different room types with their respective prices (e.g., Single AC, Double Sharing, Triple Non-AC)
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Amenities & Facilities</label>
                <Textarea 
                  value={formData.amenities}
                  onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                  placeholder="List all amenities (WiFi, food, laundry, AC, etc.)" 
                  className="min-h-[100px]"
                  maxLength={1000}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Additional Information</label>
                <Textarea 
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                  placeholder="Any other details you'd like to share about your hostel" 
                  className="min-h-[100px]"
                  maxLength={1000}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">Submit Application</Button>
              <p className="text-xs text-muted-foreground text-center">
                Our team will review your application and get back to you within 48 hours
              </p>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ListHostel;
