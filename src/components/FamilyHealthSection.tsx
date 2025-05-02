
import { Users, FileText, Shield, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const FamilyHealthSection = () => {
  const features = [
    {
      icon: <Users className="w-10 h-10 text-welli-dark-green" />,
      title: "Family Profiles",
      description: "Create health profiles for every family member, from children to grandparents.",
      link: "/family-account"
    },
    {
      icon: <FileText className="w-10 h-10 text-welli-dark-green" />,
      title: "Health Reports",
      description: "Access all medical records, reports, and prescriptions in one secure place.",
      link: "/treatment-plan"
    },
    {
      icon: <Shield className="w-10 h-10 text-welli-dark-green" />,
      title: "Privacy Protection",
      description: "Your family's health data is encrypted and protected with the highest security standards.",
      link: "/family-account"
    },
    {
      icon: <Share2 className="w-10 h-10 text-welli-dark-green" />,
      title: "Easy Sharing",
      description: "Share reports with doctors or family members with just a few taps.",
      link: "/treatment-plan"
    }
  ];

  return (
    <section id="family-health" className="section-padding bg-welli-pale-green">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">Family Health Management</h2>
          <p className="section-subheading">
            Keep your entire family's health records organized, accessible, and secure with Welli's family health management system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="block h-full">
              <Card className="border-welli-light-green hover:border-welli-green transition-colors h-full fade-in hover:scale-105 duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 flex justify-center">
                    <div className="bg-welli-pale-green p-4 rounded-full w-20 h-20 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-welli-text-dark text-center">{feature.title}</h3>
                  <p className="text-welli-text-medium text-center flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 md:p-12 border border-welli-light-green">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-welli-text-dark">
                Revolutionizing healthcare for Indian families
              </h3>
              <p className="text-welli-text-medium mb-6 md:mb-0">
                We're making healthcare more accessible, affordable, and family-centered than ever before.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <Link to="/family-account">
                <button className="bg-welli-dark-green text-white hover:bg-welli-green py-3 px-8 rounded-lg font-medium transition-colors">
                  Create an Account for Your Family Member
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyHealthSection;
