
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, MapPin, ClipboardList, 
  Upload, Check, AlertTriangle, User, Heart, FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock data - would normally come from an API
const patientData = {
  id: '1',
  name: 'John Doe',
  age: 65,
  gender: 'Male',
  contact: '+1 (555) 123-4567',
  address: '123 Main Street, Apt 4B, New York, NY 10001',
  insuranceProvider: 'Medicare',
  insuranceId: 'MED12345678',
  allergies: ['Penicillin', 'Latex'],
  medicalHistory: ['Hypertension', 'Type 2 Diabetes', 'COPD'],
};

const visitData = {
  id: '1',
  time: '9:00 AM - 9:45 AM',
  date: 'May 15, 2025',
  type: 'Blood Test',
  requiredEquipment: ['Blood collection kit', 'Gloves', 'Alcohol swabs'],
  notes: 'Patient has difficulty with blood draws. Please use butterfly needle and draw from left arm only.',
  isUrgent: true,
  status: 'upcoming',
  paymentAmount: 85,
};

const vitalSigns = [
  { name: 'Blood Pressure', value: '130/85 mmHg' },
  { name: 'Heart Rate', value: '78 bpm' },
  { name: 'Respiratory Rate', value: '16 breaths/min' },
  { name: 'Temperature', value: '98.6°F' },
  { name: 'Oxygen Saturation', value: '96%' },
];

const pastVisits = [
  { 
    date: 'April 30, 2025', 
    type: 'Vital Signs Check',
    notes: 'Patient reported feeling well. All vitals within normal range.'  
  },
  { 
    date: 'March 15, 2025', 
    type: 'Blood Test',
    notes: 'Difficult blood draw, used butterfly needle. Results sent to Dr. Smith.'  
  },
  { 
    date: 'February 5, 2025', 
    type: 'X-Ray (Chest)',
    notes: 'Patient reported some discomfort while breathing deeply. Images clear.'  
  },
];

const VisitDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [visitStatus, setVisitStatus] = useState<'upcoming' | 'in-progress' | 'completed'>('upcoming');
  const [uploading, setUploading] = useState(false);

  const handleStartVisit = () => {
    setVisitStatus('in-progress');
    toast({
      title: "Visit started",
      description: "You've started the visit with John Doe",
    });
  };

  const handleCompleteVisit = () => {
    setVisitStatus('completed');
    toast({
      title: "Visit completed",
      description: "Visit has been marked as completed. Thank you!",
    });
  };

  const handleUploadResults = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Results uploaded",
        description: "Test results have been successfully uploaded",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Visits
        </Button>
        
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{patientData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-welli-textSecondary">Visit #{visitData.id}</span>
              <span>•</span>
              <Badge variant={visitData.isUrgent ? "destructive" : "outline"}>
                {visitData.isUrgent ? 'Urgent' : visitData.type}
              </Badge>
              <Badge 
                className={
                  visitStatus === 'completed' ? 'bg-green-100 text-green-800' :
                  visitStatus === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }
              >
                {visitStatus.charAt(0).toUpperCase() + visitStatus.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            {visitStatus === 'upcoming' && (
              <Button onClick={handleStartVisit}>
                Start Visit
              </Button>
            )}
            {visitStatus === 'in-progress' && (
              <Button onClick={handleCompleteVisit} variant="default">
                <Check className="h-4 w-4 mr-2" />
                Complete Visit
              </Button>
            )}
            {visitStatus === 'completed' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Results
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Test Results</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-welli-textSecondary">
                        Drag and drop files here, or click to select files
                      </p>
                      <p className="mt-1 text-xs text-welli-textSecondary">
                        Supported formats: PDF, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                    <div className="mt-4">
                      {uploading ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>bloodtest-results.pdf</span>
                            <span>70%</span>
                          </div>
                          <Progress value={70} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">Cancel</Button>
                    <Button onClick={handleUploadResults} disabled={uploading}>
                      {uploading ? 'Uploading...' : 'Upload Files'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      {/* Visit and Patient Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visit Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Visit Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-welli-textSecondary mt-0.5" />
                  <div>
                    <p className="text-sm text-welli-textSecondary">Date</p>
                    <p className="font-medium">{visitData.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-welli-textSecondary mt-0.5" />
                  <div>
                    <p className="text-sm text-welli-textSecondary">Time</p>
                    <p className="font-medium">{visitData.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-welli-textSecondary mt-0.5" />
                  <div>
                    <p className="text-sm text-welli-textSecondary">Location</p>
                    <p className="font-medium">{patientData.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Required Equipment</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {visitData.requiredEquipment.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
                
                <h3 className="font-medium mt-4 mb-2">Special Notes</h3>
                <p className="text-sm bg-welli-background p-3 rounded-md">
                  {visitData.notes}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="font-medium mb-3">Service Protocol</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-welli-background p-3 rounded-md">
                  <p className="font-medium">1. Patient Identification</p>
                  <p className="mt-1">Verify patient identity using two identifiers (name and date of birth).</p>
                </div>
                <div className="bg-welli-background p-3 rounded-md">
                  <p className="font-medium">2. Preparation</p>
                  <p className="mt-1">Explain procedure to patient and ensure they're comfortable.</p>
                </div>
                <div className="bg-welli-background p-3 rounded-md">
                  <p className="font-medium">3. Blood Collection</p>
                  <p className="mt-1">Use butterfly needle and draw from left arm as per patient preference.</p>
                </div>
                <div className="bg-welli-background p-3 rounded-md">
                  <p className="font-medium">4. Post-Procedure</p>
                  <p className="mt-1">Apply pressure to site for 2 minutes, apply bandage, and verify patient comfort.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Patient Information</span>
              <User className="h-5 w-5 text-welli-accent" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-welli-textSecondary">Basic Info</p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Age:</span>
                  <span className="text-sm font-medium">{patientData.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gender:</span>
                  <span className="text-sm font-medium">{patientData.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Contact:</span>
                  <span className="text-sm font-medium">{patientData.contact}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-welli-textSecondary">Insurance</p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Provider:</span>
                  <span className="text-sm font-medium">{patientData.insuranceProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">ID:</span>
                  <span className="text-sm font-medium">{patientData.insuranceId}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-welli-textSecondary">Allergies</p>
                {patientData.allergies.length > 0 && (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {patientData.allergies.map((allergy, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-welli-textSecondary" />
                <p className="text-sm text-welli-textSecondary">Medical History</p>
              </div>
              <div className="mt-2 space-y-1">
                {patientData.medicalHistory.map((condition, index) => (
                  <div key={index} className="text-sm">{condition}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for additional data */}
      <Tabs defaultValue="medical-data">
        <TabsList>
          <TabsTrigger value="medical-data">Medical Data</TabsTrigger>
          <TabsTrigger value="past-visits">Past Visits</TabsTrigger>
          <TabsTrigger value="payment">Payment Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="medical-data" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {vitalSigns.map((vital, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p className="text-sm text-welli-textSecondary">{vital.name}</p>
                      <p className="text-lg font-medium mt-1">{vital.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Recent Test Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-welli-textSecondary" />
                      <span>Blood Test Results</span>
                    </div>
                    <p className="text-sm text-welli-textSecondary mt-1">Uploaded April 30, 2025</p>
                    <Button size="sm" variant="outline" className="mt-2">View Report</Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-welli-textSecondary" />
                      <span>Chest X-Ray Report</span>
                    </div>
                    <p className="text-sm text-welli-textSecondary mt-1">Uploaded February 5, 2025</p>
                    <Button size="sm" variant="outline" className="mt-2">View Report</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past-visits" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visit History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastVisits.map((visit, index) => (
                    <TableRow key={index}>
                      <TableCell>{visit.date}</TableCell>
                      <TableCell>{visit.type}</TableCell>
                      <TableCell className="text-sm">{visit.notes}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Visit Payment</h3>
                  <Card className="bg-welli-background">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Base pay (Blood Test)</span>
                        <span className="font-medium">${visitData.paymentAmount}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-welli-textSecondary mb-2">
                        <span>Travel allowance</span>
                        <span>$15</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-welli-textSecondary mb-4">
                        <span>Urgency bonus</span>
                        <span>$20</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between items-center mt-2 font-semibold">
                        <span>Total</span>
                        <span>${visitData.paymentAmount + 35}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Insurance Coverage</h3>
                  <Card className="border-dashed">
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <span>Provider</span>
                          <span className="font-medium">{patientData.insuranceProvider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Policy Number</span>
                          <span className="font-medium">{patientData.insuranceId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coverage Type</span>
                          <span className="font-medium">Full Coverage</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-4 text-sm text-welli-textSecondary">
                    <p>
                      <strong>Note:</strong> Payment will be processed after visit completion 
                      and will be available in your earnings dashboard within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisitDetails;
