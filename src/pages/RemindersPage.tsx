import React from 'react';
import { EnhancedReminderSystem } from '@/features/reminders/EnhancedReminderSystem';

const RemindersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <EnhancedReminderSystem />
      </div>
    </div>
  );
};

export default RemindersPage; 