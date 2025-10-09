import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Clock, Mail, Phone, MapPin, Trash2 } from "lucide-react";

interface HostelApplication {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number | null;
  image_url: string | null;
  description: string | null;
  amenities: string[] | null;
  contact_email: string;
  contact_phone: string | null;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
}

interface Hostel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number | null;
  image_url: string | null;
  description: string | null;
  amenities: string[] | null;
  created_at: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<HostelApplication[]>([]);
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected" | "hostels">("pending");

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;

      if (!roles) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchApplications();
      fetchHostels();
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("hostel_applications")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setApplications((data as HostelApplication[]) || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchHostels = async () => {
    try {
      const { data, error } = await supabase
        .from("hostels")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setHostels((data as Hostel[]) || []);
    } catch (error) {
      console.error("Error fetching hostels:", error);
      toast({
        title: "Error",
        description: "Failed to load hostels",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (application: HostelApplication) => {
    try {
      // Update application status
      const { error: updateError } = await supabase
        .from("hostel_applications")
        .update({ 
          status: "approved",
          reviewed_at: new Date().toISOString()
        })
        .eq("id", application.id);

      if (updateError) throw updateError;

      // Insert into hostels table
      const { error: insertError } = await supabase
        .from("hostels")
        .insert({
          application_id: application.id,
          name: application.name,
          location: application.location,
          price: application.price,
          rating: application.rating,
          image_url: application.image_url,
          description: application.description,
          amenities: application.amenities,
        });

      if (insertError) throw insertError;

      // Send notification email
      await supabase.functions.invoke("send-hostel-notification", {
        body: {
          email: application.contact_email,
          hostelName: application.name,
          status: "approved",
        },
      });

      toast({
        title: "Application Approved",
        description: "Hostel has been added to the listings and owner notified.",
      });

      fetchApplications();
    } catch (error) {
      console.error("Error approving application:", error);
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (application: HostelApplication) => {
    try {
      const { error } = await supabase
        .from("hostel_applications")
        .update({ 
          status: "rejected",
          reviewed_at: new Date().toISOString()
        })
        .eq("id", application.id);

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke("send-hostel-notification", {
        body: {
          email: application.contact_email,
          hostelName: application.name,
          status: "rejected",
        },
      });

      toast({
        title: "Application Rejected",
        description: "Owner has been notified.",
      });

      fetchApplications();
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive",
      });
    }
  };

  const handleDeleteHostel = async (hostelId: string, hostelName: string) => {
    if (!confirm(`Are you sure you want to delete "${hostelName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("hostels")
        .delete()
        .eq("id", hostelId);

      if (error) throw error;

      toast({
        title: "Hostel Deleted",
        description: "The hostel has been removed from listings.",
      });

      fetchHostels();
    } catch (error) {
      console.error("Error deleting hostel:", error);
      toast({
        title: "Error",
        description: "Failed to delete hostel",
        variant: "destructive",
      });
    }
  };

  const filteredApplications = applications.filter((app) => 
    filter === "all" ? true : app.status === filter
  );

  const showHostels = filter === "hostels";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "approved":
        return <Badge className="gap-1 bg-green-500"><Check className="h-3 w-3" />Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="gap-1"><X className="h-3 w-3" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Manage hostel applications and listings
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8 flex-wrap">
            <Button 
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Applications ({applications.length})
            </Button>
            <Button 
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
            >
              Pending ({applications.filter(a => a.status === "pending").length})
            </Button>
            <Button 
              variant={filter === "approved" ? "default" : "outline"}
              onClick={() => setFilter("approved")}
            >
              Approved ({applications.filter(a => a.status === "approved").length})
            </Button>
            <Button 
              variant={filter === "rejected" ? "default" : "outline"}
              onClick={() => setFilter("rejected")}
            >
              Rejected ({applications.filter(a => a.status === "rejected").length})
            </Button>
            <Button 
              variant={filter === "hostels" ? "default" : "outline"}
              onClick={() => setFilter("hostels")}
            >
              Listed Hostels ({hostels.length})
            </Button>
          </div>

          {/* Applications/Hostels List */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : showHostels ? (
            hostels.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No listed hostels found
              </div>
            ) : (
              <div className="grid gap-6">
                {hostels.map((hostel) => (
                  <Card key={hostel.id} className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      <div className="lg:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        {hostel.image_url ? (
                          <img 
                            src={hostel.image_url} 
                            alt={hostel.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-bold">{hostel.name}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{hostel.location}</span>
                            </div>
                          </div>
                          <Badge className="gap-1 bg-green-500">
                            <Check className="h-3 w-3" />Listed
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="font-semibold">₹{hostel.price}/month</p>
                          </div>
                          {hostel.rating && (
                            <div>
                              <p className="text-sm text-muted-foreground">Rating</p>
                              <p className="font-semibold">{hostel.rating}/5</p>
                            </div>
                          )}
                        </div>

                        {hostel.description && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Description</p>
                            <p className="text-sm">{hostel.description}</p>
                          </div>
                        )}

                        {hostel.amenities && hostel.amenities.length > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                            <div className="flex flex-wrap gap-2">
                              {hostel.amenities.map((amenity, idx) => (
                                <Badge key={idx} variant="secondary">{amenity}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Delete Action */}
                        <div className="pt-2">
                          <Button 
                            variant="destructive"
                            onClick={() => handleDeleteHostel(hostel.id, hostel.name)}
                            className="gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove from Listings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No applications found
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredApplications.map((application) => (
                <Card key={application.id} className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="lg:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      {application.image_url ? (
                        <img 
                          src={application.image_url} 
                          alt={application.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold">{application.name}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            <span>{application.location}</span>
                          </div>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="font-semibold">₹{application.price}/month</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Submitted</p>
                          <p className="font-semibold">
                            {new Date(application.submitted_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {application.description && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Description</p>
                          <p className="text-sm">{application.description}</p>
                        </div>
                      )}

                      {application.amenities && application.amenities.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                          <div className="flex flex-wrap gap-2">
                            {application.amenities.map((amenity, idx) => (
                              <Badge key={idx} variant="secondary">{amenity}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{application.contact_email}</span>
                        </div>
                        {application.contact_phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{application.contact_phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {application.status === "pending" && (
                        <div className="flex gap-3 pt-2">
                          <Button 
                            onClick={() => handleApprove(application)}
                            className="gap-2"
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={() => handleReject(application)}
                            className="gap-2"
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
