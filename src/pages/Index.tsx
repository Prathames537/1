import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyWelli from "@/components/WhyWelli";
import FamilyHealthSection from "@/components/FamilyHealthSection";
import CitiesSection from "@/components/CitiesSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Bot, FileText, AlertTriangle, Droplet, Heart, Bell } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <WhyWelli />
        <FamilyHealthSection />
        <CitiesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
