import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Loader2 } from "lucide-react";

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello! I'm your Welli Assistant AI. I can help you with:\n\n• Patient information\n• Visit checklists\n• Navigation\n• Prior instructions\n• General support\n\nHow can I assist you today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const LOCAL_AI_URL = "http://localhost:8000";
const ASSISTANT_SYSTEM_PROMPT = `You are Welli's Assistant AI. Help field assistants with visit checklists, navigation, patient information, and support. Answer questions about the patient, estimate travel time if asked, and relay any prior instructions from the patient.`;

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Prepare chat history for context
    const maxHistory = 10;
    const historyMessages = [...messages, userMessage].slice(-maxHistory);
    const history = historyMessages.map(m => `${m.sender}: ${m.text}`).join("\n");
    const prompt = [`system: ${ASSISTANT_SYSTEM_PROMPT}`, history].join("\n") + "\nassistant:";

    try {
      const res = await fetch(`${LOCAL_AI_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: prompt, parameters: {} })
      });
      let reply = '';
      if (res.ok) {
        const data = await res.json();
        reply = data?.[0]?.generated_text?.trim() || 'Sorry, I could not answer that.';
      } else {
        reply = 'Sorry, I could not get a response from the AI.';
      }
      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'Error connecting to AI. Please try again later.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
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
            placeholder="Type your assistant question..." 
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
