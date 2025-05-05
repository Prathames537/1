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
        <section className="container mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/documents" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-green-100 border-green-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Document Storage</h3>
                <p className="text-welli-text-medium text-sm">Store and access your medical documents</p>
              </div>
            </Link>
            <Link to="/emergency-help" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-red-100 border-red-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Emergency Help</h3>
                <p className="text-welli-text-medium text-sm">Get instant emergency assistance at your location</p>
              </div>
            </Link>
            <Link to="/blood-bank" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-blue-100 border-blue-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <Droplet className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Blood Bank</h3>
                <p className="text-welli-text-medium text-sm">Find and request blood for all blood groups</p>
              </div>
            </Link>
            <Link to="/organ-repository" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-purple-100 border-purple-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Organ Repository</h3>
                <p className="text-welli-text-medium text-sm">Search and request organs for emergencies</p>
              </div>
            </Link>
            <Link to="/reminders" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-yellow-100 border-yellow-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <Bell className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Reminders & Wellness</h3>
                <p className="text-welli-text-medium text-sm">Set medicine, yoga, and exercise reminders</p>
              </div>
            </Link>
            <Link to="/ai-assistant" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-pink-100 border-pink-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <Bot className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">AI Health Assistant</h3>
                <p className="text-welli-text-medium text-sm">Chat with our AI for health advice and support</p>
              </div>
            </Link>
          </div>
        </section>
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
