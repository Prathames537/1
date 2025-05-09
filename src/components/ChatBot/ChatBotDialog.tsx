import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Volume2, VolumeX, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ChatMessage from "./ChatMessage";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type Alarm = {
  id: string;
  type: "medication" | "appointment" | "checkup" | "custom";
  title: string;
  description: string;
  time: Date;
  isActive: boolean;
  repeat?: "daily" | "weekly" | "none";
};

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "How can I help you?",
  timestamp: new Date(),
};

type ChatBotDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChatBotDialog = ({ open, onOpenChange }: ChatBotDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (open && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      alarms.forEach(alarm => {
        if (alarm.isActive) {
          const alarmTime = new Date(alarm.time);
          const timeDiff = Math.abs(now.getTime() - alarmTime.getTime());
          
          // Check if alarm is due (within 1 minute)
          if (timeDiff < 60000) {
            // Show notification
            toast.info(`${alarm.title}: ${alarm.description}`, {
              duration: 10000,
              action: {
                label: "Dismiss",
                onClick: () => {
                  if (alarm.repeat === "none") {
                    deleteAlarm(alarm.id);
                  }
                }
              }
            });

            // Speak the reminder if speaker is on
            if (isSpeakerOn) {
              speakText(alarm.description);
            }
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [alarms, isSpeakerOn]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    // Add a minimal system prompt
    const prompt = `You are a helpful health assistant.\nUser: ${userInput}`;

    try {
      const res = await fetch("/api/ai-chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt })
      });
      let reply = '';
      if (res.ok) {
        const data = await res.json();
        reply = data?.answer?.trim() || 'Sorry, I could not answer that.';
      } else {
        reply = 'Sorry, I could not get a response from the AI.';
      }
      const botResponse: Message = { id: Date.now().toString() + '-bot', role: 'assistant', content: reply, timestamp: new Date() };
      setMessages(prev => [...prev, botResponse]);
    } catch {
      setIsLoading(false);
      const errorMsg: Message = { id: Date.now().toString() + '-error', role: 'assistant', content: 'Error connecting to AI. Please try again later.', timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAlarm = (alarmId: string) => {
    setAlarms(prev => prev.filter(alarm => alarm.id !== alarmId));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Voice recording is not supported in your browser");
      return;
    }

    setIsRecording(true);
    toast.info("Listening...");

    // In a real implementation, connect to a speech-to-text service
    // For now, simulate recording with a timeout
    setTimeout(() => {
      stopRecording();
      const simulatedText = "I need to schedule an appointment";
      setUserInput(simulatedText);
      toast.success("Voice captured!");
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toast(isSpeakerOn ? "Audio responses turned off" : "Audio responses turned on");
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col" aria-describedby="welli-assistant-desc" data-ai-chatbot>
        <DialogTitle className="sr-only">Welli Health Assistant</DialogTitle>
        <DialogDescription id="welli-assistant-desc" className="sr-only">
          Chat with the Welli Health Assistant for help with appointments, medicines, reminders, and more.
        </DialogDescription>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Welli Health Assistant</h2>
          <Button variant="ghost" size="icon" onClick={() => { setMessages([INITIAL_MESSAGE]); toast.success("Conversation cleared"); }}>
            <Trash className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-400 italic">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center gap-2 p-4 border-t">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={isRecording ? "text-red-500" : ""}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSpeaker}
            className={!isSpeakerOn ? "text-gray-500" : ""}
          >
            {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          <Textarea
            ref={textAreaRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 min-h-[40px] max-h-[120px] resize-none"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSendMessage}
            disabled={!userInput.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBotDialog;
