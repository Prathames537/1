import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 overflow-x-hidden">
          {children ? children : <Outlet />}
        </main>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
