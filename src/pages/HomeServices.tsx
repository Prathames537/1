import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TestTube, Activity, HeartPulse, Microscope, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const LOCAL_AI_URL = "http://localhost:8000/diagnostics-ai";

const HomeServices = () => {
  const services = [
    {
      icon: <TestTube className="w-10 h-10 text-welli-dark-green" />,
      title: "Complete Blood Count (CBC)",
      description: "Comprehensive blood test that evaluates overall health and detects various disorders.",
      price: "₹599"
    },
    {
      icon: <Activity className="w-10 h-10 text-welli-dark-green" />,
      title: "Lipid Profile",
      description: "Measures cholesterol levels and helps assess risk of heart disease.",
      price: "₹799"
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-welli-dark-green" />,
      title: "Cardiac Risk Assessment",
      description: "Evaluates risk factors for heart disease including blood pressure and ECG.",
      price: "₹1,499"
    },
    {
      icon: <Microscope className="w-10 h-10 text-welli-dark-green" />,
      title: "Diabetes Screening",
      description: "Checks blood glucose levels to detect diabetes or pre-diabetic conditions.",
      price: "₹699"
    }
  ];

  const [selectedService, setSelectedService] = useState<any>(null);
  const [aiRec, setAiRec] = useState<string>("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    if (userAge) {
      fetch(LOCAL_AI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(userAge),
          gender: userGender,
          selected: service.title,
          history: "",
        }),
      })
        .then(res => res.json())
        .then(ai => setAiRec(ai.recommendations))
        .catch(() => setAiRec(""));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-welli-dark-green hover:text-welli-green mb-6">
            <ChevronLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-welli-text-dark">At-Home Health Services</h1>
          
          <p className="text-welli-text-medium mb-10 max-w-3xl">
            Our trained healthcare professionals visit your home to collect samples, perform tests, and provide results digitally. All services include home visit fees and digital reports within 24 hours.
          </p>
          
          <div className="mb-4 flex gap-4">
            <input type="number" placeholder="Your Age" value={userAge} onChange={e => setUserAge(e.target.value)} className="p-2 border rounded" />
            <select value={userGender} onChange={e => setUserGender(e.target.value)} className="p-2 border rounded">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {services.map((service, idx) => (
              <div key={idx} onClick={() => handleSelectService(service)} className={`bg-white rounded-lg p-6 border-2 ${selectedService === service ? 'border-welli-green' : 'border-welli-dark-green'} cursor-pointer mb-4`}>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">{service.title}</h3>
                <p className="text-welli-text-medium mb-3">{service.description}</p>
                <span className="text-xl font-bold text-welli-dark-green">{service.price}</span>
                {selectedService === service && aiRec && (
                  <div className="mt-3 bg-welli-pale-green rounded p-3 text-sm text-welli-dark-green">AI Suggestion: {aiRec}</div>
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-welli-pale-green rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-welli-text-dark">Health Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Basic Health Checkup</h3>
                <p className="text-welli-text-medium mb-3">Essential tests to monitor your basic health parameters.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Complete Blood Count</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Lipid Profile</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Blood Sugar (Fasting)</span>
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-welli-dark-green">₹1,499</span>
                  <Button size="sm" className="bg-welli-dark-green hover:bg-welli-green text-white">
                    Book
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border-2 border-welli-dark-green relative">
                <div className="absolute -top-3 right-4 bg-welli-dark-green text-white px-3 py-1 text-xs rounded-full">
                  Most Popular
                </div>
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Comprehensive Package</h3>
                <p className="text-welli-text-medium mb-3">Thorough assessment of all major health parameters.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">All Basic Package Tests</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Liver Function Test</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Kidney Function Test</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Thyroid Profile</span>
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-welli-dark-green">₹2,999</span>
                  <Button size="sm" className="bg-welli-dark-green hover:bg-welli-green text-white">
                    Book
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-welli-text-dark">Family Health Package</h3>
                <p className="text-welli-text-medium mb-3">Essential tests for two family members.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Basic Package for 2 People</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Doctor Consultation</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-sm text-welli-text-medium">Follow-up Call</span>
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-welli-dark-green">₹2,799</span>
                  <Button size="sm" className="bg-welli-dark-green hover:bg-welli-green text-white">
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-welli-light-green">
            <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">Need a Custom Test Package?</h2>
            <p className="text-welli-text-medium mb-6">
              Get in touch with our healthcare team to create a personalized testing package based on your specific health needs.
            </p>
            <Button className="bg-welli-dark-green hover:bg-welli-green text-white">
              Contact Health Advisor
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeServices;
