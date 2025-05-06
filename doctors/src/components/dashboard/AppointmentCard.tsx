
import React from 'react';
import { Video, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppointmentCardProps {
  patientName: string;
  time: string;
  type: 'video' | 'chat';
  reason: string;
  imageUrl: string;
  onClick?: () => void;
  hasPrescription?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  patientName,
  time,
  type,
  reason,
  imageUrl,
  onClick,
  hasPrescription = false,
}) => {
  // Add hover+underline/highlight to the left side (clickable area)
  return (
    <div
      className="welli-card flex items-center gap-4 group cursor-pointer border-2 border-transparent hover:border-welli-green/60 ring-0 hover:shadow-lg transition shadow-card"
      onClick={onClick}
      style={{ background: 'linear-gradient(90deg, #e6f9f0 1%, #fff 100%)' }}
      tabIndex={0}
      role="button"
      aria-label={`View patient profile for ${patientName}`}
    >
      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-welli-green bg-white group-hover:scale-105 group-hover:shadow-md transition">
        <img src={imageUrl} alt={patientName} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-welli-green group-hover:underline transition">{patientName}</h4>
          {hasPrescription && (
            <span title="Prescription available">
              <FileText size={18} className="text-welli-accent-green" />
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-welli-gray-600">
          <span>{time}</span>
          <span>•</span>
          <span className={`flex items-center gap-1 ${type === 'video' ? 'text-welli-green' : 'text-welli-accent-green'}`}>
            {type === 'video' ? <Video size={16} className="mr-0.5" /> : <MessageCircle size={16} className="mr-0.5" />}
            {type === 'video' ? 'Video consult' : 'Chat consult'}
          </span>
        </div>
        <p className="text-sm text-welli-gray-500 mt-1">{reason}</p>
      </div>
      <Button
        className={`bg-welli-green hover:bg-welli-accent-green text-white font-bold px-6 py-2 rounded-lg shadow-md border-2 border-welli-green transition-all outline-none focus:ring-2 focus:ring-welli-green`}
        tabIndex={-1}
        style={{ fontSize: 16, letterSpacing: 0.5, minWidth: 130 }}
      >
        {type === 'video' ? 'Join Video' : 'Open Chat'}
      </Button>
      {hasPrescription && (
        <Button
          variant="outline"
          size="sm"
          className="ml-2 border-welli-accent-green text-welli-green hover:bg-welli-accent-green/10"
          tabIndex={-1}
          title="View Prescriptions"
        >
          <FileText size={16} className="mr-2" /> Prescription
        </Button>
      )}
    </div>
  );
};

export default AppointmentCard;

