import { useState } from "react";
import { Calendar, DollarSign, Download, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Earning {
  id: string;
  date: string;
  patientName: string;
  consultationType: string;
  amount: number;
  status: "paid" | "pending" | "cancelled";
}

interface MonthlySummary {
  month: string;
  totalEarnings: number;
  totalConsultations: number;
  averageEarning: number;
}

const earnings: Earning[] = [
  {
    id: "1",
    date: "2024-03-20",
    patientName: "John Doe",
    consultationType: "Follow-up",
    amount: 1500,
    status: "paid"
  },
  {
    id: "2",
    date: "2024-03-21",
    patientName: "Jane Smith",
    consultationType: "New Patient",
    amount: 2000,
    status: "paid"
  },
  {
    id: "3",
    date: "2024-03-22",
    patientName: "Mike Johnson",
    consultationType: "Emergency",
    amount: 3000,
    status: "pending"
  }
];

const monthlySummaries: MonthlySummary[] = [
  {
    month: "March 2024",
    totalEarnings: 6500,
    totalConsultations: 3,
    averageEarning: 2166.67
  },
  {
    month: "February 2024",
    totalEarnings: 12000,
    totalConsultations: 8,
    averageEarning: 1500
  },
  {
    month: "January 2024",
    totalEarnings: 9000,
    totalConsultations: 6,
    averageEarning: 1500
  }
];

export default function Earnings() {
  const [selectedMonth, setSelectedMonth] = useState(monthlySummaries[0].month);

  const currentMonthSummary = monthlySummaries.find(
    summary => summary.month === selectedMonth
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Earnings</h1>
          <p className="text-muted-foreground">Track your earnings and financial reports</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{currentMonthSummary?.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonthSummary?.totalConsultations}</div>
            <p className="text-xs text-muted-foreground">
              +5 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Earning</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{currentMonthSummary?.averageEarning.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {monthlySummaries.map((summary) => (
                  <SelectItem key={summary.month} value={summary.month}>
                    {summary.month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Earnings</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Earnings</CardTitle>
              <CardDescription>Detailed breakdown of your earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {earnings.map((earning) => (
                    <div
                      key={earning.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{earning.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {earning.consultationType} • {earning.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">₹{earning.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
