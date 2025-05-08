import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  MapPin, 
  Search, 
  Filter,
  Navigation,
  Clock
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { supabase } from '@/lib/supabaseClient';

const ViewAllLocations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('all');
  const [visitType, setVisitType] = useState('all');
  const [locations, setLocations] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from('locations').select('*');
      if (!error) setLocations(data || []);
    };
    fetchLocations();
  }, []);

  const filteredLocations = locations.filter(location => {
    const matchesSearch = 
      location.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCity = city === 'all' || location.city === city;
    const matchesVisitType = visitType === 'all' || location.visitType === visitType;
    
    return matchesSearch && matchesCity && matchesVisitType;
  });
  
  const handleStartNavigation = () => {
    navigate('/start-navigation');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">All Visit Locations</h1>
      </div>

      {/* Map view */}
      <Card>
        <CardContent className="p-0 aspect-video relative">
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-welli-accent mx-auto mb-2" />
              <p>Interactive map would display here</p>
              <p className="text-sm text-welli-textSecondary mt-1">
                Showing 5 locations across India
              </p>
            </div>
          </div>
          
          {/* Map pins would render here in a real implementation */}
          <div className="absolute top-4 right-4 z-10">
            <Select defaultValue="all" onValueChange={setCity}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter by City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Kolkata">Kolkata</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-welli-textSecondary" />
          <Input
            placeholder="Search locations, patients or visit types..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select defaultValue="all" onValueChange={setVisitType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Visit Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Visit Types</SelectItem>
            <SelectItem value="Blood Test">Blood Test</SelectItem>
            <SelectItem value="X-Ray">X-Ray</SelectItem>
            <SelectItem value="Vitals Check">Vitals Check</SelectItem>
            <SelectItem value="Medication Delivery">Medication Delivery</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>

      {/* Locations list */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Visit Locations</CardTitle>
          <CardDescription>{filteredLocations.length} locations found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {filteredLocations.map((location, index) => (
              <div key={location.id}>
                <div className="p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{location.patientName}</h3>
                      <p className="text-sm text-welli-textSecondary">
                        {location.address}, {location.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {location.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                      <Badge variant="outline">{location.visitType}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-sm text-welli-textSecondary">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{location.time}</span>
                      <span className="mx-2">•</span>
                      <span>{location.distance} away</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/visits/${location.id}`)}
                      >
                        Details
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleStartNavigation()}
                        className="bg-welli-accent hover:bg-welli-accent/90"
                      >
                        <Navigation className="h-3.5 w-3.5 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                </div>
                {index < filteredLocations.length - 1 && <Separator />}
              </div>
            ))}
            
            {filteredLocations.length === 0 && (
              <div className="py-10 text-center">
                <MapPin className="h-10 w-10 text-welli-textSecondary mx-auto mb-2" />
                <p className="text-welli-textSecondary">No locations found matching your criteria</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm('');
                    setCity('all');
                    setVisitType('all');
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewAllLocations;
