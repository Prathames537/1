import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Navigation, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";

const StartNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [zoomLevel, setZoomLevel] = useState(13);
  
  const handleStartNavigation = () => {
    toast({
      title: "Navigation Started",
      description: "Turn-by-turn directions to Shyam Nagar have begun",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Start Navigation</h1>
      </div>

      {/* Current visit details */}
      <Card className="overflow-hidden border-l-4 border-l-welli-main">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-xl">Rajesh Kumar</h2>
              <p className="text-sm text-welli-textSecondary">65 years • Blood Test</p>
            </div>
            <Badge variant="destructive">Urgent</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-welli-accent mt-0.5" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-welli-textSecondary">42 Shyam Nagar, Delhi NCR, 110001</p>
                <Button variant="link" className="p-0 h-6" onClick={handleStartNavigation}>
                  Start Turn-by-Turn
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-welli-accent mt-0.5" />
              <div>
                <p className="font-medium">Appointment Time</p>
                <p className="text-sm text-welli-textSecondary">9:00 AM Today</p>
                <p className="text-xs text-red-500 font-medium">ETA: 15 minutes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Map View</span>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setZoomLevel(Math.max(10, zoomLevel - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 aspect-video relative">
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="h-12 w-12 text-welli-accent mx-auto mb-2" />
              <p>Interactive map would display here</p>
              <p className="text-sm text-welli-textSecondary mt-1">
                Showing route to: 42 Shyam Nagar, Delhi NCR
              </p>
            </div>
          </div>
          
          {/* Navigation instructions overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-welli-main text-white h-10 w-10 rounded-full flex items-center justify-center">
                  <ChevronRight className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Turn right onto MG Road</p>
                  <p className="text-sm text-welli-textSecondary">2.5 km</p>
                </div>
              </div>
              <Button onClick={handleStartNavigation}>
                Start
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation quick info */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-welli-textSecondary text-sm">Distance</p>
            <p className="text-xl font-bold">4.7 km</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-welli-textSecondary text-sm">ETA</p>
            <p className="text-xl font-bold">15 min</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-welli-textSecondary text-sm">Traffic</p>
            <p className="text-xl font-bold text-yellow-500">Medium</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
        <Button onClick={handleStartNavigation}>
          <Navigation className="h-4 w-4 mr-2" />
          Start Navigation
        </Button>
      </div>
    </div>
  );
};

export default StartNavigation;
