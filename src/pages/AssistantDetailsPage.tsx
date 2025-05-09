import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, MapPin, Stethoscope, Thermometer, Activity, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ChatBotDialog from "@/components/ChatBot/ChatBotDialog";
import { useState } from "react";

const AssistantDetailsPage = () => {
  const assistant = {
    name: "Priya Sharma",
    role: "Healthcare Assistant",
    experience: "5+ years",
    eta: "25 minutes",
    image: "/assistant-profile.jpg",
    equipment: ["Digital Thermometer", "Blood Pressure Monitor", "Pulse Oximeter", "Stethoscope", "Tablet for Video Consultation"]
  };

  const vitalChecks = [
    { name: "Body Temperature", icon: <Thermometer className="w-5 h-5" /> },
    { name: "Blood Pressure", icon: <Activity className="w-5 h-5" /> },
    { name: "Pulse Rate", icon: <Activity className="w-5 h-5" /> },
    { name: "Oxygen Saturation", icon: <Activity className="w-5 h-5" /> },
    { name: "Respiratory Rate", icon: <Activity className="w-5 h-5" /> }
  ];

  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-welli-dark-green hover:text-welli-green mb-6">
            <ChevronLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="bg-welli-pale-green p-4 md:p-6 rounded-xl mb-8 flex items-center">
            <Clock className="text-welli-dark-green mr-3" />
            <p className="text-welli-text-dark font-medium">
              Your healthcare assistant is on the way! Estimated arrival: <span className="font-bold">{assistant.eta}</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={assistant.image} alt={assistant.name} />
                  <AvatarFallback>{assistant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-welli-text-dark">{assistant.name}</h2>
                <p className="text-welli-text-medium mb-3">{assistant.role}</p>
                <p className="text-sm text-welli-text-light mb-4">Experience: {assistant.experience}</p>
                
                <div className="flex items-center justify-center text-welli-text-medium">
                  <MapPin size={16} className="mr-1" />
                  <span>Currently en route to your location</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">What to Expect</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <UserRound className="mr-2 text-welli-dark-green" />
                    Healthcare Assistant
                  </h3>
                  <p className="text-welli-text-medium mb-4">
                    {assistant.name} will arrive at your doorstep with all necessary medical equipment to perform an initial health check.
                  </p>
                  
                  <h4 className="font-medium mb-2 text-welli-text-dark">Equipment Being Brought:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {assistant.equipment.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                        <span className="text-welli-text-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Stethoscope className="mr-2 text-welli-dark-green" />
                    Initial Health Check
                  </h3>
                  <p className="text-welli-text-medium mb-4">
                    The assistant will perform the following vital checks:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {vitalChecks.map((check, index) => (
                      <div key={index} className="bg-welli-pale-green rounded-lg p-3 flex items-center">
                        <div className="bg-white rounded-full p-2 mr-3 text-welli-dark-green">
                          {check.icon}
                        </div>
                        <span className="text-welli-text-dark">{check.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center mb-8">
            <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">After Initial Check</h2>
            <p className="text-welli-text-medium mb-6">
              Once your initial health check is complete, you'll be connected with a doctor via video consultation through the assistant's tablet.
            </p>
            <Link to="/assistant-ai">
              <Button className="bg-welli-main hover:bg-welli-green text-white mb-4">
                Open Assistant AI Bot (Full Page)
              </Button>
            </Link>
            <Button className="bg-welli-dark-green hover:bg-welli-green text-white ml-2 mb-4" onClick={() => setAiOpen(true)}>
              Chat with Assistant AI (Quick)
            </Button>
            <Link to="/doctor-consultation">
              <Button className="bg-welli-dark-green hover:bg-welli-green text-white">
                Learn About the Doctor Consultation
              </Button>
            </Link>
          </div>
        </div>
        <ChatBotDialog open={aiOpen} onOpenChange={setAiOpen} />
      </main>
      <Footer />
    </div>
  );
};

export default AssistantDetailsPage;
