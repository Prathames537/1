import React, { useState, useEffect } from 'react';
// import { supabase } from '@/lib/supabaseClient';

const EmergencyHelpPage: React.FC = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // No-op fetchRequests
  const fetchRequests = async () => {
    setRequests([]);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation(null)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setDescription('');
      setLocation(null);
      setLoading(false);
      fetchRequests();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">Emergency Help</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <textarea
            className="w-full border rounded p-2"
            placeholder="Describe your emergency..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleLocation}
          >
            {location ? 'Location Set' : 'Set Location'}
          </button>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Requesting...' : 'Request Emergency Help'}
          </button>
        </form>
        <h2 className="text-xl font-semibold mb-2">Your Emergency Requests</h2>
        <ul className="space-y-2">
          {requests.map((req) => (
            <li key={req.id} className="border rounded p-2">
              <div><b>Description:</b> {req.description}</div>
              <div><b>Location:</b> {req.location_lat}, {req.location_lng}</div>
              <div className="text-xs text-gray-500">{new Date(req.created_at).toLocaleString()}</div>
            </li>
          ))}
          {requests.length === 0 && <li className="text-gray-500">No requests yet.</li>}
        </ul>
      </div>
    </div>
  );
};

export default EmergencyHelpPage; 