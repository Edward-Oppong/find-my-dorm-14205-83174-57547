import { Building2, Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">HostelHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Explore
            </Link>
            <Link to="/hostels" className="text-sm font-medium hover:text-primary transition-colors">
              Hostels
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/list-hostel">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                List Your Hostel
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Explore
              </Link>
              <Link to="/hostels" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Hostels
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors py-2">
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Contact
              </Link>
              <Link to="/list-hostel">
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  List Your Hostel
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
