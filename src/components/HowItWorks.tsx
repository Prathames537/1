import { HomeIcon, Video, Pill, Stethoscope, UserRound, Tablet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: <HomeIcon className="w-12 h-12 text-welli-dark-green" />,
      title: "Book a Home Visit",
      description: "Schedule a convenient time for our healthcare assistant to visit your home.",
      link: "/book-appointment"
    },
    {
      icon: <UserRound className="w-12 h-12 text-welli-dark-green" />,
      title: "Assistant Arrives",
      description: "Our trained healthcare assistant comes to your doorstep with necessary equipment.",
      link: "/assistant-details"
    },
    {
      icon: <Tablet className="w-12 h-12 text-welli-dark-green" />,
      title: "Initial Health Check",
      description: "The assistant checks your vitals like temperature, blood pressure, and basic symptoms.",
      link: "/assistant-details"
    },
    {
      icon: <Video className="w-12 h-12 text-welli-dark-green" />,
      title: "Doctor Consultation",
      description: "Connect with a licensed doctor via video call facilitated by the assistant's tablet.",
      link: "/doctor-consultation"
    },
    {
      icon: <Stethoscope className="w-12 h-12 text-welli-dark-green" />,
      title: "Treatment Plan",
      description: "Receive a personalized treatment plan and prescription from the doctor.",
      link: "/treatment-plan"
    },
    {
      icon: <Pill className="w-12 h-12 text-welli-dark-green" />,
      title: "Doorstep Services",
      description: "Get medicines, tests, and insurance options delivered to your doorstep if needed.",
      link: "/home-services"
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-heading">How Welli Works</h2>
          <p className="section-subheading mb-2">
            Experience healthcare the way it should be — our assistant brings everything needed for your consultation right to your home.
          </p>
          <Link to="/how-to-book" className="inline-flex items-center text-welli-dark-green hover:text-welli-green">
            <span className="underline">Learn more about our process</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Link to={step.link} key={index} className="block">
              <div 
                className="bg-welli-pale-green p-8 rounded-xl card-shadow flex flex-col items-center text-center h-full fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white p-4 rounded-full mb-4 shadow-md w-20 h-20 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-4 text-welli-text-dark">{step.title}</h3>
                <p className="text-welli-text-medium text-sm flex-grow">{step.description}</p>
                <div className="mt-4 text-welli-dark-green font-bold text-xl">
                  {index + 1}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative mt-20">
          <div className="absolute inset-0 bg-welli-light-green rounded-xl opacity-20"></div>
          <div className="relative p-8 md:p-10 rounded-xl border border-welli-light-green">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-welli-text-dark">
                  Ready to experience healthcare at your doorstep?
                </h3>
                <p className="text-welli-text-medium mb-0">
                  Book your consultation today and experience better healthcare.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Link to="/book-free-trial">
                  <button className="bg-welli-dark-green hover:bg-welli-green text-white py-3 px-8 rounded-lg font-medium transition-colors">
                    Book Your Free Visit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
