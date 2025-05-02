import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import ChatBotButton from "./ChatBot/ChatBotButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-welli-dark-green font-bold text-3xl md:text-4xl">Welli</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#how-it-works" className="text-welli-text-medium hover:text-welli-dark-green transition-colors">
            How It Works
          </a>
          <a href="#why-welli" className="text-welli-text-medium hover:text-welli-dark-green transition-colors">
            Why Welli?
          </a>
          <a href="#family-health" className="text-welli-text-medium hover:text-welli-dark-green transition-colors">
            Family Health
          </a>
          <Link to="/profile" className="text-welli-text-medium hover:text-welli-dark-green transition-colors">
            Profile
          </Link>
          <Link to="/notifications" className="text-welli-text-medium hover:text-welli-dark-green transition-colors">
            Notifications
          </Link>
          <Link to="/feedback" className="text-welli-text-medium hover:text-welli-dark-green transition-colors">
            Feedback
          </Link>
          <Link to="/admin" className="text-welli-text-medium hover:text-welli-dark-green transition-colors">
            Admin
          </Link>
          <div className="flex items-center">
            <ChatBotButton />
          </div>
          <Link to="/login">
            <Button 
              variant="default" 
              className="bg-welli-green hover:bg-welli-dark-green text-white flex items-center gap-2 rounded-full px-6 py-2 font-semibold"
            >
              <User size={18} />
              Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-welli-text-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-6 flex flex-col space-y-4">
          <a 
            href="#how-it-works" 
            className="text-welli-text-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#why-welli" 
            className="text-welli-text-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Why Welli?
          </a>
          <a 
            href="#family-health" 
            className="text-welli-text-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Family Health
          </a>
          <Link 
            to="/profile"
            className="text-welli-text-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Profile
          </Link>
          <Link 
            to="/notifications"
            className="text-welli-text-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Notifications
          </Link>
          <Link 
            to="/feedback"
            className="text-welli-text-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Feedback
          </Link>
          <Link 
            to="/admin"
            className="text-welli-text-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin
          </Link>
          <div className="flex justify-center py-2">
            <ChatBotButton />
          </div>
          <Link 
            to="/login"
            className="w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Button 
              variant="default" 
              className="bg-welli-green hover:bg-welli-dark-green text-white flex items-center gap-2 w-full justify-center rounded-full font-semibold"
            >
              <User size={18} />
              Login
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
