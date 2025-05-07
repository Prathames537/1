
import React from 'react';

interface AlertItemProps {
  title: string;
  message: string;
  time: string;
  priority: 'normal' | 'warning' | 'urgent';
}

const AlertItem: React.FC<AlertItemProps> = ({
  title,
  message,
  time,
  priority,
}) => {
  const priorityBadge = {
    normal: 'badge-green',
    warning: 'badge-warning',
    urgent: 'badge-alert',
  };

  return (
    <div className="border-b border-welli-gray-200 py-3 last:border-b-0">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-welli-gray-800">{title}</h4>
        <span className={`badge ${priorityBadge[priority]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>
      <p className="text-sm text-welli-gray-600 mt-1">{message}</p>
      <p className="text-xs text-welli-gray-500 mt-1">{time}</p>
    </div>
  );
};

export default AlertItem;
