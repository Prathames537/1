
import { Video, ShoppingBag, Beaker, HeartPulse, HomeIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: <Video className="w-10 h-10 text-welli-dark-green" />,
      title: "Doctor Consultations",
      description: "Video consult with licensed specialists without leaving your home."
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-welli-dark-green" />,
      title: "Medicine Delivery",
      description: "Get prescribed medicines delivered to your doorstep within hours."
    },
    {
      icon: <Beaker className="w-10 h-10 text-welli-dark-green" />,
      title: "Home Blood Tests",
      description: "Lab professionals collect samples at home and deliver results digitally."
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-welli-dark-green" />,
      title: "Health Insurance",
      description: "Get personalized insurance recommendations based on your health profile."
    },
    {
      icon: <HomeIcon className="w-10 h-10 text-welli-dark-green" />,
      title: "Doorstep Service",
      description: "Our trained assistants come to you with all necessary equipment."
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">What You Get With Welli</h2>
          <p className="section-subheading">
            A complete healthcare ecosystem that revolves around you and your family's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-welli-light-green hover:border-welli-green transition-colors fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="bg-welli-pale-green p-3 rounded-full">
                    {service.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-welli-light-green flex items-center justify-center text-welli-dark-green font-medium">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-welli-text-dark">{service.title}</h3>
                <p className="text-welli-text-medium">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-green-gradient rounded-xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Your family's health, our commitment
              </h3>
              <p className="opacity-90 mb-6 md:mb-0">
                Join thousands of Indian families who trust Welli for their day-to-day healthcare needs.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <button className="bg-white text-welli-dark-green hover:bg-welli-pale-green py-3 px-8 rounded-lg font-medium transition-colors">
                Schedule a Convenient Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
