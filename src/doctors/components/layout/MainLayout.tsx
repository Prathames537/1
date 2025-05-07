import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-welli-light-green/50 via-white to-welli-light-green/30 min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

