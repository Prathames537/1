import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyWelli from "@/components/WhyWelli";
import FamilyHealthSection from "@/components/FamilyHealthSection";
import CitiesSection from "@/components/CitiesSection";
import Footer from "@/components/Footer";
import { EmergencyServices } from "@/features/emergency/EmergencyServices";
import { EnhancedReminderSystem } from "@/features/reminders/EnhancedReminderSystem";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <EmergencyServices />
        <EnhancedReminderSystem />
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
