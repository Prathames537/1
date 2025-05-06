import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

// Initial bot messages
const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello! I'm your AI healthcare assistant. I can help you with:\n\n• Scheduling appointments\n• Finding healthcare providers\n• Answering medical questions\n• Managing prescriptions\n• Providing health tips\n\nHow can I assist you today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

// Enhanced responses with more context and helpful information
const botResponses: Record<string, string> = {
  "appointment": "I can help you schedule an appointment. Please provide:\n1. Preferred date and time\n2. Type of healthcare provider needed\n3. Any specific requirements or concerns\n\nI'll find the best available options for you.",
  "provider": "I can help you find healthcare providers based on:\n• Your location\n• Specialization needed\n• Insurance coverage\n• Availability\n\nWould you like to search for a specific type of provider?",
  "prescription": "For prescription management, I can:\n• Help you refill medications\n• Set up medication reminders\n• Track your prescriptions\n• Connect you with pharmacies\n\nWhat would you like to do with your prescriptions?",
  "emergency": "For medical emergencies:\n1. Call emergency services immediately\n2. Stay with the patient\n3. Provide first aid if trained\n4. Follow emergency protocols\n\nWould you like me to connect you with emergency services?",
  "insurance": "I can help you with insurance-related queries about:\n• Coverage details\n• Claims processing\n• Network providers\n• Policy information\n\nWhat specific insurance information do you need?",
  "records": "For health records, I can help you:\n• Access your medical history\n• Share records with providers\n• Update personal information\n• Track health metrics\n\nWhat would you like to do with your health records?",
  "billing": "For billing and payments:\n• View outstanding bills\n• Make payments\n• Set up payment plans\n• Review insurance claims\n\nWhat billing assistance do you need?",
  "general": "I can provide general health information about:\n• Common conditions\n• Preventive care\n• Wellness tips\n• Health resources\n\nWhat health information are you looking for?",
};

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const userMessageLower = inputText.toLowerCase();
      let botResponse = "I'm here to help with your healthcare needs. You can ask me about:\n\n• Appointments\n• Finding providers\n• Prescriptions\n• Insurance\n• Health records\n• Billing\n• General health information\n\nWhat would you like to know more about?";
      
      // Enhanced keyword matching
      if (userMessageLower.includes("appointment") || userMessageLower.includes("schedule") || userMessageLower.includes("book")) {
        botResponse = botResponses.appointment;
      } else if (userMessageLower.includes("provider") || userMessageLower.includes("doctor") || userMessageLower.includes("specialist")) {
        botResponse = botResponses.provider;
      } else if (userMessageLower.includes("prescription") || userMessageLower.includes("medication") || userMessageLower.includes("drug")) {
        botResponse = botResponses.prescription;
      } else if (userMessageLower.includes("emergency") || userMessageLower.includes("urgent") || userMessageLower.includes("911")) {
        botResponse = botResponses.emergency;
      } else if (userMessageLower.includes("insurance") || userMessageLower.includes("coverage") || userMessageLower.includes("claim")) {
        botResponse = botResponses.insurance;
      } else if (userMessageLower.includes("record") || userMessageLower.includes("history") || userMessageLower.includes("medical")) {
        botResponse = botResponses.records;
      } else if (userMessageLower.includes("bill") || userMessageLower.includes("payment") || userMessageLower.includes("cost")) {
        botResponse = botResponses.billing;
      } else if (userMessageLower.includes("health") || userMessageLower.includes("wellness") || userMessageLower.includes("care")) {
        botResponse = botResponses.general;
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(600px-57px)]">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-welli-main text-white' 
                  : 'bg-gray-100'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-welli-main flex items-center justify-center text-white mb-2">
                  <Bot className="h-3 w-3" />
                </div>
              )}
              <div className="whitespace-pre-line">
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' 
                    ? 'text-white/70' 
                    : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-welli-main flex items-center justify-center text-white">
                <Bot className="h-3 w-3" />
              </div>
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input 
            placeholder="Type your healthcare question..." 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={isTyping || !inputText.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
