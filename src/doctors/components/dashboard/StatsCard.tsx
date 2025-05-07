
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive: boolean;
  };
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
}) => {
  return (
    <div className="stats-card">
      <div className="flex items-center justify-between">
        <p className="text-welli-gray-600 font-medium">{title}</p>
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-welli-light-green text-welli-accent-green">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-semibold text-welli-gray-800">{value}</h3>
        {change && (
          <p className={`text-xs flex items-center mt-1 ${change.positive ? 'text-welli-success' : 'text-welli-alert'}`}>
            <span className="mr-1">{change.positive ? '↑' : '↓'}</span>
            <span>{change.value} from last week</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
