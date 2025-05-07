import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertTriangle, Navigation, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../../src/lib/supabaseClient';

import VisitCard, { Visit } from "../components/dashboard/VisitCard";
import EarningsSummary from "../components/dashboard/EarningsSummary";
import MapView from "../components/dashboard/MapView";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("today");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [visitsData, setVisitsData] = useState<Visit[]>([]);
  const [availableVisits, setAvailableVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      // Fetch today's and available visits from Supabase
      const { data, error } = await supabase
        .from('appointments')
        .select('id, appointment_date, status, patient:patient_id(id, name, user_profiles(avatar_url)), doctor:doctor_id(id, name)');
      if (error) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        return;
      }
      // Map data to Visit type
      const today = (data || []).filter((appt: any) => appt.status === 'scheduled').map((appt: any) => ({
        id: appt.id,
        patientName: appt.patient?.name || '',
        patientAge: 0, // TODO: Add age if available
        address: '', // TODO: Add address if available
        time: new Date(appt.appointment_date).toLocaleTimeString(),
        visitType: '', // TODO: Add type if available
        isUrgent: false, // TODO: Add if available
        status: appt.status
      }));
      const available = (data || []).filter((appt: any) => appt.status === 'available').map((appt: any) => ({
        id: appt.id,
        patientName: appt.patient?.name || '',
        patientAge: 0,
        address: '',
        time: new Date(appt.appointment_date).toLocaleTimeString(),
        visitType: '',
        status: appt.status
      }));
      setVisitsData(today);
      setAvailableVisits(available);
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  const handleAcceptVisit = () => {
    toast({
      title: "Visit Accepted",
      description: "The visit has been added to your schedule.",
      variant: "default",
    });
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/visits">All Visits</Link>
          </Button>
          <Button asChild className="bg-welli-accent hover:bg-welli-accent/90">
            <Link to="/earnings">View Earnings</Link>
          </Button>
        </div>
      </div>

      {/* Notification alert */}
      <Alert className="border-l-4 border-l-welli-accent bg-welli-background">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Remember to complete Module 3: Patient Privacy by Friday. 
          <Button asChild variant="link" className="p-0 ml-2">
            <Link to="/learning">Go to Learning Hub</Link>
          </Button>
        </AlertDescription>
      </Alert>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card 
          className="bg-welli-background hover:bg-welli-background/80 transition-colors cursor-pointer"
          onClick={() => navigate('/start-navigation')}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-welli-accent flex items-center justify-center mb-2 text-white">
              <Navigation className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Start Navigation</h3>
            <p className="text-xs text-welli-textSecondary mt-1">
              To your next visit
            </p>
          </CardContent>
        </Card>

        <Card 
          className="bg-welli-background hover:bg-welli-background/80 transition-colors cursor-pointer"
          onClick={() => navigate('/mark-visit-complete')}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-welli-main flex items-center justify-center mb-2 text-welli-textPrimary">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Mark Visit Complete</h3>
            <p className="text-xs text-welli-textSecondary mt-1">
              Current: Rajesh Kumar
            </p>
          </CardContent>
        </Card>

        <Card 
          className="bg-welli-background hover:bg-welli-background/80 transition-colors cursor-pointer"
          onClick={() => navigate('/view-all-locations')}
        >
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-welli-background border-2 border-welli-accent flex items-center justify-center mb-2">
              <MapPin className="h-6 w-6 text-welli-accent" />
            </div>
            <h3 className="font-semibold">View All Locations</h3>
            <p className="text-xs text-welli-textSecondary mt-1">
              On map view
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming visits */}
        <div className="md:col-span-2">
          <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Schedule</h2>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                <TabsTrigger value="available">Available Visits</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="today" className="space-y-4 mt-0">
              {visitsData.map(visit => (
                <VisitCard key={visit.id} visit={visit} />
              ))}

              <Button variant="outline" className="w-full" asChild>
                <Link to="/visits" className="flex items-center justify-center gap-1">
                  View All Visits <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </TabsContent>
            
            <TabsContent value="tomorrow" className="mt-0">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <p className="text-welli-textSecondary">No visits scheduled for tomorrow</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="available" className="mt-0">
              <div className="space-y-4">
                {availableVisits.map(visit => (
                  <Card key={visit.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{visit.patientName}</h3>
                          <p className="text-sm text-welli-textSecondary">{visit.patientAge} years</p>
                        </div>
                        {visit.isUrgent && (
                          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                            Urgent
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-welli-textSecondary" />
                          <span className="text-sm">{visit.address}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-100 px-3 py-1.5 rounded-md">
                            <p className="text-xs text-welli-textSecondary">Time</p>
                            <p className="font-medium">{visit.time}</p>
                          </div>
                          <div className="bg-gray-100 px-3 py-1.5 rounded-md">
                            <p className="text-xs text-welli-textSecondary">Service</p>
                            <p className="font-medium">{visit.visitType}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate(`/visits/${visit.id}`)}
                        >
                          View Details
                        </Button>
                        <Button 
                          className="w-full gradient-cta"
                          onClick={() => handleAcceptVisit()}
                        >
                          Accept Visit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Earnings summary and map view */}
        <div className="space-y-4">
          // When rendering EarningsSummary, pass the required props
          // Example values are provided, replace them with your actual data as needed
          <EarningsSummary 
            today={1500}
            thisWeek={9000}
            thisMonth={35000}
            changePercentage={5.2}
          />
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
