// Centralized mock data for doctors app

// Patients
export const patients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    age: 42,
    gender: 'Female',
    birthdate: '1982-05-15',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@example.com',
    address: '123 Oak St, Springfield, IL',
    insuranceProvider: 'Welli Health',
    insuranceNumber: 'WH123456789',
    lifeInsurance: true,
    emergencyContact: 'Michael Johnson (Husband) - +1 (555) 987-6543',
    lastVisit: 'March 15, 2023',
    recordCount: 8,
    medicalRecords: [
      {
        id: 'mr1',
        date: 'March 15, 2025',
        title: 'Regular check-up',
        description: 'Blood pressure slightly elevated at 140/90. Patient reports occasional headaches. Recommended lifestyle modifications and follow-up in 1 month.',
        type: 'visit',
      },
      {
        id: 'mr2',
        date: 'February 28, 2025',
        title: 'Blood Test Results',
        description: 'Cholesterol: 210 mg/dL (slightly elevated), Blood glucose: 95 mg/dL (normal), Complete blood count within normal ranges.',
        type: 'test',
      },
      {
        id: 'mr3',
        date: 'January 10, 2025',
        title: 'Seasonal Allergies',
        description: 'Patient experiencing nasal congestion, sneezing, and itchy eyes. Prescribed antihistamine and nasal spray.',
        type: 'visit',
      },
    ],
    prescriptions: [
      {
        id: 'p1',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: 'March 15, 2025',
        endDate: 'Ongoing',
        notes: 'Take in the morning with food',
        active: true,
      },
      {
        id: 'p2',
        name: 'Loratadine',
        dosage: '10mg',
        frequency: 'Once daily as needed',
        startDate: 'January 10, 2025',
        endDate: 'Ongoing',
        notes: 'For seasonal allergy relief',
        active: true,
      },
    ],
    vitals: [
      {
        date: 'March 15, 2025',
        type: 'Blood Pressure',
        value: '140/90',
        unit: 'mmHg',
        status: 'elevated',
      },
      {
        date: 'March 15, 2025',
        type: 'Heart Rate',
        value: '72',
        unit: 'bpm',
        status: 'normal',
      },
      {
        date: 'February 28, 2025',
        type: 'Blood Pressure',
        value: '138/88',
        unit: 'mmHg',
        status: 'elevated',
      },
      {
        date: 'January 10, 2025',
        type: 'Blood Pressure',
        value: '130/85',
        unit: 'mmHg',
        status: 'normal',
      },
    ],
    familyHistory: [
      {
        relationship: 'Father',
        healthConditions: ['Hypertension', 'Type 2 Diabetes'],
        age: 68,
      },
      {
        relationship: 'Mother',
        healthConditions: ['Breast Cancer (survivor)'],
        age: 65,
      },
      {
        relationship: 'Sister',
        healthConditions: ['Asthma'],
        age: 38,
      },
      {
        relationship: 'Paternal Grandfather',
        healthConditions: ['Coronary Artery Disease', 'Stroke'],
        deceased: true,
      },
    ],
    condition: 'Hypertension',
  },
  {
    id: '2',
    name: 'Robert Chen',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    age: 56,
    gender: 'Male',
    lastVisit: 'March 10, 2023',
    condition: 'Type 2 Diabetes',
    recordCount: 12,
    insuranceProvider: 'Blue Cross',
  },
  {
    id: '3',
    name: 'Emma Garcia',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    age: 29,
    gender: 'Female',
    lastVisit: 'March 5, 2023',
    condition: 'Migraine',
    recordCount: 5,
    insuranceProvider: 'None',
  },
  {
    id: '4',
    name: 'Michael Wilson',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    age: 68,
    gender: 'Male',
    lastVisit: 'February 28, 2023',
    condition: 'Arthritis',
    recordCount: 15,
    insuranceProvider: 'Medicare',
  },
  {
    id: '5',
    name: 'Olivia Martinez',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    age: 35,
    gender: 'Female',
    lastVisit: 'February 25, 2023',
    condition: 'Asthma',
    recordCount: 7,
    insuranceProvider: 'Aetna',
  },
  // ...add other patients from Patients.tsx and PatientProfile.tsx
];

