
import { formatDistanceToNow } from "date-fns";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.role === "assistant";
  const timeAgo = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });

  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div
        className={`max-w-[80%] px-4 py-2 rounded-lg ${
          isBot
            ? "bg-white border border-gray-200 text-welli-text-dark"
            : "bg-welli-dark-green text-white"
        }`}
      >
        <div className="text-sm">{message.content}</div>
        <div className={`text-xs mt-1 ${isBot ? "text-gray-500" : "text-welli-pale-green"}`}>
          {timeAgo}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
