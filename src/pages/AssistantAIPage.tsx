import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBotDialog from "@/components/ChatBot/ChatBotDialog";
import { useState } from "react";

const AssistantAIPage = () => {
  const [open, setOpen] = useState(true);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6 text-welli-text-dark">Assistant AI Bot</h1>
          <ChatBotDialog open={open} onOpenChange={setOpen} />
          <div className="mt-8 flex gap-4">
            <button className="bg-welli-main text-white px-4 py-2 rounded" onClick={() => setDoctorOpen(true)}>
              Open Doctor AI
            </button>
            <button className="bg-welli-main text-white px-4 py-2 rounded" onClick={() => setPatientOpen(true)}>
              Open Patient AI
            </button>
          </div>
          <ChatBotDialog open={doctorOpen} onOpenChange={setDoctorOpen} />
          <ChatBotDialog open={patientOpen} onOpenChange={setPatientOpen} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AssistantAIPage; 