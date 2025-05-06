
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

const MapView = () => {
  return (
    <Card className="h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Route Map</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Navigation className="h-4 w-4" />
          <span>Optimize Route</span>
        </Button>
      </CardHeader>
      
      <CardContent className="relative h-[calc(100%-60px)]">
        {/* Map placeholder */}
        <div className="absolute inset-0 bg-gray-100 rounded-md flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <MapPin className="h-8 w-8 text-welli-accent" />
            </div>
            <p className="text-sm text-welli-textSecondary">
              Map shows your optimized route for today's visits
            </p>
            <p className="text-xs mt-1 text-welli-textSecondary">
              (Map integration placeholder)
            </p>
          </div>
        </div>
        
        {/* Map pins for patients */}
        <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-sm">
          <p className="text-xs font-semibold">Today's Visits</p>
          <div className="mt-1 space-y-1">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-welli-accent"></div>
              <span className="text-xs">John Doe (9:00 AM)</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-welli-main"></div>
              <span className="text-xs">Jane Smith (11:30 AM)</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs">Robert Johnson (2:15 PM)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