// Visits
export const visits = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    date: '2024-03-15',
    time: '10:30 AM',
    status: 'scheduled' as 'scheduled',
    type: 'follow-up' as 'follow-up',
    assistant: 'Dr. Emily Chen',
    assistantImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    patientContact: {
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@example.com',
    },
    notes: 'Patient requires follow-up visit to monitor blood pressure medication effectiveness. Previous readings were slightly elevated.',
    vitals: {
      bloodPressure: '130/85 mmHg',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      oxygenLevel: '98%',
    },
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
      },
      {
        name: 'Metoprolol',
        dosage: '25mg',
        frequency: 'Twice daily',
      },
    ],
  },
  {
    id: '2',
    patientName: 'Robert Chen',
    patientImage: 'https://randomuser.me/api/portraits/men/76.jpg',
    address: '456 Park Ave, Suite 2, New York, NY 10022',
    date: '2024-03-15',
    time: '2:00 PM',
    status: 'in-progress' as 'in-progress',
    type: 'initial' as 'initial',
    assistant: 'Dr. Michael Brown',
    assistantImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    patientContact: {
      phone: '+1 (555) 987-6543',
      email: 'robert.chen@example.com',
    },
    notes: 'Initial visit for diabetes management. Review blood sugar logs and adjust medication as needed.',
    vitals: {
      bloodPressure: '125/80 mmHg',
      heartRate: '78 bpm',
      temperature: '98.7°F',
      oxygenLevel: '99%',
    },
    medications: [
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
      },
    ],
  },
  {
    id: '3',
    patientName: 'Emma Garcia',
    patientImage: 'https://randomuser.me/api/portraits/women/63.jpg',
    address: '789 Broadway, New York, NY 10003',
    date: '2024-03-16',
    time: '11:00 AM',
    status: 'scheduled' as 'scheduled',
    type: 'emergency' as 'emergency',
    assistant: 'Dr. Sarah Wilson',
    assistantImage: 'https://randomuser.me/api/portraits/women/28.jpg',
    patientContact: {
      phone: '+1 (555) 222-3333',
      email: 'emma.garcia@example.com',
    },
    notes: 'Emergency visit for severe migraine. Assess neurological status and provide pain relief.',
    vitals: {
      bloodPressure: '118/76 mmHg',
      heartRate: '80 bpm',
      temperature: '99.1°F',
      oxygenLevel: '98%',
    },
    medications: [
      {
        name: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed',
      },
    ],
  },
  {
    id: '4',
    patientName: 'Michael Wilson',
    patientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    address: '321 Elm St, New York, NY 10004',
    date: '2024-03-17',
    time: '3:00 PM',
    status: 'completed' as 'completed',
    type: 'follow-up' as 'follow-up',
    assistant: 'Dr. Alex Smith',
    assistantImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    patientContact: {
      phone: '+1 (555) 444-5555',
      email: 'michael.wilson@example.com',
    },
    notes: 'Follow-up visit for arthritis management. Patient reports improvement with new medication.',
    vitals: {
      bloodPressure: '135/85 mmHg',
      heartRate: '70 bpm',
      temperature: '98.4°F',
      oxygenLevel: '97%',
    },
    medications: [
      {
        name: 'Ibuprofen',
        dosage: '200mg',
        frequency: 'As needed',
      },
    ],
  },
  // ...add other visits from AssistantVisits.tsx and AssistantVisitDetails.tsx
];

// Appointments
export const appointments = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: '10:30 AM',
    type: 'video' as 'video',
    status: 'upcoming' as 'upcoming',
    reason: 'Follow-up on blood pressure medication',
  },
  {
    id: '2',
    patientName: 'Robert Chen',
    patientImage: 'https://randomuser.me/api/portraits/men/76.jpg',
    time: '11:15 AM',
    type: 'chat' as 'chat',
    status: 'upcoming' as 'upcoming',
    reason: 'Medication refill request',
  },
  {
    id: '3',
    patientName: 'Emma Garcia',
    patientImage: 'https://randomuser.me/api/portraits/women/63.jpg',
    time: '2:00 PM',
    type: 'video' as 'video',
    status: 'upcoming' as 'upcoming',
    reason: 'Chronic headache consultation',
  },
];

// Reports
export const reports = [
  {
    id: '1',
    patientName: 'John Doe',
    patientImage: 'https://github.com/shadcn.png',
    date: '2024-03-20',
    type: 'blood_test',
    status: 'completed',
    results: [
      {
        name: 'Hemoglobin',
        value: '14.2',
        unit: 'g/dL',
        normalRange: '13.5 - 17.5',
      },
      {
        name: 'WBC Count',
        value: '7.5',
        unit: 'x10^9/L',
        normalRange: '4.5 - 11.0',
      },
      {
        name: 'Platelet Count',
        value: '250',
        unit: 'x10^9/L',
        normalRange: '150 - 450',
      },
    ],
    notes: 'All parameters are within normal range. No abnormalities detected.',
    fileUrl: '/reports/blood_test_1.pdf',
  },
  // ...add other reports from Reports.tsx
];

// Consultations
export const consultations = [
  {
    id: '1',
    patientName: 'John Doe',
    patientImage: 'https://github.com/shadcn.png',
    date: '2024-03-20',
    time: '10:00 AM',
    status: 'completed',
    type: 'follow-up',
    symptoms: ['Fever', 'Cough', 'Headache'],
    diagnosis: 'Viral Fever',
    prescription: {
      medicines: [
        {
          name: 'Paracetamol',
          dosage: '500mg',
          duration: '3 days',
        },
        {
          name: 'Vitamin C',
          dosage: '1000mg',
          duration: '7 days',
        },
      ],
      notes: 'Take medicines after meals. Drink plenty of water.',
    },
    notes: 'Patient recovering well. Follow up in 3 days if symptoms persist.',
  },
  // ...add other consultations from Consultations.tsx
];

// Earnings
export const earnings = [
  {
    id: '1',
    date: '2024-03-20',
    patientName: 'John Doe',
    consultationType: 'Follow-up',
    amount: 1500,
    status: 'paid',
  },
  // ...add other earnings from Earnings.tsx
];

// Monthly Summaries
export const monthlySummaries = [
  {
    month: 'March 2024',
    totalEarnings: 6500,
    totalConsultations: 3,
    averageEarning: 2166.67,
  },
  // ...add other summaries from Earnings.tsx
];

// Notifications
export const notifications = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    description: 'Video consultation with Sarah Johnson in 30 minutes',
    time: '30 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message from Patient',
    description: 'Robert Chen sent you a message regarding his medication.',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'report',
    title: 'Lab Report Ready',
    description: "Emma Garcia's blood test results are now available.",
    time: '2 hours ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    description: 'Your profile has been updated successfully.',
    time: 'Yesterday',
    isRead: true,
  },
]; 