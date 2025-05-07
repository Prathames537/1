import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, AlertTriangle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export interface VisitDetailsPageProps {
  visit: any;
  userType: 'assistant' | 'doctor';
  backPath: string;
}

const VisitDetailsPage = ({ visit, backPath }: VisitDetailsPageProps) => {
  const navigate = useNavigate();
  if (!visit) {
    return <div className="p-8 text-center text-red-500">Visit not found.</div>;
  }

  // Parameterize fields for both data shapes
  const patient = visit.patientData || visit;
  const visitData = visit.visitData || visit;
  const vitalSigns = visit.vitalSigns || visit.vitals || [];
  const pastVisits = visit.pastVisits || [];
  const status = visitData.status || visit.status;
  const isUrgent = visitData.isUrgent || visit.isUrgent;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Button onClick={() => navigate(backPath)} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{patient.name || patient.patientName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-welli-textSecondary">Visit #{visitData.id}</span>
              <span>•</span>
              <Badge variant={isUrgent ? 'destructive' : 'outline'}>
                {isUrgent ? 'Urgent' : visitData.type || visit.type}
              </Badge>
              <Badge className={getStatusColor(status)}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Parameterize actions if needed */}
            <Button>Start Visit</Button>
            <Button variant="outline">Complete Visit</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    <p className="font-medium">{patient.address}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Required Equipment</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {(visitData.requiredEquipment || []).map((item: string, index: number) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
                <h3 className="font-medium mt-4 mb-2">Special Notes</h3>
                <p className="text-sm bg-welli-background p-3 rounded-md">
                  {visitData.notes || visit.notes}
                </p>
              </div>
            </div>
            <Separator className="my-6" />
            <div>
              <h3 className="font-medium mb-3">Service Protocol</h3>
              {/* Add protocol steps if available */}
            </div>
          </CardContent>
        </Card>
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
                  <span className="text-sm font-medium">{patient.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gender:</span>
                  <span className="text-sm font-medium">{patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Contact:</span>
                  <span className="text-sm font-medium">{patient.contact || patient.phone}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-welli-textSecondary">Insurance</p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Provider:</span>
                  <span className="text-sm font-medium">{patient.insuranceProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">ID:</span>
                  <span className="text-sm font-medium">{patient.insuranceId || patient.insuranceNumber}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-welli-textSecondary">Allergies</p>
                {patient.allergies && patient.allergies.length > 0 && (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {(patient.allergies || []).map((allergy: string, index: number) => (
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
                {(patient.medicalHistory || []).map((condition: string, index: number) => (
                  <div key={index} className="text-sm">{condition}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
                {(vitalSigns || []).map((vital: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p className="text-sm text-welli-textSecondary">{vital.name}</p>
                      <p className="text-lg font-medium mt-1">{vital.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Add test results if available */}
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
                  {(pastVisits || []).map((visit: any, index: number) => (
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
                        <span>Base pay ({visitData.type})</span>
                        <span className="font-medium">${visitData.paymentAmount || 0}</span>
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
                        <span>${(visitData.paymentAmount || 0) + 35}</span>
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
                          <span className="font-medium">{patient.insuranceProvider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Policy Number</span>
                          <span className="font-medium">{patient.insuranceId || patient.insuranceNumber}</span>
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

export default VisitDetailsPage; 