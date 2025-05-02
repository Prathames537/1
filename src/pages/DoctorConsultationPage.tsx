
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Video, MessageSquare, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const DoctorConsultationPage = () => {
  const doctor = {
    name: "Dr. Ananya Patel",
    specialization: "General Physician",
    experience: "12+ years",
    education: "MBBS, MD (Internal Medicine)",
    image: "/doctor-profile.jpg",
    languages: ["English", "Hindi", "Gujarati"]
  };

  const consultationSteps = [
    {
      title: "Video Connection",
      description: "The healthcare assistant will establish a secure video connection with the doctor.",
      icon: <Video className="w-6 h-6 text-welli-dark-green" />
    },
    {
      title: "Consultation",
      description: "Discuss your symptoms and health concerns directly with the doctor.",
      icon: <MessageSquare className="w-6 h-6 text-welli-dark-green" />
    },
    {
      title: "Diagnosis & Treatment",
      description: "Receive a diagnosis and personalized treatment plan.",
      icon: <FileText className="w-6 h-6 text-welli-dark-green" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/assistant-details" className="inline-flex items-center text-welli-dark-green hover:text-welli-green mb-6">
            <ChevronLeft size={20} />
            <span>Back to Assistant Details</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-welli-text-dark">Doctor Consultation</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-welli-text-dark">{doctor.name}</h2>
                <p className="text-welli-text-medium mb-3">{doctor.specialization}</p>
                <p className="text-sm text-welli-text-light mb-4">{doctor.education}</p>
                <p className="text-sm text-welli-text-light mb-2">Experience: {doctor.experience}</p>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Languages Spoken:</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {doctor.languages.map((language, index) => (
                      <span key={index} className="bg-welli-pale-green text-welli-dark-green text-xs px-2 py-1 rounded-full">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 text-welli-text-dark">How the Consultation Works</h2>
                
                <div className="space-y-6 mb-8">
                  {consultationSteps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-welli-pale-green rounded-full p-3 mr-4 flex-shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-welli-text-dark">{step.title}</h3>
                        <p className="text-welli-text-medium">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-welli-pale-green p-4 rounded-lg flex items-center mb-6">
                  <Clock className="text-welli-dark-green mr-3 flex-shrink-0" />
                  <p className="text-welli-text-dark">
                    <span className="font-medium">Average consultation time:</span> 15-20 minutes, depending on your health concerns.
                  </p>
                </div>
                
                <h3 className="font-medium mb-4 text-welli-text-dark">Benefits of Video Consultation:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-welli-text-medium">Face-to-face interaction with a qualified doctor</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-welli-text-medium">Assistant helps with physical examination as needed</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-welli-text-medium">Immediate prescription and treatment plan</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-welli-text-medium">No travel to clinic or hospital required</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center mb-8">
            <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">After Consultation</h2>
            <p className="text-welli-text-medium mb-6">
              After your consultation, the doctor will create a personalized treatment plan tailored to your health needs.
            </p>
            <Link to="/treatment-plan">
              <Button className="bg-welli-dark-green hover:bg-welli-green text-white">
                View Sample Treatment Plan
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorConsultationPage;
