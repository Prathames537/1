// Centralized mock data for the assistants app

// Earnings
export const earningsHistory = [
  { id: '1', date: 'May 15, 2025', patientName: 'John Doe', visitType: 'Blood Test', amount: 120, status: 'Paid' },
  { id: '2', date: 'May 15, 2025', patientName: 'Jane Smith', visitType: 'X-Ray', amount: 180, status: 'Paid' },
  { id: '3', date: 'May 14, 2025', patientName: 'Robert Johnson', visitType: 'Vitals Check', amount: 85, status: 'Paid' },
  { id: '4', date: 'May 13, 2025', patientName: 'Mary Williams', visitType: 'Blood Test', amount: 120, status: 'Paid' },
  { id: '5', date: 'May 12, 2025', patientName: 'David Brown', visitType: 'Vitals Check', amount: 85, status: 'Paid' },
];

export const withdrawalHistory = [
  { id: 'w1', date: 'May 10, 2025', amount: 500, method: 'Bank Transfer', status: 'Completed' },
  { id: 'w2', date: 'April 25, 2025', amount: 750, method: 'UPI', status: 'Completed' },
  { id: 'w3', date: 'April 10, 2025', amount: 600, method: 'Bank Transfer', status: 'Completed' },
];

// Visits
export const upcomingVisits = [
  { id: '1', patientName: 'John Doe', patientAge: 65, address: '123 Main Street, Apt 4B, New York, NY 10001', time: '9:00 AM', visitType: 'Blood Test', isUrgent: true, status: 'upcoming' },
  { id: '2', patientName: 'Jane Smith', patientAge: 78, address: '456 Park Avenue, New York, NY 10022', time: '11:30 AM', visitType: 'X-Ray', status: 'upcoming' },
  { id: '3', patientName: 'Robert Johnson', patientAge: 72, address: '789 Broadway, New York, NY 10003', time: '2:15 PM', visitType: 'Vitals Check', status: 'upcoming' },
];

export const completedVisits = [
  { id: '4', patientName: 'Mary Williams', patientAge: 60, address: '101 East Village, New York, NY 10009', time: '10:00 AM', visitType: 'Blood Test', status: 'completed' },
  { id: '5', patientName: 'David Brown', patientAge: 75, address: '222 West End Avenue, New York, NY 10023', time: '2:00 PM', visitType: 'Vitals Check', status: 'completed' },
];

// Visit details (for VisitDetails page)
export const visits = [
  {
    id: '1',
    patientData: {
      id: '1', name: 'John Doe', age: 65, gender: 'Male', contact: '+1 (555) 123-4567', address: '123 Main Street, Apt 4B, New York, NY 10001', insuranceProvider: 'Medicare', insuranceId: 'MED12345678', allergies: ['Penicillin', 'Latex'], medicalHistory: ['Hypertension', 'Type 2 Diabetes', 'COPD'],
    },
    visitData: {
      id: '1', time: '9:00 AM - 9:45 AM', date: 'May 15, 2025', type: 'Blood Test', requiredEquipment: ['Blood collection kit', 'Gloves', 'Alcohol swabs'], notes: 'Patient has difficulty with blood draws. Please use butterfly needle and draw from left arm only.', isUrgent: true, status: 'upcoming', paymentAmount: 85,
    },
    vitalSigns: [
      { name: 'Blood Pressure', value: '130/85 mmHg' },
      { name: 'Heart Rate', value: '78 bpm' },
      { name: 'Respiratory Rate', value: '16 breaths/min' },
      { name: 'Temperature', value: '98.6°F' },
      { name: 'Oxygen Saturation', value: '96%' },
    ],
    pastVisits: [
      { date: 'April 30, 2025', type: 'Vital Signs Check', notes: 'Patient reported feeling well. All vitals within normal range.' },
      { date: 'March 15, 2025', type: 'Blood Test', notes: 'Difficult blood draw, used butterfly needle. Results sent to Dr. Smith.' },
      { date: 'February 5, 2025', type: 'X-Ray (Chest)', notes: 'Patient reported some discomfort while breathing deeply. Images clear.' },
    ],
  },
  // Add more visit objects as needed
];

// Modules
export const modules = [
  { id: '1', title: 'How to professionally behave during home visits', description: 'Learn the essentials of professional conduct when visiting patients at their homes.', duration: '45 mins', progress: 100, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300' },
  { id: '2', title: 'Medical equipment handling basics', description: 'Master the proper handling techniques for common medical equipment used during home visits.', duration: '1 hour', progress: 75, image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&q=80&w=300' },
  { id: '3', title: 'Patient sensitivity and privacy', description: 'Understand the importance of patient privacy and how to maintain confidentiality.', duration: '30 mins', progress: 25, image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300' },
  { id: '4', title: 'Emergency situations', description: 'Learn how to identify and respond to medical emergencies during home visits.', duration: '1.5 hours', progress: 0, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=300' },
  { id: '5', title: 'How to upsell Welli services ethically', description: 'Discover ethical approaches to recommending additional Welli services to patients.', duration: '45 mins', progress: 0, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300' },
];

// Dashboard visits (Indian names and locations)
export const visitsData = [
  { id: '1', patientName: 'Rajesh Kumar', patientAge: 65, address: '42 Shyam Nagar, Delhi NCR, 110001', time: '9:00 AM', visitType: 'Blood Test', isUrgent: true, status: 'upcoming' },
  { id: '2', patientName: 'Priya Sharma', patientAge: 78, address: '105 Andheri West, Mumbai, 400053', time: '11:30 AM', visitType: 'X-Ray', status: 'upcoming' },
  { id: '3', patientName: 'Vikram Mehta', patientAge: 72, address: '78 Indiranagar, Bangalore, 560038', time: '2:15 PM', visitType: 'Vitals Check', status: 'upcoming' },
];

export const availableVisits = [
  { id: '6', patientName: 'Anita Desai', patientAge: 58, address: '56 Banjara Hills, Hyderabad, 500034', time: '10:45 AM', visitType: 'Blood Pressure Check', status: 'upcoming' },
  { id: '7', patientName: 'Suresh Patel', patientAge: 82, address: '25 Salt Lake, Kolkata, 700091', time: '1:30 PM', visitType: 'Diabetes Screening', status: 'upcoming', isUrgent: true },
  { id: '8', patientName: 'Meera Reddy', patientAge: 69, address: '15 Adyar, Chennai, 600020', time: '3:00 PM', visitType: 'Medication Review', status: 'upcoming' },
]; 