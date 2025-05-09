import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Users, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ChatBotDialog from "@/components/ChatBot/ChatBotDialog";

import { useState } from "react";

const LOCAL_AI_URL = "http://localhost:8000/insurance-ai";

const CheckInsurance = () => {
  const [form, setForm] = useState({ name: "", age: "", email: "", phone: "", members: "1", coverage: "", weight: "", height: "", smoker: false, chronic: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const profile: any = null;
      const userProfile = profile || {
        name: form.name,
        age: Number(form.age),
        weight: Number(form.weight),
        height: Number(form.height),
        smoker: form.smoker,
        chronicDiseases: form.chronic ? form.chronic.split(',').map((d: string) => d.trim()) : [],
      };
      const res = await fetch(LOCAL_AI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });
      if (!res.ok) throw new Error("AI backend error");
      const ai = await res.json();
      setResult(ai);
    } catch (err: any) {
      setError(err.message || "Failed to check eligibility");
    } finally {
      setLoading(false);
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-welli-text-dark">Check Insurance Eligibility</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-6 text-welli-text-dark">Enter your details</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-welli-text-dark font-medium mb-2">Full Name</label>
                      <input name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                    </div>
                    <div>
                      <label className="block text-welli-text-dark font-medium mb-2">Age</label>
                      <input name="age" type="number" placeholder="Enter your age" value={form.age} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-welli-text-dark font-medium mb-2">Email Address</label>
                    <input name="email" type="email" placeholder="Enter your email address" value={form.email} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                  </div>
                  <div>
                    <label className="block text-welli-text-dark font-medium mb-2">Phone Number</label>
                    <input name="phone" type="tel" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                  </div>
                  <div>
                    <label className="block text-welli-text-dark font-medium mb-2">Number of Family Members to Cover</label>
                    <div className="relative">
                      <select name="members" value={form.members} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green">
                        <option value="1">Just me</option>
                        <option value="2">2 members</option>
                        <option value="3">3 members</option>
                        <option value="4">4 members</option>
                        <option value="5+">5+ members</option>
                      </select>
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-welli-text-dark font-medium mb-2">Preferred Coverage Type</label>
                    <select name="coverage" value={form.coverage} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green">
                      <option value="">Select coverage type</option>
                      <option value="basic">Basic Health Insurance</option>
                      <option value="comprehensive">Comprehensive Health Insurance</option>
                      <option value="critical">Critical Illness Cover</option>
                      <option value="accident">Accident Cover</option>
                    </select>
                  </div>
                  {/* Health data for premium calculation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-welli-text-dark font-medium mb-2">Weight (kg)</label>
                      <input name="weight" type="number" placeholder="e.g. 70" value={form.weight} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                    </div>
                    <div>
                      <label className="block text-welli-text-dark font-medium mb-2">Height (cm)</label>
                      <input name="height" type="number" placeholder="e.g. 170" value={form.height} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input name="smoker" type="checkbox" checked={form.smoker} onChange={handleChange} className="h-4 w-4" />
                    <label className="text-welli-text-dark">Smoker</label>
                  </div>
                  <div>
                    <label className="block text-welli-text-dark font-medium mb-2">Chronic Diseases (comma separated)</label>
                    <input name="chronic" type="text" placeholder="e.g. diabetes, hypertension" value={form.chronic} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                  </div>
                  <Button type="submit" className="w-full bg-welli-dark-green hover:bg-welli-green text-white py-6" disabled={loading}>
                    {loading ? "Checking..." : "Check My Eligibility"}
                  </Button>
                  {error && <div className="text-red-600 text-center mt-2">{error}</div>}
                  {result && (
                    <div className="text-center mt-4 p-4 rounded-lg border bg-welli-pale-green">
                      {result.eligible ? (
                        <>
                          <div className="text-lg font-semibold text-welli-dark-green">You are eligible!</div>
                          <div className="text-welli-text-dark">Your premium: <span className="font-bold">₹{result.premium}</span></div>
                          <div className="text-welli-text-medium mt-2">{result.ai_explanation}</div>
                        </>
                      ) : (
                        <>
                          <div className="text-lg font-semibold text-red-600">Not eligible</div>
                          <div className="text-welli-text-dark">Reason: {result.reason}</div>
                          <div className="text-welli-text-medium mt-2">{result.ai_explanation}</div>
                        </>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-welli-pale-green rounded-xl p-6 sticky top-32">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-welli-dark-green mr-3" />
                  <h2 className="text-xl font-semibold text-welli-text-dark">Why Choose Welli Insurance?</h2>
                </div>
                <Link to="/insurance-ai">
                  <Button className="bg-welli-main hover:bg-welli-green text-white mb-4 w-full">
                    Open Insurance AI Bot (Full Page)
                  </Button>
                </Link>
                <Button className="bg-welli-dark-green hover:bg-welli-green text-white mb-4 w-full" onClick={() => setAiOpen(true)}>
                  Chat with Insurance AI (Quick)
                </Button>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-welli-dark-green rounded-full"></div>
                    </div>
                    <p className="text-welli-text-medium">Personalized recommendations based on your health profile</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-welli-dark-green rounded-full"></div>
                    </div>
                    <p className="text-welli-text-medium">Seamless integration with Welli healthcare services</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-welli-dark-green rounded-full"></div>
                    </div>
                    <p className="text-welli-text-medium">No paperwork, digital-first experience</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-welli-dark-green rounded-full"></div>
                    </div>
                    <p className="text-welli-text-medium">Coverage for pre-existing conditions</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-welli-dark-green rounded-full"></div>
                    </div>
                    <p className="text-welli-text-medium">Dedicated support team for claims assistance</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ChatBotDialog open={aiOpen} onOpenChange={setAiOpen} />
      </main>
      <Footer />
    </div>
  );
};

export default CheckInsurance;
