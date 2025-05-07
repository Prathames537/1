
import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="h-18 border-b border-welli-gray-200 bg-white flex items-center px-6 sticky top-0 z-10 shadow-md">
      <div className="flex-1 flex items-center">
        <div className="relative mr-4">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-welli-green" />
          <input 
            type="text" 
            placeholder="Search patients, appointments..." 
            className="pl-10 pr-4 py-2 rounded-xl border border-welli-green focus:outline-none focus:ring-2 focus:ring-welli-green bg-welli-light-green w-72"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-welli-accent-green/20"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
        >
          <Bell size={22} className="text-welli-green" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-welli-accent-green border-2 border-white rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-welli-accent-green/20">
          <HelpCircle size={22} className="text-welli-green" />
        </Button>
        <div className="h-8 w-px bg-welli-gray-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-welli-green">Dr. Alex</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

