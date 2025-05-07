
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, ChevronLeft, ChevronRight, Search, Filter, CheckSquare, Clock, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Visit } from '@/components/dashboard/VisitCard';

// Mock data
const upcomingVisits: Visit[] = [
  {
    id: '1',
    patientName: 'John Doe',
    patientAge: 65,
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    time: '9:00 AM',
    visitType: 'Blood Test',
    isUrgent: true,
    status: 'upcoming'
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    patientAge: 78,
    address: '456 Park Avenue, New York, NY 10022',
    time: '11:30 AM',
    visitType: 'X-Ray',
    status: 'upcoming'
  },
  {
    id: '3',
    patientName: 'Robert Johnson',
    patientAge: 72,
    address: '789 Broadway, New York, NY 10003',
    time: '2:15 PM',
    visitType: 'Vitals Check',
    status: 'upcoming'
  }
];

const completedVisits: Visit[] = [
  {
    id: '4',
    patientName: 'Mary Williams',
    patientAge: 60,
    address: '101 East Village, New York, NY 10009',
    time: '10:00 AM',
    visitType: 'Blood Test',
    status: 'completed'
  },
  {
    id: '5',
    patientName: 'David Brown',
    patientAge: 75,
    address: '222 West End Avenue, New York, NY 10023',
    time: '2:00 PM',
    visitType: 'Vitals Check',
    status: 'completed'
  }
];

const Visits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate] = useState(new Date());
  
  // Format date
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Scheduled Visits</h1>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-welli-textSecondary" />
          <Input
            placeholder="Search visits by patient name or type..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button>Add Visit</Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className="p-4 bg-welli-background flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Label>View:</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Visits" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Visits</SelectItem>
                <SelectItem value="urgent">Urgent Only</SelectItem>
                <SelectItem value="regular">Regular Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label>Sort by:</Label>
            <Select defaultValue="time">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Time (Earliest)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time">Time (Earliest)</SelectItem>
                <SelectItem value="patient">Patient Name</SelectItem>
                <SelectItem value="type">Visit Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="ml-auto flex items-center gap-1 text-sm text-welli-textSecondary">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>Urgent</span>
            </div>
            <span className="mx-1">•</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Completed</span>
            </div>
            <span className="mx-1">•</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Regular</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming">
          <div className="px-4 border-b">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="upcoming" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Upcoming</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-1">
                <CheckSquare className="h-4 w-4" />
                <span>Completed</span>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span>Cancelled</span>
              </TabsTrigger>
            </TabsList>
          </div>
  
          <TabsContent value="upcoming" className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Visit Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingVisits
                  .filter(visit => 
                    searchTerm === '' || 
                    visit.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    visit.visitType.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(visit => (
                    <TableRow key={visit.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{visit.patientName}</p>
                          <p className="text-xs text-welli-textSecondary">{visit.patientAge} years</p>
                        </div>
                      </TableCell>
                      <TableCell>{visit.time}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {visit.visitType}
                          {visit.isUrgent && (
                            <Badge variant="destructive" className="ml-1">Urgent</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{visit.address}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">
                          {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/visits/${visit.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            
            {upcomingVisits.length === 0 && (
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-10 w-10 text-welli-textSecondary mb-2" />
                <p className="text-welli-textSecondary">No upcoming visits</p>
              </CardContent>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Visit Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedVisits
                  .filter(visit => 
                    searchTerm === '' || 
                    visit.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    visit.visitType.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(visit => (
                    <TableRow key={visit.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{visit.patientName}</p>
                          <p className="text-xs text-welli-textSecondary">{visit.patientAge} years</p>
                        </div>
                      </TableCell>
                      <TableCell>{visit.time}</TableCell>
                      <TableCell>{visit.visitType}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{visit.address}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/visits/${visit.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="cancelled" className="m-0">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <AlertCircle className="h-10 w-10 text-welli-textSecondary mb-2" />
              <p className="text-welli-textSecondary">No cancelled visits</p>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Visits;
