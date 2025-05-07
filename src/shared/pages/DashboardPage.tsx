import { ReactNode } from 'react';

interface DashboardPageProps {
  title: string;
  subtitle?: string;
  summaryCards: ReactNode;
  quickActions?: ReactNode;
  mainList: ReactNode;
  rightWidget?: ReactNode;
  notificationAlert?: ReactNode;
  mapWidget?: ReactNode;
}

const DashboardPage = ({
  title,
  subtitle,
  summaryCards,
  quickActions,
  mainList,
  rightWidget,
  notificationAlert,
  mapWidget,
}: DashboardPageProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-welli-gray-700">{subtitle}</p>}
      </div>
      {notificationAlert}
      {quickActions}
      {summaryCards}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">{mainList}</div>
        {rightWidget && <div>{rightWidget}</div>}
      </div>
      {mapWidget}
    </div>
  );
};

export default DashboardPage; 