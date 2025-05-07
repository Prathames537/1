import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Users, FileText, Video, MessageCircle, BarChart3, PiggyBank, Settings, Circle } from 'lucide-react';

// Sidebar menu items config
const menuItems = [
  { name: 'Dashboard', icon: <BarChart3 size={20} />, path: '/' },
  { name: 'Appointments', icon: <CalendarDays size={20} />, path: '/appointments' },
  { name: 'Patients', icon: <Users size={20} />, path: '/patients' },
  { name: 'Assistant Visits', icon: <Video size={20} />, path: '/assistant-visits' },
  { name: 'Consultations', icon: <MessageCircle size={20} />, path: '/consultations' },
  { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
  { name: 'Earnings', icon: <PiggyBank size={20} />, path: '/earnings' },
  { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="h-screen w-64 border-r border-welli-gray-200 bg-white flex flex-col">
      {/* Logo Header */}
      <div className="p-4 border-b border-welli-gray-200 flex items-center gap-3">
        {/* Circular W logo */}
        <div className="w-12 h-12 bg-welli-green rounded-full flex items-center justify-center shadow-md">
          <img 
            src="/favicon.svg" 
            alt="Welli Logo" 
            className="w-8 h-8"
          />
        </div>
        {/* Brand */}
        <span className="font-bold text-welli-green text-2xl tracking-tight">Welli</span>
      </div>
      {/* Navigation */}
      <nav className="flex-1 py-6 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map(item => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`
                  menu-link hover:shadow-sm transition hover-scale
                  ${location.pathname === item.path ? 'active !bg-welli-green/10 !text-welli-green' : ''}
                `}
                style={{fontWeight: location.pathname === item.path ? "bold" : "normal"}}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        {/* AI Bot Icon - placed under settings */}
        <div className="mt-10 flex flex-col items-center">
          <Link 
            to="/ai-assistant"
            title="AI Assistant"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-welli-green to-welli-accent-green/90 hover:scale-110 transition outline-welli-green/50"
            style={{ boxShadow: '0 2px 8px 0 #d4eacb50', border: '3px solid #e2fce5' }}
          >
            <img 
              src="/favicon.svg" 
              alt="AI Assistant" 
              className="w-8 h-8"
            />
            <span className="absolute bottom-3 right-2 block w-3 h-3 rounded-full bg-white border-2 border-welli-green flex items-center justify-center">
              <Circle className="text-welli-green" size={10} />
            </span>
          </Link>
          <span className="font-semibold text-xs mt-2 text-welli-green tracking-wide">AI Bot</span>
        </div>
      </nav>
      {/* User Footer */}
      <div className="p-4 border-t border-welli-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-welli-light-green flex items-center justify-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Doctor" className="rounded-full w-9 h-9" />
          </div>
          <div>
            <p className="text-base font-bold text-welli-green">Dr. Alex</p>
            <p className="text-xs text-welli-gray-600">Primary Care Physician</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

