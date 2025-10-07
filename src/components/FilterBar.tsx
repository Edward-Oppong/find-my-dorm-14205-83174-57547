import { SlidersHorizontal, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  genderFilter: string;
  setGenderFilter: (filter: string) => void;
  priceFilter: string;
  setPriceFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  genderFilter,
  setGenderFilter,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy,
}: FilterBarProps) => {
  const activeFilters = [
    genderFilter !== "all" && { type: "gender", label: genderFilter },
    priceFilter !== "all" && { type: "price", label: priceFilter },
  ].filter(Boolean);

  const clearAllFilters = () => {
    setGenderFilter("all");
    setPriceFilter("all");
  };

  return (
    <div className="bg-card border-b sticky top-0 z-40 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hostels..."
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="co-ed">Co-ed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Under ₹5,000</SelectItem>
                <SelectItem value="mid">₹5,000 - ₹10,000</SelectItem>
                <SelectItem value="premium">Above ₹10,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter: any) => (
              <Badge 
                key={filter.type} 
                variant="secondary" 
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => {
                  if (filter.type === "gender") setGenderFilter("all");
                  if (filter.type === "price") setPriceFilter("all");
                }}
              >
                {filter.label} ×
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAllFilters}>
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
