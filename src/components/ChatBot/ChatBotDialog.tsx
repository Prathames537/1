import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  content: "Hello! I'm your Welli Health Assistant. How can I help you today? You can ask me about scheduling appointments, ordering medicines, setting medication reminders, or any health concerns.",
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

    // Send to Ollama
    const OLLAMA_ENDPOINT = "http://localhost:11434/api/chat";
    const newMessages = [...messages, userMessage];
    console.log("Sending message to Ollama", userMessage);
    try {
      const res = await fetch(OLLAMA_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      let reply = "";
      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const lines = decoder.decode(value).split("\n").filter(Boolean);
            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                reply += data.message?.content || "";
              } catch (e) {
                // Ignore malformed lines
              }
            }
          }
        }
      }
      const botResponse: Message = {
        id: Date.now().toString() + "-bot",
        role: "assistant",
        content: reply || "Sorry, I could not get a response from the AI.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
      if (isSpeakerOn) {
        speakText(botResponse.content);
      }
    } catch (err) {
      setIsLoading(false);
      setMessages((prev) => [...prev, {
        id: Date.now().toString() + "-error",
        role: "assistant",
        content: "Error connecting to AI. Please try again later.",
        timestamp: new Date(),
      }]);
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
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
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
