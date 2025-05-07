import { useState } from 'react';
import { Calendar, Clock, User, MapPin, Plus, Search, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Visit {
  id: string;
  patientName: string;
  patientImage: string;
  address: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'initial' | 'follow-up' | 'emergency';
  assistant: string;
}

const visits: Visit[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    date: '2024-03-15',
    time: '10:30 AM',
    status: 'scheduled',
    type: 'follow-up',
    assistant: 'Dr. Emily Chen',
  },
  {
    id: '2',
    patientName: 'Robert Chen',
    patientImage: 'https://randomuser.me/api/portraits/men/76.jpg',
    address: '456 Park Ave, Suite 2, New York, NY 10022',
    date: '2024-03-15',
    time: '2:00 PM',
    status: 'in-progress',
    type: 'initial',
    assistant: 'Dr. Michael Brown',
  },
  {
    id: '3',
    patientName: 'Emma Garcia',
    patientImage: 'https://randomuser.me/api/portraits/women/63.jpg',
    address: '789 Broadway, New York, NY 10003',
    date: '2024-03-16',
    time: '11:00 AM',
    status: 'scheduled',
    type: 'emergency',
    assistant: 'Dr. Sarah Wilson',
  },
];

const VisitCard = ({ visit }: { visit: Visit }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: Visit['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="welli-card hover:shadow-lg transition cursor-pointer"
         onClick={() => navigate(`/assistant-visits/${visit.id}`)}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={visit.patientImage} alt={visit.patientName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-welli-gray-800">{visit.patientName}</h3>
            <Badge className={getStatusColor(visit.status)}>{visit.status}</Badge>
          </div>
          <div className="flex items-center gap-3 text-sm text-welli-gray-600 mt-1">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{visit.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{visit.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{visit.assistant}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-welli-gray-500 mt-1">
            <MapPin size={14} />
            <span>{visit.address}</span>
          </div>
        </div>
        <ChevronRight className="text-welli-gray-400" />
      </div>
    </div>
  );
};

const AssistantVisits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredVisits = visits.filter(visit =>
    visit.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-welli-gray-800">Assistant Visits</h1>
          <p className="text-welli-gray-600">Manage and track assistant visits</p>
        </div>
        <Button className="bg-welli-green hover:bg-welli-dark-green text-white">
          <Plus size={16} className="mr-2" /> Schedule Visit
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-gray-500" size={18} />
          <Input 
            placeholder="Search visits..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="max-w-[200px]"
        />
        <Button variant="outline" className="gap-2">
          <Filter size={16} /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredVisits.length > 0 ? (
            filteredVisits.map(visit => (
              <VisitCard key={visit.id} visit={visit} />
            ))
          ) : (
            <div className="welli-card">
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-welli-green mx-auto mb-4" />
                <h3 className="text-lg font-medium text-welli-gray-800 mb-2">No visits found</h3>
                <p className="text-welli-gray-600">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="welli-card">
            <h2 className="text-lg font-semibold text-welli-gray-800 mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-welli-gray-600">Total Visits</span>
                <span className="font-medium text-welli-gray-800">
                  {visits.filter(v => v.date === selectedDate).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-welli-gray-600">In Progress</span>
                <span className="font-medium text-welli-gray-800">
                  {visits.filter(v => v.status === 'in-progress').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-welli-gray-600">Completed</span>
                <span className="font-medium text-welli-gray-800">
                  {visits.filter(v => v.status === 'completed').length}
                </span>
              </div>
            </div>
          </div>
          <div className="welli-card">
            <h2 className="text-lg font-semibold text-welli-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar size={16} /> View Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <User size={16} /> Manage Assistants
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <MapPin size={16} /> View Coverage Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantVisits;
