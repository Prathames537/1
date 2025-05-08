import React, { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ORGAN_TYPES = [
  'Kidney',
  'Liver',
  'Heart',
  'Lungs',
  'Pancreas',
];
const BLOOD_TYPES = [
  'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
];

const OrganRepositoryPage: React.FC = () => {
  const [organType, setOrganType] = useState('Kidney');
  const [bloodType, setBloodType] = useState('A+');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('organ_repository_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setRequests(data || []);
    setLoading(false);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation(null)
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('organ_repository_requests').insert([
      {
        organ_type: organType,
        blood_type: bloodType,
        description,
        location_lat: location?.lat,
        location_lng: location?.lng,
        status: 'requested',
        // user_id: (add user id if available)
      },
    ]);
    if (!error) {
      setDescription('');
      setOrganType('Kidney');
      setBloodType('A+');
      setLocation(null);
      fetchRequests();
    }
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">Emergency Organ Repository</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <select
            className="w-full border rounded p-2"
            value={organType}
            onChange={e => setOrganType(e.target.value)}
          >
            {ORGAN_TYPES.map(ot => (
              <option key={ot} value={ot}>{ot}</option>
            ))}
          </select>
          <select
            className="w-full border rounded p-2"
            value={bloodType}
            onChange={e => setBloodType(e.target.value)}
          >
            {BLOOD_TYPES.map(bt => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Additional details (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
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
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Requesting...' : 'Request Organ'}
          </button>
        </form>
        <h2 className="text-xl font-semibold mb-2">Organ Requests</h2>
        <ul className="space-y-2">
          {requests.map((req) => (
            <li key={req.id} className="border rounded p-2">
              <div><b>Organ Type:</b> {req.organ_type}</div>
              <div><b>Blood Type:</b> {req.blood_type}</div>
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

export default OrganRepositoryPage; 