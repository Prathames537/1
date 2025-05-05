import React from 'react';
import { EmergencyServices } from '@/features/emergency/EmergencyServices';

const EmergencyServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <EmergencyServices />
      </div>
    </div>
  );
};

export default EmergencyServicesPage; 