
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  PillIcon, 
  FileCheck, 
  Home,
  UserRound,
  Video,
  Clipboard,
  Tablet
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
  
  const serviceCards = [
    {
      title: "Book Appointment",
      icon: <Stethoscope className="w-8 h-8" />,
      description: "Get a doctor consultation at your home",
      path: "/book-appointment",
      color: "bg-blue-100 border-blue-300"
    },
    {
      title: "Order Medicines",
      icon: <PillIcon className="w-8 h-8" />,
      description: "Get medicines delivered to your doorstep",
      path: "/order-medicines",
      color: "bg-green-100 border-green-300"
    },
    {
      title: "Check Insurance",
      icon: <FileCheck className="w-8 h-8" />,
      description: "Verify your health insurance coverage",
      path: "/check-insurance",
      color: "bg-purple-100 border-purple-300"
    },
    {
      title: "At-Home Services",
      icon: <Home className="w-8 h-8" />,
      description: "Book diagnostics and health services",
      path: "/home-services",
      color: "bg-orange-100 border-orange-300"
    }
  ];

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
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((service, index) => (
            <Link to={service.path} key={index} className="hover:scale-105 transition-transform duration-300">
              <div className={`h-full rounded-xl shadow-lg border-2 ${service.color} p-6 text-center flex flex-col items-center justify-center`}>
                <div className="bg-white p-4 rounded-full mb-4 inline-block shadow-md">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">{service.title}</h3>
                <p className="text-welli-text-medium text-sm">{service.description}</p>
              </div>
            </Link>
          ))}
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
