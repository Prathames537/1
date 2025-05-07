import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, Download, BadgeDollarSign, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

interface Earning {
  id: string;
  date: string;
  patientName: string;
  amount: number;
  status: string;
  visitType?: string;
  consultationType?: string;
}

interface EarningsPageProps {
  earnings: Earning[];
  currency: string;
  routePrefix: string;
  fieldLabel: string; // 'visitType' or 'consultationType'
  title?: string;
}

const EarningsPage = ({ earnings, currency, routePrefix, fieldLabel, title = 'Earnings Dashboard' }: EarningsPageProps) => {
  const navigate = useNavigate();
  const totalEarned = earnings.reduce((sum, entry) => sum + entry.amount, 0);
  const availableBalance = 1450; // Can be passed as prop if needed
  const pendingAmount = 120; // Can be passed as prop if needed
  const monthlyGoal = 3000; // Can be passed as prop if needed
  const goalProgress = (totalEarned / monthlyGoal) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>May 2025</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-welli-main to-welli-accent text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-white/90">Available Balance</p>
                <p className="text-3xl font-bold mt-1">{currency}{availableBalance}</p>
              </div>
              <BadgeDollarSign className="h-6 w-6" />
            </div>
            <Button variant="secondary" size="sm" className="mt-3 w-full" id="withdraw">
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-welli-textSecondary">Total Earned (May)</p>
            <p className="text-3xl font-bold mt-1">{currency}{totalEarned}</p>
            <div className="mt-2 flex items-center text-xs">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+24%</span>
              <span className="text-welli-textSecondary ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-welli-textSecondary">Pending Payments</p>
            <p className="text-3xl font-bold mt-1">{currency}{pendingAmount}</p>
            <div className="mt-2 text-xs text-welli-textSecondary">
              From 1 completed visit
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-welli-textSecondary">Monthly Goal</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-3xl font-bold">{currency}{totalEarned}</p>
              <p className="text-sm text-welli-textSecondary">/ {currency}{monthlyGoal}</p>
            </div>
            <div className="mt-2 space-y-1">
              <Progress value={goalProgress} />
              <div className="flex justify-between text-xs text-welli-textSecondary">
                <span>{goalProgress.toFixed(0)}% Complete</span>
                <span>{currency}{(monthlyGoal - totalEarned)} more to reach goal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-welli-textSecondary">
              Chart showing earnings breakdown by {fieldLabel} and date
            </p>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Recent Earnings</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="paid">Paid Only</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earnings.map((entry) => (
                    <TableRow key={entry.id} onClick={() => navigate(`${routePrefix}/earnings/${entry.id}`)} className="cursor-pointer hover:bg-welli-light-green/20">
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.patientName}</TableCell>
                      <TableCell>{entry[fieldLabel as keyof Earning]}</TableCell>
                      <TableCell>{currency}{entry.amount}</TableCell>
                      <TableCell>
                        <Badge className={entry.status === 'Paid' || entry.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" className="flex items-center">
                  <span>View All Transactions</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EarningsPage; 