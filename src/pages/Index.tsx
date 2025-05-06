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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Link to="/book-appointment" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-blue-100 border-blue-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <svg className="w-8 h-8 text-blue-600"><use href="#icon-stethoscope" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Book Appointment</h3>
                <p className="text-welli-text-medium text-sm">Get a doctor consultation at your home</p>
              </div>
            </Link>
            <Link to="/order-medicines" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-green-100 border-green-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <svg className="w-8 h-8 text-green-600"><use href="#icon-pill" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Order Medicines</h3>
                <p className="text-welli-text-medium text-sm">Get medicines delivered to your doorstep</p>
              </div>
            </Link>
            <Link to="/check-insurance" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-purple-100 border-purple-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <svg className="w-8 h-8 text-purple-600"><use href="#icon-file-check" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Check Insurance</h3>
                <p className="text-welli-text-medium text-sm">Verify your health insurance coverage</p>
              </div>
            </Link>
            <Link to="/home-services" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-orange-100 border-orange-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  <svg className="w-8 h-8 text-orange-600"><use href="#icon-home" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">At-Home Services</h3>
                <p className="text-welli-text-medium text-sm">Book diagnostics and health services</p>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="flex gap-2 mb-4">
                  <div className="bg-white p-4 rounded-full inline-block shadow-md">
                    <Droplet className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="bg-white p-4 rounded-full inline-block shadow-md">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Blood & Organ Bank</h3>
                <p className="text-welli-text-medium text-sm">Find/request blood and organs for emergencies</p>
              </div>
            </Link>
            <Link to="/reminders" className="hover:scale-105 transition-transform duration-300">
              <div className="h-full rounded-xl shadow-lg border-2 bg-yellow-100 border-yellow-300 p-6 text-center flex flex-col items-center justify-center">
                <div className="flex gap-2 mb-4">
                  <div className="bg-white p-4 rounded-full inline-block shadow-md">
                    <Bell className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="bg-white p-4 rounded-full inline-block shadow-md">
                    <Bot className="w-8 h-8 text-pink-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Assistant</h3>
                <p className="text-welli-text-medium text-sm">Reminders, wellness, and chat with our AI for health advice</p>
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
