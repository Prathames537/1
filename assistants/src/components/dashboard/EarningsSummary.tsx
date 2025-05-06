import { BadgeDollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EarningsSummaryProps {
  today: number;
  thisWeek: number;
  thisMonth: number;
  changePercentage: number;
}

const EarningsSummary = ({ today, thisWeek, thisMonth, changePercentage }: EarningsSummaryProps) => {
  const isPositiveChange = changePercentage >= 0;
  
  // Function to format currency in US Dollars
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US')}`;
  };

  return (
    <Card className="overflow-hidden border-welli-accent/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-welli-main/10 to-welli-accent/10">
        <CardTitle className="text-lg font-semibold">Earnings Summary</CardTitle>
        <div className="w-8 h-8 rounded-full bg-welli-accent/20 flex items-center justify-center">
          <BadgeDollarSign className="h-5 w-5 text-welli-accent" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-welli-textSecondary">Today</p>
            <p className="text-2xl font-semibold">{formatCurrency(today)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-welli-textSecondary">This Week</p>
            <p className="text-2xl font-semibold">{formatCurrency(thisWeek)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-welli-textSecondary">This Month</p>
            <p className="text-2xl font-semibold">{formatCurrency(thisMonth)}</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className={cn(
            "inline-flex items-center rounded-full px-2 py-1 text-xs",
            isPositiveChange ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {isPositiveChange ? (
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
            )}
            <span>{Math.abs(changePercentage)}% {isPositiveChange ? 'up' : 'down'}</span>
          </div>
          <span className="ml-2 text-xs text-welli-textSecondary">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsSummary;
