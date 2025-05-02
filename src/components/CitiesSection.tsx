
import { MapPin } from "lucide-react";

const CitiesSection = () => {
  const cities = [
    {
      name: "Delhi",
      icon: <MapPin className="w-5 h-5" />,
      status: "coming"
    },
    {
      name: "Mumbai",
      icon: <MapPin className="w-5 h-5" />,
      status: "coming"
    },
    {
      name: "Bengaluru",
      icon: <MapPin className="w-5 h-5" />,
      status: "coming"
    },
    {
      name: "Pune",
      icon: <MapPin className="w-5 h-5" />,
      status: "coming"
    }
  ];

  return (
    <section id="cities" className="section-padding bg-welli-pale-green">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">Where We Serve</h2>
          <p className="section-subheading">
            We're rapidly expanding across India to bring healthcare to your doorstep.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl card-shadow">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cities.map((city, index) => (
              <div 
                key={index} 
                className="flex items-center p-4 rounded-lg border border-gray-100"
              >
                <div className="p-2 rounded-full mr-4 bg-gray-100 text-welli-text-medium">
                  {city.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-welli-text-dark">{city.name}</h4>
                </div>
                <div className="bg-welli-light-green/20 text-welli-dark-green text-sm font-medium py-1 px-3 rounded-full">
                  Coming Soon
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-welli-text-medium mb-4">
            Don't see your city? Let us know where you'd like us to expand next.
          </p>
          <button className="bg-white border border-welli-dark-green text-welli-dark-green hover:bg-welli-pale-green py-2 px-6 rounded-lg font-medium transition-colors">
            Request Your City
          </button>
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;
