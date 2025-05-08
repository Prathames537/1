import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Pill, Search, ShoppingCart, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const OrderMedicines = () => {
  const [medicines] = useState<any[]>([]);
  const [orderQty, setOrderQty] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQtyChange = (name: string, val: number) => {
    setOrderQty(q => ({ ...q, [name]: val }));
  };

  const handleOrder = async (medicine: any) => {
    setLoading(medicine.name); setSuccess(null); setError(null);
    setTimeout(() => {
      setSuccess(`Order placed for ${medicine.name}`);
      setOrderQty(q => ({ ...q, [medicine.name]: 1 }));
      setLoading(null);
    }, 1000);
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-welli-text-dark">Order Medicines</h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10">
            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Search for medicines..." 
                className="w-full p-4 border border-gray-200 rounded-lg pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-welli-light-green"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={20} />
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-4 py-2 bg-welli-pale-green text-welli-dark-green rounded-full">Fever</span>
              <span className="px-4 py-2 bg-welli-pale-green text-welli-dark-green rounded-full">Cold & Cough</span>
              <span className="px-4 py-2 bg-welli-pale-green text-welli-dark-green rounded-full">Vitamins</span>
              <span className="px-4 py-2 bg-welli-pale-green text-welli-dark-green rounded-full">Pain Relief</span>
              <span className="px-4 py-2 bg-welli-pale-green text-welli-dark-green rounded-full">Diabetes</span>
              <span className="px-4 py-2 bg-welli-pale-green text-welli-dark-green rounded-full">Cardiac</span>
            </div>
            
            <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">Popular Medicines</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicines.map((medicine, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-welli-pale-green p-2 rounded-full mr-3">
                      <Pill className="w-5 h-5 text-welli-dark-green" />
                    </div>
                    <span className="text-sm text-welli-text-light">{medicine.type}</span>
                  </div>
                  <h3 className="font-medium text-welli-text-dark mb-2">{medicine.name}</h3>
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-bold text-welli-dark-green">{medicine.price}</span>
                    <input type="number" min={1} value={orderQty[medicine.name] || 1} onChange={e => handleQtyChange(medicine.name, Math.max(1, +e.target.value))} className="w-16 p-1 border rounded text-sm mr-2" />
                    <button
                      className="bg-welli-dark-green text-white p-2 rounded-full hover:bg-welli-green transition-colors disabled:opacity-60"
                      disabled={loading === medicine.name}
                      onClick={e => { e.preventDefault(); handleOrder(medicine); }}
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                  {loading === medicine.name && <div className="text-xs text-welli-dark-green mt-2">Placing order...</div>}
                  {success && success.includes(medicine.name) && <div className="text-xs text-green-700 mt-2">Ordered!</div>}
                  {error && error.includes(medicine.name) && <div className="text-xs text-red-600 mt-2">{error}</div>}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="inline-flex items-center text-welli-dark-green hover:text-welli-green">
                <span className="mr-2">View All Medicines</span>
                <ChevronLeft className="rotate-180" size={16} />
              </button>
            </div>
          </div>
          
          <div className="bg-welli-pale-green rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">Have a prescription?</h2>
            <p className="text-welli-text-medium mb-4">Upload your prescription and we'll deliver the medicines to your doorstep.</p>
            <button className="bg-welli-dark-green hover:bg-welli-green text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Upload Prescription
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderMedicines;
