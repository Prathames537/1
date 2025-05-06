import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText, Pill, Calendar, Activity, ThumbsUp, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const LOCAL_AI_URL = "http://localhost:8000/treatment-ai";

const TreatmentPlanPage = () => {
  const treatmentPlan = {
    patientName: "Rajiv Sharma",
    diagnosis: "Upper Respiratory Tract Infection",
    description: "Upper Respiratory Tract Infection",
    date: "14 April, 2025",
    doctor: "Dr. Ananya Patel",
    medications: [
      { name: "Azithromycin 500mg", dosage: "1 tablet once daily", duration: "3 days" },
      { name: "Paracetamol 500mg", dosage: "1 tablet every 6 hours as needed", duration: "5 days" },
      { name: "Cetirizine 10mg", dosage: "1 tablet at bedtime", duration: "5 days" }
    ],
    investigations: ["Complete Blood Count", "C-Reactive Protein Test"],
    lifestyle: [
      "Rest adequately for 2-3 days",
      "Stay hydrated with warm fluids",
      "Gargle with warm salt water twice daily",
      "Avoid cold foods and beverages"
    ],
    followUp: "After 5 days if symptoms persist"
  };

  const [aiAdvice, setAiAdvice] = useState("");

  useEffect(() => {
    fetch(LOCAL_AI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: treatmentPlan.description,
        meds: treatmentPlan.medications.join(', '),
      }),
    })
      .then(res => res.json())
      .then(ai => setAiAdvice(ai.advice))
      .catch(() => setAiAdvice(""));
  }, [treatmentPlan]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/doctor-consultation" className="inline-flex items-center text-welli-dark-green hover:text-welli-green mb-6">
            <ChevronLeft size={20} />
            <span>Back to Doctor Consultation</span>
          </Link>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center">
                <FileText className="text-welli-dark-green mr-3" size={24} />
                <h1 className="text-2xl md:text-3xl font-bold text-welli-text-dark">Treatment Plan</h1>
              </div>
              <div className="text-right">
                <p className="text-welli-text-medium">{treatmentPlan.date}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-welli-text-medium"><span className="font-medium">Patient:</span> {treatmentPlan.patientName}</p>
              </div>
              <div>
                <p className="text-welli-text-medium"><span className="font-medium">Doctor:</span> {treatmentPlan.doctor}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-welli-text-dark flex items-center">
                <Activity className="mr-2 text-welli-dark-green" size={20} />
                Diagnosis
              </h2>
              <div className="bg-welli-pale-green p-4 rounded-lg">
                <p className="font-medium text-welli-text-dark">{treatmentPlan.diagnosis}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-welli-text-dark flex items-center">
                <Pill className="mr-2 text-welli-dark-green" size={20} />
                Medications
              </h2>
              <div className="space-y-4">
                {treatmentPlan.medications.map((medication, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-welli-text-dark mb-2">{medication.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p className="text-welli-text-medium"><span className="font-medium">Dosage:</span> {medication.dosage}</p>
                      <p className="text-welli-text-medium"><span className="font-medium">Duration:</span> {medication.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/order-medicines">
                  <Button variant="outline" className="border-welli-light-green text-welli-dark-green hover:bg-welli-pale-green">
                    <ShoppingBag className="mr-2" size={16} />
                    Order these medicines now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-welli-text-dark flex items-center">
                <FileText className="mr-2 text-welli-dark-green" size={20} />
                Investigations
              </h2>
              <ul className="space-y-2">
                {treatmentPlan.investigations.map((investigation, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-welli-text-medium">{investigation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-welli-text-dark flex items-center">
                <ThumbsUp className="mr-2 text-welli-dark-green" size={20} />
                Lifestyle Recommendations
              </h2>
              <ul className="space-y-2">
                {treatmentPlan.lifestyle.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-welli-dark-green rounded-full mr-2"></div>
                    <span className="text-welli-text-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4 text-welli-text-dark flex items-center">
                <Calendar className="mr-2 text-welli-dark-green" size={20} />
                Follow-up
              </h2>
              <p className="text-welli-text-medium">{treatmentPlan.followUp}</p>
              
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/book-appointment">
                  <Button className="bg-welli-dark-green hover:bg-welli-green text-white">
                    Schedule Follow-up
                  </Button>
                </Link>
                <Link to="/home-services">
                  <Button variant="outline" className="border-welli-light-green text-welli-dark-green hover:bg-welli-pale-green">
                    Book Home Tests
                  </Button>
                </Link>
              </div>
            </div>

            {aiAdvice && (
              <div className="bg-welli-pale-green rounded-lg p-3 mt-4">
                <div className="text-sm text-welli-dark-green font-semibold">Welli AI Advice:</div>
                <div className="text-sm">{aiAdvice}</div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentPlanPage;
