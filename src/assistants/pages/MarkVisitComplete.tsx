import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  CheckCircle, 
  Camera, 
  Upload, 
  Trash2,
  Clipboard,
  Thermometer,
  Heart,
  Stethoscope
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const MarkVisitComplete = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  // Vitals state
  const [temperature, setTemperature] = useState('37.2');
  const [bloodPressure, setBloodPressure] = useState('120/80');
  const [pulseRate, setPulseRate] = useState('72');
  const [checkedItems, setCheckedItems] = useState([
    { id: 'blood-drawn', label: 'Blood Sample Collected', checked: true },
    { id: 'prescription', label: 'Reviewed Medications', checked: true },
    { id: 'instructions', label: 'Provided Instructions', checked: true },
    { id: 'family', label: 'Spoke with Family Members', checked: false }
  ]);

  const handleToggleChecked = (id: string) => {
    setCheckedItems(
      checkedItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleUploadPhoto = () => {
    setPhotoUploaded(true);
    toast({
      title: "Photo Uploaded",
      description: "The visit documentation photo has been added",
      variant: "default",
    });
  };

  const handleCompleteVisit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Visit Marked Complete",
        description: "The visit has been marked as complete.",
        variant: "default",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Mark Visit Complete</h1>
      </div>

      {/* Patient details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Patient Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Rajesh Kumar</p>
              <p className="text-sm text-welli-textSecondary">65 years • Male</p>
              <p className="text-sm text-welli-textSecondary mt-1">42 Shyam Nagar, Delhi NCR</p>
            </div>
            <div>
              <p className="font-medium">Visit Details</p>
              <p className="text-sm text-welli-textSecondary">Blood Test • 9:00 AM</p>
              <p className="text-sm text-welli-textSecondary mt-1">Doctor: Dr. Sharma</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vitals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Clipboard className="h-4 w-4" />
            Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label 
                htmlFor="temperature"
                className="flex items-center gap-1 mb-2"
              >
                <Thermometer className="h-4 w-4" />
                Temperature
              </Label>
              <div className="flex items-center">
                <Input 
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="mr-2"
                />
                <span className="text-welli-textSecondary">°C</span>
              </div>
            </div>
            
            <div>
              <Label 
                htmlFor="bloodPressure"
                className="flex items-center gap-1 mb-2"  
              >
                <Stethoscope className="h-4 w-4" />
                Blood Pressure
              </Label>
              <Input 
                id="bloodPressure"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
              />
            </div>
            
            <div>
              <Label 
                htmlFor="pulseRate"
                className="flex items-center gap-1 mb-2"
              >
                <Heart className="h-4 w-4" />
                Pulse Rate
              </Label>
              <div className="flex items-center">
                <Input 
                  id="pulseRate"
                  value={pulseRate}
                  onChange={(e) => setPulseRate(e.target.value)}
                  className="mr-2"
                />
                <span className="text-welli-textSecondary">bpm</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Visit Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checkedItems.map(item => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox 
                  id={item.id}
                  checked={item.checked}
                  onCheckedChange={() => handleToggleChecked(item.id)}
                />
                <Label htmlFor={item.id} className="cursor-pointer">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes" className="mb-2 block">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter visit notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          <div>
            <Label className="mb-2 block">Photos</Label>
            {photoUploaded ? (
              <div className="relative mt-2 border rounded-md overflow-hidden aspect-video max-w-xs flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p>Photo uploaded successfully</p>
                </div>
                <Button 
                  size="icon" 
                  variant="outline"
                  className="absolute top-2 right-2 bg-white"
                  onClick={() => setPhotoUploaded(false)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-2">
                <Button 
                  onClick={handleUploadPhoto}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Take Photo
                </Button>
                <Button variant="outline" onClick={handleUploadPhoto}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-welli-textSecondary">
            Ensure all documents are complete and accurate before submission.
          </p>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Save as Draft
        </Button>
        <Button 
          onClick={handleCompleteVisit} 
          disabled={isSubmitting}
          className="bg-welli-accent hover:bg-welli-accent/90"
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Visit
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MarkVisitComplete;
