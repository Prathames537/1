
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface Visit {
  id: string;
  patientName: string;
  patientAge: number;
  address: string;
  time: string;
  visitType: string;
  isUrgent?: boolean;
  status: 'upcoming' | 'in-progress' | 'completed';
}

interface VisitCardProps {
  visit: Visit;
}

const VisitCard = ({ visit }: VisitCardProps) => {
  const { id, patientName, patientAge, address, time, visitType, isUrgent, status } = visit;

  // Format status for display
  const getStatusColor = () => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{patientName}</h3>
              <p className="text-sm text-welli-textSecondary">{patientAge} years</p>
            </div>
            <div className="flex gap-2">
              {isUrgent && (
                <Badge variant="destructive">Urgent</Badge>
              )}
              <Badge className={getStatusColor()}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-welli-textSecondary" />
              <span className="text-sm">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-welli-textSecondary" />
              <span className="text-sm truncate">{address}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline">{visitType}</Badge>
            <Button asChild variant="ghost" size="sm">
              <Link to={`/visits/${id}`} className="flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitCard;
