import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ChevronLeft, InfoIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useAppointments } from "../features/appointments/hooks/useAppointments";

interface AppointmentForm {
  serviceType: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  description: string;
}

const BookAppointment = () => {
  const [form, setForm] = useState<AppointmentForm>({ serviceType: "", date: "", time: "", name: "", phone: "", description: "" });
  const { bookAppointment, loading, error } = useAppointments();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f: any) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookAppointment();
    if (!error) {
      setForm({ serviceType: "", date: "", time: "", name: "", phone: "", description: "" });
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
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 text-welli-text-dark">Book Your Appointment</h1>
            
            <Link to="/how-to-book" className="inline-flex items-center bg-welli-pale-green text-welli-dark-green px-4 py-2 rounded-lg hover:bg-welli-light-green transition-colors">
              <InfoIcon size={16} className="mr-2" />
              <span>How it works</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-3xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-welli-text-dark font-medium mb-2">Select Service Type</label>
                <select name="serviceType" value={form.serviceType} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green">
                  <option value="">Select a service</option>
                  <option value="general">General Consultation</option>
                  <option value="specialist">Specialist Consultation</option>
                  <option value="followup">Follow-up Visit</option>
                  <option value="pediatric">Pediatric Care</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-welli-text-dark font-medium mb-2">Preferred Date</label>
                  <div className="relative">
                    <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-welli-text-dark font-medium mb-2">Preferred Time</label>
                  <div className="relative">
                    <select name="time" value={form.time} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green">
                      <option value="">Select a time</option>
                      <option value="morning">Morning (9am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 4pm)</option>
                      <option value="evening">Evening (4pm - 8pm)</option>
                    </select>
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-welli-text-dark font-medium mb-2">Your Name</label>
                <div className="relative">
                  <input name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-welli-text-dark font-medium mb-2">Phone Number</label>
                <input name="phone" type="tel" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green" />
              </div>
              <div>
                <label className="block text-welli-text-dark font-medium mb-2">Brief Description of Issue (Optional)</label>
                <textarea name="description" rows={3} placeholder="Tell us briefly about your health concern" value={form.description} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green"></textarea>
              </div>
              <Button type="submit" className="w-full bg-welli-dark-green hover:bg-welli-green text-white py-6" disabled={loading}>
                {loading ? "Booking..." : "Schedule Appointment"}
              </Button>
              
              {error && <div className="text-center text-red-600 mt-2">{error}</div>}
              <div className="text-center mt-4">
                <Link to="/book-free-trial" className="text-welli-dark-green hover:text-welli-green font-medium">
                  First time? Book a free trial visit instead
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookAppointment;
