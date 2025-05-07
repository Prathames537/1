import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, ArrowUpRight, Download, BadgeDollarSign, 
  ArrowRight, CreditCard, FileText, Wallet
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { earningsHistory, withdrawalHistory } from '../lib/mockData';

const Earnings = () => {
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bank');
  const navigate = useNavigate();
  
  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Initiated",
      description: `$${withdrawAmount} will be transferred to your account in 1-2 business days.`,
    });
  };

  const totalEarned = earningsHistory.reduce((sum, entry) => sum + entry.amount, 0);
  const availableBalance = 1450;
  const pendingAmount = 120;
  const monthlyGoal = 3000;
  const goalProgress = (totalEarned / monthlyGoal) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Earnings Dashboard</h1>
        
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

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-welli-main to-welli-accent text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-white/90">Available Balance</p>
                <p className="text-3xl font-bold mt-1">${availableBalance}</p>
              </div>
              <BadgeDollarSign className="h-6 w-6" />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="mt-3 w-full" id="withdraw">
                  Withdraw Funds
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex justify-between items-center">
                    <span>Available Balance</span>
                    <span className="font-bold text-lg">${availableBalance}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      placeholder="Enter amount"
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {withdrawMethod === 'bank' && (
                    <div className="p-3 bg-welli-background rounded-md text-sm">
                      <p>Bank: HDFC Bank</p>
                      <p>Account: ****6789</p>
                      <p className="text-xs text-welli-textSecondary mt-1">
                        Funds will be transferred within 1-2 business days
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleWithdraw} disabled={!withdrawAmount}>Withdraw</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-welli-textSecondary">Total Earned (May)</p>
            <p className="text-3xl font-bold mt-1">${totalEarned}</p>
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
            <p className="text-3xl font-bold mt-1">${pendingAmount}</p>
            <div className="mt-2 text-xs text-welli-textSecondary">
              From 1 completed visit
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-welli-textSecondary">Monthly Goal</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-3xl font-bold">${totalEarned}</p>
              <p className="text-sm text-welli-textSecondary">/ ${monthlyGoal}</p>
            </div>
            <div className="mt-2 space-y-1">
              <Progress value={goalProgress} />
              <div className="flex justify-between text-xs text-welli-textSecondary">
                <span>{goalProgress.toFixed(0)}% Complete</span>
                <span>{(monthlyGoal - totalEarned)} more to reach goal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Earnings Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-welli-textSecondary">
              Chart showing earnings breakdown by visit type and date
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for Transactions and Tax Info */}
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="tax">Tax Information</TabsTrigger>
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
                  {earningsHistory.map((entry) => (
                    <TableRow key={entry.id} onClick={() => navigate(`/assistants/earnings/${entry.id}`)} className="cursor-pointer hover:bg-welli-light-green/20">
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.patientName}</TableCell>
                      <TableCell>{entry.visitType}</TableCell>
                      <TableCell>${entry.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          className={entry.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {entry.status}
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
        
        <TabsContent value="withdrawals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawalHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>${entry.amount}</TableCell>
                      <TableCell>{entry.method}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {entry.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Payment Methods</h3>
                  <div className="space-y-3">
                    <Card className="bg-welli-background border-2 border-welli-main">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-6 w-6 text-welli-accent" />
                          <div>
                            <p className="font-medium">HDFC Bank</p>
                            <p className="text-sm text-welli-textSecondary">****6789</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Wallet className="h-6 w-6 text-welli-textSecondary" />
                          <div>
                            <p className="font-medium">UPI</p>
                            <p className="text-sm text-welli-textSecondary">user@upi</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Set default</Button>
                      </CardContent>
                    </Card>
                    
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-3">Withdrawal Information</h3>
                    <Card>
                      <CardContent className="p-4 space-y-3 text-sm">
                        <p>• Minimum withdrawal amount is $50</p>
                        <p>• Withdrawals are processed within 1-2 business days</p>
                        <p>• Bank transfers may take additional 1-3 business days to reflect</p>
                        <p>• UPI transfers are typically processed faster</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gradient-cta">Withdraw Available Balance</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex justify-between items-center">
                          <span>Available Balance</span>
                          <span className="font-bold text-lg">${availableBalance}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="amount2">Amount</Label>
                          <Input
                            id="amount2"
                            placeholder="Enter amount"
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="method2">Payment Method</Label>
                          <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                            <SelectTrigger id="method2">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleWithdraw} disabled={!withdrawAmount}>Withdraw</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Tax Year 2025</h3>
                  <div className="flex items-center p-4 bg-welli-background rounded-md">
                    <FileText className="h-10 w-10 text-welli-accent" />
                    <div className="ml-4">
                      <p className="font-medium">Form 1099-MISC</p>
                      <p className="text-sm text-welli-textSecondary">
                        Will be available by January 31, 2026
                      </p>
                    </div>
                    <Button variant="ghost" className="ml-auto" disabled>
                      <Download className="h-4 w-4 mr-2" />
                      Not Available
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Tax Year 2024</h3>
                  <div className="flex items-center p-4 bg-welli-background rounded-md">
                    <FileText className="h-10 w-10 text-welli-accent" />
                    <div className="ml-4">
                      <p className="font-medium">Form 1099-MISC</p>
                      <p className="text-sm text-welli-textSecondary">
                        Available for download
                      </p>
                    </div>
                    <Button variant="outline" className="ml-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Tax Information</h3>
                  <div className="text-sm space-y-2">
                    <p>
                      As an independent contractor for Welli, you are responsible for paying your own taxes.
                      Welli will provide a Form 1099-MISC if you earn $600 or more in a calendar year.
                    </p>
                    <p>
                      You may be able to deduct business expenses such as mileage, supplies, and a portion
                      of your cell phone bill. It is recommended that you consult with a tax professional.
                    </p>
                  </div>
                  <Button variant="link" className="p-0 mt-2">
                    Learn More About Taxes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Earnings;
