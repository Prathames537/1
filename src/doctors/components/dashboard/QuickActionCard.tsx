
import React from 'react';

interface QuickActionCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <div className="action-card" onClick={onClick}>
      <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center mb-3 text-welli-accent-green">
        {icon}
      </div>
      <h4 className="font-medium text-welli-gray-800">{title}</h4>
    </div>
  );
};

export default QuickActionCard;
