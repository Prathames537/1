import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Search, Filter, CheckSquare, Clock, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VisitCard, { VisitCardProps } from '../components/VisitCard';

export interface VisitsPageProps {
  visits: VisitCardProps[];
  userType: 'assistant' | 'doctor';
  navPrefix: string;
  showImage?: boolean;
  showAge?: boolean;
  showAssistant?: boolean;
  title?: string;
}

const VisitsPage = ({
  visits,
  navPrefix,
  showImage = false,
  showAge = true,
  showAssistant = false,
  title = 'Visits',
}: VisitsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate] = useState(new Date());

  // Format date
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Filtered visits by search
  const filteredVisits = visits.filter((visit) =>
    searchTerm === '' ||
    visit.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (visit.visitType && visit.visitType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
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
        <Tabs defaultValue="all">
          <div className="px-4 border-b">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-1">
                <CheckSquare className="h-4 w-4" />
                <span>Upcoming</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span>Completed</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {filteredVisits.length > 0 ? (
                filteredVisits.map((visit) => (
                  <VisitCard
                    key={visit.onClickPath}
                    {...visit}
                    onClickPath={`/${navPrefix}/visits/${visit.onClickPath.split('/').pop()}`}
                    showImage={showImage}
                    showAge={showAge}
                    showAssistant={showAssistant}
                  />
                ))
              ) : (
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-10 w-10 text-welli-textSecondary mb-2" />
                  <p className="text-welli-textSecondary">No visits found</p>
                </CardContent>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default VisitsPage; 