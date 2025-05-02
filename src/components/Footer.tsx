
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div>
          <div className="mb-6">
            <span className="text-welli-dark-green font-bold text-2xl">Welli</span>
          </div>
          <p className="text-welli-text-medium mb-6">
            India's first comprehensive doorstep healthcare service for families.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="bg-welli-pale-green p-2 rounded-full text-welli-dark-green hover:bg-welli-light-green transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="bg-welli-pale-green p-2 rounded-full text-welli-dark-green hover:bg-welli-light-green transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="bg-welli-pale-green p-2 rounded-full text-welli-dark-green hover:bg-welli-light-green transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="bg-welli-pale-green p-2 rounded-full text-welli-dark-green hover:bg-welli-light-green transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
