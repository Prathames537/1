import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

const TutorialPage = () => {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSteps([]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-welli-dark-green hover:text-welli-green mb-6">
            <ChevronLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-welli-text-dark">How to Book Your Home Visit</h1>
          
          <div className="mb-12 max-w-3xl">
            <p className="text-welli-text-medium text-lg">
              Welli brings healthcare to your doorstep in 6 simple steps. Here's how you can book and experience our service.
            </p>
          </div>
          
          <div className="space-y-16 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-welli-pale-green rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center text-welli-dark-green font-bold text-xl">
                  {index + 1}
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-2xl font-semibold mb-3 text-welli-text-dark">{step.title}</h2>
                  <p className="text-welli-text-medium mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-welli-pale-green p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4 text-welli-text-dark">Ready to experience healthcare at your doorstep?</h2>
            <Link to="/book-appointment">
              <Button className="bg-welli-dark-green hover:bg-welli-green text-white px-8 py-6 text-lg">
                Book Your Free Visit Now <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TutorialPage;
