
import { Clock, Shield, Wallet, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const WhyWelli = () => {
  const benefits = [
    {
      icon: <Clock className="w-12 h-12 text-welli-dark-green" />,
      title: "Speed & Convenience",
      description: "No more waiting in clinics or traveling when sick. Get healthcare at home on your schedule.",
      link: "/book-appointment"
    },
    {
      icon: <Shield className="w-12 h-12 text-welli-dark-green" />,
      title: "Trust & Quality",
      description: "Licensed doctors, trained assistants, and genuine medicines ensure high-quality care.",
      link: "/doctor-consultation"
    },
    {
      icon: <Wallet className="w-12 h-12 text-welli-dark-green" />,
      title: "Affordable Care",
      description: "Pay only for what you need with transparent pricing and no hidden costs.",
      link: "/check-insurance"
    },
    {
      icon: <Heart className="w-12 h-12 text-welli-dark-green" />,
      title: "Comprehensive Care",
      description: "From consultation to medicines, tests, and insurance — all your healthcare needs in one place.",
      link: "/treatment-plan"
    }
  ];

  return (
    <section id="why-welli" className="section-padding bg-welli-pale-green">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">Why Choose Welli?</h2>
          <p className="section-subheading">
            We're reimagining healthcare delivery in India with convenience and quality at the core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Link to={benefit.link} key={index} className="block hover:scale-105 transition-transform duration-300">
              <div 
                className="bg-white p-8 rounded-xl card-shadow fade-in flex flex-col h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-welli-light-green p-4 rounded-full mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-welli-text-dark text-center">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-welli-text-medium text-center">
                  {benefit.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-welli-green px-4 py-2 rounded-full text-white font-medium mb-6">
            Our Vision
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-welli-text-dark max-w-3xl mx-auto">
            To make quality healthcare accessible to every Indian home.
          </h3>
          <div className="max-w-2xl mx-auto">
            <p className="text-welli-text-medium">
              Welli is building the healthcare infrastructure of tomorrow, bringing medical expertise to your doorstep today with technology and human touch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWelli;
