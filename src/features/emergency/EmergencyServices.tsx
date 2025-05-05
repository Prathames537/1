import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heart, Droplet, AlertTriangle } from 'lucide-react';

export const EmergencyServices: React.FC = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const handleEmergencyRequest = async () => {
    try {
      // Get user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setIsEmergencyActive(true);
          // Here you would typically make an API call to alert emergency services
          alertEmergencyServices(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } catch (error) {
      console.error('Error in emergency request:', error);
    }
  };

  const alertEmergencyServices = async (location: any) => {
    // This would be connected to your backend service
    // to alert nearby hospitals, ambulances, and emergency responders
    console.log('Alerting emergency services at:', location);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Emergency Services</h2>
      
      {/* Emergency Help Section */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Emergency Help</h3>
        <Button 
          onClick={handleEmergencyRequest}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <AlertTriangle className="mr-2" />
          Request Emergency Help
        </Button>
        
        {isEmergencyActive && (
          <Alert className="mt-4">
            <AlertTitle>Emergency Services Alerted</AlertTitle>
            <AlertDescription>
              Help is on the way. Stay calm and follow the instructions provided by emergency responders.
            </AlertDescription>
          </Alert>
        )}
      </Card>

      {/* Blood Bank Section */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Emergency Blood Bank</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Blood Group</Label>
            <select className="w-full p-2 border rounded">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <Label>Units Required</Label>
            <Input type="number" min="1" max="10" />
          </div>
        </div>
        <Button className="mt-4 w-full">
          <Droplet className="mr-2" />
          Request Blood
        </Button>
      </Card>

      {/* Organ Repository Section */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Organ Repository</h3>
        <div className="space-y-4">
          <div>
            <Label>Organ Type</Label>
            <select className="w-full p-2 border rounded">
              <option value="kidney">Kidney</option>
              <option value="liver">Liver</option>
              <option value="heart">Heart</option>
              <option value="lungs">Lungs</option>
              <option value="pancreas">Pancreas</option>
            </select>
          </div>
          <div>
            <Label>Blood Type Compatibility</Label>
            <select className="w-full p-2 border rounded">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <Button className="w-full">
            <Heart className="mr-2" />
            Search Available Organs
          </Button>
        </div>
      </Card>
    </div>
  );
}; 