import { useState } from "react";
import { FileText, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Report {
  id: string;
  patientName: string;
  patientImage?: string;
  date: string;
  type: "blood_test" | "xray" | "mri" | "ultrasound" | "ecg";
  status: "completed" | "pending" | "cancelled";
  results: {
    name: string;
    value: string;
    unit: string;
    normalRange: string;
  }[];
  notes: string;
  fileUrl?: string;
}

const reports: Report[] = [
  {
    id: "1",
    patientName: "John Doe",
    patientImage: "https://github.com/shadcn.png",
    date: "2024-03-20",
    type: "blood_test",
    status: "completed",
    results: [
      {
        name: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        normalRange: "13.5 - 17.5"
      },
      {
        name: "WBC Count",
        value: "7.5",
        unit: "x10^9/L",
        normalRange: "4.5 - 11.0"
      },
      {
        name: "Platelet Count",
        value: "250",
        unit: "x10^9/L",
        normalRange: "150 - 450"
      }
    ],
    notes: "All parameters are within normal range. No abnormalities detected.",
    fileUrl: "/reports/blood_test_1.pdf"
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: "2024-03-21",
    type: "xray",
    status: "completed",
    results: [
      {
        name: "Chest X-ray",
        value: "Normal",
        unit: "",
        normalRange: "Normal"
      }
    ],
    notes: "No signs of pneumonia or other abnormalities. Clear lung fields.",
    fileUrl: "/reports/xray_1.pdf"
  }
];

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || report.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Medical Reports</h1>
          <p className="text-muted-foreground">View and manage patient medical reports</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="blood_test">Blood Tests</SelectItem>
            <SelectItem value="xray">X-ray</SelectItem>
            <SelectItem value="mri">MRI</SelectItem>
            <SelectItem value="ultrasound">Ultrasound</SelectItem>
            <SelectItem value="ecg">ECG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={report.patientImage} />
                    <AvatarFallback>{report.patientName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{report.patientName}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        {report.type.replace("_", " ").toUpperCase()}
                      </div>
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={
                  report.status === "completed" ? "default" :
                  report.status === "pending" ? "secondary" :
                  "destructive"
                }>
                  {report.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Results</h4>
                  <ScrollArea className="h-[200px] rounded-md border p-2">
                    <div className="space-y-2">
                      {report.results.map((result, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{result.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.value} {result.unit}</span>
                            <span className="text-muted-foreground">({result.normalRange})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div>
                  <h4 className="font-medium">Notes</h4>
                  <p className="text-sm text-muted-foreground">{report.notes}</p>
                </div>

                {report.fileUrl && (
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

