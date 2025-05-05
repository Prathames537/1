import React from 'react';
import { DocumentManager } from '@/features/documents/DocumentManager';

const DocumentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <DocumentManager />
      </div>
    </div>
  );
};

export default DocumentsPage; 