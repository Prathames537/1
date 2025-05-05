import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyWelli from "@/components/WhyWelli";
import FamilyHealthSection from "@/components/FamilyHealthSection";
import CitiesSection from "@/components/CitiesSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Stethoscope, PillIcon, FileCheck, Home, Bot } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <section className="container mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/book-appointment" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-blue-100 border-blue-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Book Appointment</h3>
                <p className="text-welli-text-medium text-sm">Get a doctor consultation at your home</p>
              </div>
            </Link>
            <Link to="/order-medicines" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-green-100 border-green-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <PillIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Order Medicines</h3>
                <p className="text-welli-text-medium text-sm">Get medicines delivered to your doorstep</p>
              </div>
            </Link>
            <Link to="/check-insurance" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-purple-100 border-purple-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <FileCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Check Insurance</h3>
                <p className="text-welli-text-medium text-sm">Verify your health insurance coverage</p>
              </div>
            </Link>
            <Link to="/home-services" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-orange-100 border-orange-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">At-Home Services</h3>
                <p className="text-welli-text-medium text-sm">Book diagnostics and health services</p>
              </div>
            </Link>
            <Link to="/emergency" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-red-100 border-red-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Emergency Services</h3>
                <p className="text-welli-text-medium text-sm">Get instant help, blood, and organ support in emergencies</p>
              </div>
            </Link>
            <Link to="/chatbot" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-pink-100 border-pink-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <Bot className="w-8 h-8" />
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
