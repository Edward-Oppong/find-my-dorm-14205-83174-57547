import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import HostelCard from "@/components/HostelCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const Hostels = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [genderFilter, setGenderFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const hostels = [
    {
      id: "1",
      name: "Sunrise Student Residency",
      location: "Near IIT Delhi",
      distance: "0.5 km",
      price: { min: 7500, max: 10000 },
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      gender: "male" as const,
      amenities: ["wifi", "food", "security"],
      available: 5,
    },
    {
      id: "2",
      name: "Green Valley Ladies Hostel",
      location: "Near Delhi University",
      distance: "1.2 km",
      price: { min: 6000, max: 8500 },
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      gender: "female" as const,
      amenities: ["wifi", "food", "security"],
      available: 3,
    },
    {
      id: "3",
      name: "Campus Connect Co-Living",
      location: "Near Jamia Millia",
      distance: "0.8 km",
      price: { min: 8500, max: 12000 },
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      gender: "co-ed" as const,
      amenities: ["wifi", "food", "security"],
      available: 8,
    },
    {
      id: "4",
      name: "Comfort Stay Boys PG",
      location: "Near JNU",
      distance: "1.5 km",
      price: { min: 5500, max: 7500 },
      rating: 4.4,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1502672260066-6bc368c3ec45?w=800&h=600&fit=crop",
      gender: "male" as const,
      amenities: ["wifi", "food", "security"],
      available: 12,
    },
    {
      id: "5",
      name: "Lakeview Ladies Hostel",
      location: "Near Indira Gandhi University",
      distance: "2.0 km",
      price: 7500,
      rating: 4.7,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      gender: "female" as const,
      amenities: ["wifi", "food", "security"],
      available: 6,
    },
    {
      id: "6",
      name: "University Heights",
      location: "Near Amity University",
      distance: "0.3 km",
      price: { min: 9500, max: 14000 },
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=600&fit=crop",
      gender: "co-ed" as const,
      amenities: ["wifi", "food", "security"],
      available: 4,
    },
  ];

  const filteredHostels = useMemo(() => {
    let filtered = [...hostels];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(hostel => 
        hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hostel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Gender filter
    if (genderFilter !== "all") {
      filtered = filtered.filter(hostel => hostel.gender === genderFilter);
    }

    // Price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter(hostel => {
        const maxPrice = typeof hostel.price === "number" ? hostel.price : hostel.price.max;
        if (priceFilter === "budget") return maxPrice < 5000;
        if (priceFilter === "mid") return maxPrice >= 5000 && maxPrice <= 10000;
        if (priceFilter === "premium") return maxPrice > 10000;
        return true;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "distance") {
        return parseFloat(a.distance) - parseFloat(b.distance);
      } else if (sortBy === "price-low") {
        const priceA = typeof a.price === "number" ? a.price : a.price.min;
        const priceB = typeof b.price === "number" ? b.price : b.price.min;
        return priceA - priceB;
      } else if (sortBy === "price-high") {
        const priceA = typeof a.price === "number" ? a.price : a.price.max;
        const priceB = typeof b.price === "number" ? b.price : b.price.max;
        return priceB - priceA;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

    return filtered;
  }, [hostels, searchQuery, genderFilter, priceFilter, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredHostels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHostels = filteredHostels.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={(value) => {
          setSearchQuery(value);
          handleFilterChange();
        }}
        genderFilter={genderFilter}
        setGenderFilter={(value) => {
          setGenderFilter(value);
          handleFilterChange();
        }}
        priceFilter={priceFilter}
        setPriceFilter={(value) => {
          setPriceFilter(value);
          handleFilterChange();
        }}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Available Hostels</h1>
          <p className="text-muted-foreground">
            {filteredHostels.length} hostels found
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedHostels.length > 0 ? (
            paginatedHostels.map((hostel) => (
              <HostelCard key={hostel.id} {...hostel} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No hostels found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button 
              variant="outline" 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageClick(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
        </div>

      <Footer />
    </div>
  );
};

export default Hostels;
