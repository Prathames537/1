import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Clock, MapPin, User, Phone, MessageSquare, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const FreeTrialBookingPage = () => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSubmitted(true), 1000);
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-welli-text-dark">Book Your Free Trial Visit</h1>
          
          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-welli-text-dark font-medium mb-2">Your Name</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Enter your full name" 
                            className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-welli-text-dark font-medium mb-2">Phone Number</label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            placeholder="Enter your phone number" 
                            className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-welli-text-dark font-medium mb-2">Your Address</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Enter your complete address" 
                            className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-welli-text-dark font-medium mb-2">Preferred Date</label>
                        <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal border-gray-200 pl-10 relative",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                                {date ? format(date, "PPP") : <span>Select date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-welli-text-dark font-medium mb-2">Preferred Time Slot</label>
                        <div className="relative">
                          <select 
                            className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green appearance-none"
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            required
                          >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </select>
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-text-medium" size={18} />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-welli-text-dark font-medium mb-2">Health Concerns (Optional)</label>
                        <div className="relative">
                          <textarea 
                            placeholder="Briefly describe your health concerns or symptoms" 
                            className="w-full p-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-welli-light-green min-h-[100px]"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                          ></textarea>
                          <MessageSquare className="absolute left-3 top-4 text-welli-text-medium" size={18} />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-welli-dark-green hover:bg-welli-green text-white py-6">
                        Book Free Trial Visit
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-welli-pale-green rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">Free Trial Includes:</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="text-welli-dark-green mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-welli-text-medium">Home visit by healthcare assistant</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-welli-dark-green mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-welli-text-medium">Basic health checkup with vital signs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-welli-dark-green mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-welli-text-medium">Video consultation with a doctor</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-welli-dark-green mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-welli-text-medium">Personalized treatment plan</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-welli-dark-green mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-welli-text-medium">No hidden charges or fees</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">What Our Patients Say</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-welli-light-green pl-4">
                      <p className="text-welli-text-medium italic mb-2">
                        "The convenience of having healthcare at my doorstep was amazing. The assistant was professional and the doctor was very knowledgeable."
                      </p>
                      <p className="text-welli-text-dark font-medium">- Priya S.</p>
                    </div>
                    <div className="border-l-4 border-welli-light-green pl-4">
                      <p className="text-welli-text-medium italic mb-2">
                        "I was skeptical at first, but the free trial convinced me. Now my whole family uses Welli for our healthcare needs."
                      </p>
                      <p className="text-welli-text-dark font-medium">- Rahul M.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-welli-pale-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-welli-dark-green" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-welli-text-dark">Booking Confirmed!</h2>
              <p className="text-welli-text-medium mb-6">
                Your free trial visit has been booked successfully. We will contact you shortly to confirm your appointment.
              </p>
              <div className="bg-welli-pale-green p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-welli-text-medium"><span className="font-medium">Date:</span> {date ? format(date, "PPP") : ""}</p>
                  </div>
                  <div>
                    <p className="text-welli-text-medium"><span className="font-medium">Time:</span> {timeSlot}</p>
                  </div>
                  <div>
                    <p className="text-welli-text-medium"><span className="font-medium">Name:</span> {name}</p>
                  </div>
                  <div>
                    <p className="text-welli-text-medium"><span className="font-medium">Phone:</span> {phone}</p>
                  </div>
                </div>
              </div>
              <Link to="/">
                <Button className="bg-welli-dark-green hover:bg-welli-green text-white">
                  Return to Home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeTrialBookingPage;
