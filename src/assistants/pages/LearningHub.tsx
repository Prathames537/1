import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, Award, TrendingUp, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ModuleCard from '../components/learning/ModuleCard';
import { supabase } from '@/lib/supabaseClient';

const LearningHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modules, setModules] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchModules = async () => {
      const { data, error } = await supabase.from('modules').select('*');
      if (!error) setModules(data || []);
    };
    fetchModules();
  }, []);

  const completedModules = modules.filter(module => module.progress === 100).length;
  const totalModules = modules.length;
  const completionPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  
  // Filter modules based on search term
  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Learning Hub</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>My Certificates</span>
          </Button>
          <Button>Resume Learning</Button>
        </div>
      </div>

      {/* Progress overview card */}
      <Card className="bg-welli-background">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold">Your Learning Progress</h2>
              <p className="text-welli-textSecondary mt-1">
                Complete all required modules to receive your certification
              </p>
            </div>
            
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-sm mb-1">
                <span>{completedModules} of {totalModules} modules completed</span>
                <span>{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              
              {completionPercentage < 100 ? (
                <p className="text-xs text-welli-textSecondary mt-2">
                  Complete remaining modules to get certified
                </p>
              ) : (
                <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                  <Award className="h-3.5 w-3.5" />
                  <span>Certification complete! Download your certificate.</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and filters */}
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-welli-textSecondary" />
        <Input
          placeholder="Search for modules..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Featured module */}
      {!searchTerm && (
        <Card className="overflow-hidden bg-gradient-to-r from-welli-main/10 to-welli-accent/10 border-welli-main">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 p-6">
              <Badge variant="outline" className="mb-4 border-welli-accent text-welli-accent">
                Featured Module
              </Badge>
              <h2 className="text-2xl font-bold mb-2">Patient sensitivity and privacy</h2>
              <p className="text-welli-textSecondary mb-4">
                Learn about HIPAA regulations and best practices for maintaining patient confidentiality 
                during home visits. This module is essential for all medical assistants.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full">
                  <BookOpen className="h-3.5 w-3.5 text-welli-accent" />
                  <span>5 lessons</span>
                </div>
                <div className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full">
                  <TrendingUp className="h-3.5 w-3.5 text-welli-accent" />
                  <span>Most popular</span>
                </div>
              </div>
              <Button asChild>
                <a href="/learning/3">Continue Module</a>
              </Button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80" 
                alt="Patient privacy" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Module grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Modules</h2>
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Search className="h-10 w-10 text-welli-textSecondary mb-2" />
              <p className="text-welli-textSecondary">No modules found matching "{searchTerm}"</p>
              <Button variant="link" onClick={() => setSearchTerm('')}>
                Clear search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Help resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Reference Library</h3>
                <p className="text-sm text-welli-textSecondary mb-4">
                  Access our comprehensive library of medical references and guides.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Library
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-welli-textSecondary mb-4">
                  Watch step-by-step videos on common procedures and equipment usage.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Tutorials
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Practice Quizzes</h3>
                <p className="text-sm text-welli-textSecondary mb-4">
                  Test your knowledge with our interactive practice quizzes.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Take Quizzes
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningHub;
