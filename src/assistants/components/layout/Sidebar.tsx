import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, BadgeDollarSign, BookOpen, Settings, MessageSquare, Menu, X, Navigation, CheckCircle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarLink {
  title: string;
  icon: React.ElementType;
  path: string;
}

const sidebarLinks: SidebarLink[] = [
  { title: 'Dashboard', icon: Home, path: '/assistants/dashboard' },
  { title: 'Visits', icon: Calendar, path: '/assistants/visits' },
  { title: 'Earnings', icon: BadgeDollarSign, path: '/assistants/earnings' },
  { title: 'Learning Hub', icon: BookOpen, path: '/assistants/learning' },
  { title: 'Settings', icon: Settings, path: '/assistants/settings' },
  { title: 'Support', icon: MessageSquare, path: '/assistants/support' },
];

const quickActionLinks: SidebarLink[] = [
  { title: 'Start Navigation', icon: Navigation, path: '/assistants/start-navigation' },
  { title: 'Mark Visit Complete', icon: CheckCircle, path: '/assistants/mark-visit-complete' },
  { title: 'View All Locations', icon: MapPin, path: '/assistants/view-all-locations' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAIChatClick = () => {
    if (window.openWelliAssistantAI) {
      window.openWelliAssistantAI();
    } else {
      navigate('/assistants/support');
      setTimeout(() => {
        const chatbotElement = document.querySelector('[data-ai-chatbot]');
        if (chatbotElement) {
          chatbotElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button size="icon" variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar content */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-welli-main flex items-center justify-center">
              <span className="font-bold text-white">W</span>
            </div>
            <h1 className="text-xl font-bold text-welli-textPrimary">Welli</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path;
              
              if (link.title === 'Support') {
                return (
                  <li key={link.title} className="space-y-2">
                    <Link
                      to={link.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-welli-main text-white"
                          : "text-welli-textSecondary hover:bg-welli-background"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.title}</span>
                    </Link>
                    {/* Welli Assistant under Support */}
                    <button
                      onClick={handleAIChatClick}
                      className="flex items-center gap-3 px-4 py-2 w-full rounded-md text-sm font-medium text-welli-textSecondary hover:bg-welli-background transition-colors ml-4"
                    >
                      <div className="w-5 h-5 rounded-full bg-welli-main flex items-center justify-center">
                        <span className="font-bold text-white text-xs">W</span>
                      </div>
                      <span>Welli Assistant</span>
                    </button>
                  </li>
                );
              }
              
              return (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-welli-main text-white"
                        : "text-welli-textSecondary hover:bg-welli-background"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Quick Actions Section */}
          <div className="mt-6">
            <p className="px-4 text-xs font-semibold text-welli-textSecondary uppercase tracking-wider mb-2">
              Quick Actions
            </p>
            <ul className="space-y-1">
              {quickActionLinks.map((link) => {
                const isActive = location.pathname === link.path;
                
                return (
                  <li key={link.title}>
                    <Link
                      to={link.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-welli-accent text-white"
                          : "text-welli-textSecondary hover:bg-welli-background"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
