import { useState } from "react";
import { Calendar, Clock, Search, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { consultations } from '../lib/mockData';

interface Consultation {
  id: string;
  patientName: string;
  patientImage?: string;
  date: string;
  time: string;
  status: "completed" | "scheduled" | "cancelled";
  type: "follow-up" | "new" | "emergency";
  symptoms: string[];
  diagnosis: string;
  prescription?: {
    medicines: {
      name: string;
      dosage: string;
      duration: string;
    }[];
    notes: string;
  };
  notes: string;
}

export default function Consultations() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConsultations = consultations.filter(consultation =>
    consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Consultations</h1>
          <p className="text-muted-foreground">Manage patient consultations and prescriptions</p>
        </div>
        <Button>
          <Stethoscope className="mr-2 h-4 w-4" />
          New Consultation
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search consultations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConsultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={consultation.patientImage} />
                        <AvatarFallback>{consultation.patientName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{consultation.patientName}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {consultation.date}
                            <Clock className="h-3 w-3" />
                            {consultation.time}
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={
                      consultation.status === "completed" ? "default" :
                      consultation.status === "scheduled" ? "secondary" :
                      "destructive"
                    }>
                      {consultation.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Symptoms</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {consultation.symptoms.map((symptom, index) => (
                          <Badge key={index} variant="outline">{symptom}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium">Diagnosis</h4>
                      <p className="text-sm text-muted-foreground">{consultation.diagnosis}</p>
                    </div>

                    {consultation.prescription && (
                      <div>
                        <h4 className="font-medium">Prescription</h4>
                        <ScrollArea className="h-[100px] rounded-md border p-2">
                          <div className="space-y-2">
                            {consultation.prescription.medicines.map((medicine, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{medicine.name}</span>
                                <span className="text-muted-foreground">
                                  {medicine.dosage} - {medicine.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium">Notes</h4>
                      <p className="text-sm text-muted-foreground">{consultation.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
