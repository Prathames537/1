import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatBotDialog from "./ChatBotDialog";

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              className={`rounded-full w-10 h-10 p-0 shadow-md transform transition-all duration-300 hover:scale-105 ${
                isOpen ? "bg-red-500 hover:bg-red-600" : "bg-welli-green hover:bg-welli-dark-green"
              }`}
              aria-label="Open health assistant"
            >
              <span className="text-white font-bold text-lg">W</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-welli-dark-green text-white">
            <p>Need Help?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ChatBotDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default ChatBotButton;
