import { useState } from 'react';
import { X, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          size="lg"
          className="rounded-full p-4 shadow-lg bg-welli-main hover:bg-welli-main/90"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="font-bold text-white text-lg">W</span>
          </div>
        </Button>
      )}

      {isOpen && (
        <Card className={`
          transition-all duration-300 ease-in-out shadow-xl
          ${isMinimized ? 'h-14' : 'h-[600px]'}
          w-[400px]
        `}>
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-welli-main flex items-center justify-center">
                <span className="font-bold text-white">W</span>
              </div>
              <div>
                <h3 className="font-medium text-sm">Welli Assistant</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                  Online
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={`transition-all duration-300 ${isMinimized ? 'hidden' : 'block'}`}>
            {/* AIChatbot component is removed as per the instructions */}
          </div>
        </Card>
      )}
    </div>
  );
};

export default FloatingChat; 