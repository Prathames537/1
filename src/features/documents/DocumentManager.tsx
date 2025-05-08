import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Image, X } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
}

export const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // No-op fetchDocuments
  const fetchDocuments = async () => {
    setDocuments([]);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 1000);
  };

  const deleteDocument = async (id: string, url: string) => {
    setDocuments(docs => docs.filter(doc => doc.id !== id));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Medical Documents</h2>

      {/* Upload Section */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Upload Documents</h3>
        <div className="space-y-4">
          <div>
            <Label>Document Type</Label>
            <select className="w-full p-2 border rounded">
              <option value="blood-report">Blood Report</option>
              <option value="xray">X-Ray</option>
              <option value="mri">MRI Scan</option>
              <option value="prescription">Prescription</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label>Upload File</Label>
            <div className="mt-2">
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.dicom"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Documents List */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Your Documents</h3>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                {doc.type.includes('image') ? (
                  <Image className="h-6 w-6" />
                ) : (
                  <FileText className="h-6 w-6" />
                )}
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(doc.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(doc.url, '_blank')}
                >
                  View
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteDocument(doc.id, doc.url)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="text-center text-gray-500">No documents uploaded yet</p>
          )}
        </div>
      </Card>
    </div>
  );
}; 