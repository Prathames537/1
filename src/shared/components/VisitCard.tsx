import { Clock, MapPin, ChevronRight, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export interface VisitCardProps {
  patientName: string;
  patientAge?: number;
  patientImage?: string;
  address: string;
  time: string;
  visitType: string;
  isUrgent?: boolean;
  status: string;
  onClickPath: string;
  assistantName?: string;
  showImage?: boolean;
  showAge?: boolean;
  showAssistant?: boolean;
}

const VisitCard = ({
  patientName,
  patientAge,
  patientImage,
  address,
  time,
  visitType,
  isUrgent,
  status,
  onClickPath,
  assistantName,
  showImage = false,
  showAge = true,
  showAssistant = false,
}: VisitCardProps) => {
  // Format status for display
  const getStatusColor = () => {
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-0">
        <Link to={onClickPath} className="block p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              {showImage && patientImage && (
                <img src={patientImage} alt={patientName} className="w-10 h-10 rounded-full object-cover" />
              )}
              <div>
                <h3 className="font-semibold text-lg">{patientName}</h3>
                {showAge && patientAge !== undefined && (
                  <p className="text-sm text-welli-textSecondary">{patientAge} years</p>
                )}
                {showAssistant && assistantName && (
                  <p className="text-xs text-welli-textSecondary flex items-center gap-1"><User className="h-3 w-3" /> {assistantName}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {isUrgent && <Badge variant="destructive">Urgent</Badge>}
              <Badge className={getStatusColor()}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
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
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VisitCard; 