import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  PillIcon, 
  FileCheck, 
  Home,
  UserRound,
  Video,
  Clipboard,
  Tablet,
  AlertTriangle,
  Droplet,
  Heart,
  Bell,
  Bot
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const careSteps = [
    {
      icon: <Home className="w-16 h-16 text-welli-dark-green" />,
      title: "Book Visit",
      description: "Schedule a home visit"
    },
    {
      icon: <UserRound className="w-16 h-16 text-welli-dark-green" />,
      title: "Assistant Arrives",
      description: "Healthcare assistant comes to you"
    },
    {
      icon: <Tablet className="w-16 h-16 text-welli-dark-green" />,
      title: "Health Check",
      description: "Assistant checks your vitals"
    },
    {
      icon: <Video className="w-16 h-16 text-welli-dark-green" />,
      title: "Doctor Consult",
      description: "Connect via assistant's tablet"
    },
    {
      icon: <Clipboard className="w-16 h-16 text-welli-dark-green" />,
      title: "Care Plan",
      description: "Get personalized treatment"
    },
  ];

  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % careSteps.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-welli-pale-green overflow-hidden">
      <div className="absolute inset-0 bg-light-gradient z-0"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-welli-text-dark mb-6">
              Healthcare at Your Doorstep
            </h1>
            <p className="text-xl text-welli-text-medium mb-8 max-w-xl">
              Consult doctors, get medicines, lab tests, and insurance all from the comfort of your home.
            </p>
            
            <div className="mt-8">
              <Link to="/book-free-trial">
                <Button className="bg-welli-dark-green hover:bg-welli-green text-white px-6 py-5 text-lg">
                  Book Your First Free Visit <span className="ml-2 bg-white text-welli-dark-green text-xs px-2 py-1 rounded-full font-bold">FREE</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative fade-in hidden lg:block">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-welli-light-green rounded-full opacity-50 blur-3xl"></div>
            
            <Carousel className="w-full bg-white p-4 rounded-2xl shadow-xl">
              <CarouselContent>
                {careSteps.map((step, index) => (
                  <CarouselItem key={index} className={activeSlide === index ? 'block' : 'hidden'}>
                    <div className="p-4 text-center">
                      <div className="bg-welli-pale-green rounded-full p-6 inline-block mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-welli-text-medium">{step.description}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            <div className="absolute top-1/2 -left-10 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-welli-green rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Old features */}
          <Link to="/book-appointment" className="hover:scale-105 transition-transform duration-300">
            <div className="h-full rounded-xl shadow-lg border-2 bg-blue-100 border-blue-300 p-6 text-center flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Book Appointment</h3>
              <p className="text-welli-text-medium text-sm">Get a doctor consultation at your home</p>
            </div>
          </Link>
          <Link to="/order-medicines" className="hover:scale-105 transition-transform duration-300">
            <div className="h-full rounded-xl shadow-lg border-2 bg-green-100 border-green-300 p-6 text-center flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                <PillIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Order Medicines</h3>
              <p className="text-welli-text-medium text-sm">Get medicines delivered to your doorstep</p>
            </div>
          </Link>
          <Link to="/check-insurance" className="hover:scale-105 transition-transform duration-300">
            <div className="h-full rounded-xl shadow-lg border-2 bg-purple-100 border-purple-300 p-6 text-center flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                <FileCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Check Insurance</h3>
              <p className="text-welli-text-medium text-sm">Verify your health insurance coverage</p>
            </div>
          </Link>
          <Link to="/home-services" className="hover:scale-105 transition-transform duration-300">
            <div className="h-full rounded-xl shadow-lg border-2 bg-orange-100 border-orange-300 p-6 text-center flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                <Home className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">At-Home Services</h3>
              <p className="text-welli-text-medium text-sm">Book diagnostics and health services</p>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* New features */}
          <Link to="/documents" className="hover:scale-105 transition-transform duration-300">
            <div className="h-full rounded-xl shadow-lg border-2 bg-green-100 border-green-300 p-6 text-center flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                <FileCheck className="w-8 h-8 text-green-600" />
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
        
        <div className="mt-20 pt-10 border-t border-welli-light-green">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="font-bold text-2xl md:text-3xl text-welli-dark-green">Certified</p>
              <p className="text-welli-text-medium">Doctors</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl md:text-3xl text-welli-dark-green">High</p>
              <p className="text-welli-text-medium">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl md:text-3xl text-welli-dark-green">Quick</p>
              <p className="text-welli-text-medium">Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
