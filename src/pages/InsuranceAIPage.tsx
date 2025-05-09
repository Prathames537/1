import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBotDialog from "@/components/ChatBot/ChatBotDialog";
import { useState } from "react";

const InsuranceAIPage = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6 text-welli-text-dark">Insurance AI Bot</h1>
          <ChatBotDialog open={open} onOpenChange={setOpen} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InsuranceAIPage; 