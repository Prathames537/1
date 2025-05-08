import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, CheckCircle, Clock, ArrowLeft, Award, ChevronRight, ListChecks 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LessonContent, { Lesson } from '../components/learning/LessonContent';
import { patientPrivacyLessons } from '../components/learning/LessonData';
import { supabase } from '@/lib/supabaseClient';

const moduleLessons: Record<string, Lesson[]> = {
  '3': patientPrivacyLessons
};

const ModuleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [module, setModule] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchModule = async () => {
      const { data, error } = await supabase.from('modules').select('*').eq('id', id).single();
      if (!error) setModule(data);
    };
    if (id) fetchModule();
  }, [id]);

  useEffect(() => {
    if (id) {
      const moduleData = moduleLessons[id] || [];
      setLessons(moduleData);
      
      setCompletedLessons(new Set());
    }
  }, [id, module]);

  const handleLessonComplete = () => {
    if (!lessons[currentLessonIndex]) return;
    
    const newCompletedLessons = new Set(completedLessons);
    newCompletedLessons.add(lessons[currentLessonIndex].id);
    setCompletedLessons(newCompletedLessons);
    
    toast({
      title: "Lesson Completed!",
      description: `You've completed: ${lessons[currentLessonIndex].title}`,
      variant: "default"
    });
    
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      if (newCompletedLessons.size === lessons.length && lessons.length > 0) {
        toast({
          title: "Module Completed!",
          description: "Congratulations! You've completed all lessons in this module.",
          variant: "default"
        });
        
        setActiveTab("overview");
      }
    }
  };

  const completionPercentage = lessons.length > 0 
    ? (completedLessons.size / lessons.length) * 100 
    : 0;

  if (!module) {
    return <div className="p-8 text-center text-red-500">Module not found.</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/learning')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{module.title}</h1>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 p-6">
            <Badge variant="outline" className="mb-3">
              Module {id}
            </Badge>
            <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
            <p className="text-welli-textSecondary mb-4">{module.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-welli-textSecondary" />
                <span className="text-sm">{module.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-welli-textSecondary" />
                <span className="text-sm">{lessons.length} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-welli-textSecondary" />
                <span className="text-sm">{completedLessons.size} completed</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{completionPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src={module.image} 
              alt={module.title} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lessons">Lessons ({completedLessons.size}/{lessons.length})</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Module</CardTitle>
              <CardDescription>What you will learn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This module covers essential information about {module.title.toLowerCase()}.
                You will learn key concepts, best practices, and practical skills that can be
                applied during your home healthcare visits.
              </p>
              
              <h3 className="font-semibold text-lg mt-4">Learning Objectives</h3>
              <ul className="space-y-2">
                {id === '3' && (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-welli-accent mt-0.5 flex-shrink-0" />
                      <span>Understand the fundamentals of patient privacy and HIPAA regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-welli-accent mt-0.5 flex-shrink-0" />
                      <span>Learn strategies for maintaining privacy in home healthcare settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-welli-accent mt-0.5 flex-shrink-0" />
                      <span>Develop skills for handling especially sensitive patient information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-welli-accent mt-0.5 flex-shrink-0" />
                      <span>Learn how to prevent and respond to privacy breaches</span>
                    </li>
                  </>
                )}
                {id !== '3' && (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-welli-accent mt-0.5 flex-shrink-0" />
                      <span>Understand the core principles of {module.title.toLowerCase()}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-welli-accent mt-0.5 flex-shrink-0" />
                      <span>Learn best practices for applying these concepts in home healthcare</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-welli-accent mt-0.5 flex-shrink-0" />
                      <span>Develop practical skills through interactive examples</span>
                    </li>
                  </>
                )}
              </ul>
              
              {completedLessons.size === lessons.length && lessons.length > 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Module Completed!</h4>
                      <p className="text-sm text-green-700">
                        Congratulations! You've completed all lessons in this module.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" className="border-green-300 text-green-700">
                      Download Certificate
                    </Button>
                  </div>
                </div>
              ) : lessons.length > 0 ? (
                <Button 
                  onClick={() => {
                    setActiveTab("lessons");
                    setCurrentLessonIndex(completedLessons.size < lessons.length ? completedLessons.size : 0);
                  }} 
                  className="w-full mt-6"
                >
                  {completedLessons.size > 0 ? "Continue Learning" : "Start Module"}
                </Button>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-6">
                  <p className="text-yellow-700">
                    This module is coming soon. Check back later for updates.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Module Outline</CardTitle>
              <CardDescription>Lessons in this module</CardDescription>
            </CardHeader>
            <CardContent>
              {lessons.length > 0 ? (
                <ol className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <li key={lesson.id}>
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => {
                        setActiveTab("lessons");
                        setCurrentLessonIndex(index);
                      }}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            completedLessons.has(lesson.id) 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {completedLessons.has(lesson.id) ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{lesson.title}</h4>
                            <div className="flex items-center text-xs text-welli-textSecondary">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-welli-textSecondary" />
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-welli-textSecondary">No lessons available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lessons" className="space-y-6 mt-6">
          {lessons.length > 0 && currentLessonIndex < lessons.length ? (
            <LessonContent 
              lesson={lessons[currentLessonIndex]} 
              onComplete={handleLessonComplete} 
            />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8">
                <BookOpen className="h-12 w-12 text-welli-textSecondary mb-3" />
                <p className="text-welli-textSecondary">No lessons available yet.</p>
                <Button variant="outline" onClick={() => setActiveTab("overview")} className="mt-4">
                  Go to Overview
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>Supplemental materials for this module</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {id === '3' && (
                  <>
                    <div className="flex items-start gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                        PDF
                      </div>
                      <div>
                        <h4 className="font-medium">HIPAA Quick Reference Guide</h4>
                        <p className="text-sm text-welli-textSecondary">
                          A printable guide to key HIPAA requirements for home healthcare.
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-1 text-welli-accent">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center text-green-600">
                        DOC
                      </div>
                      <div>
                        <h4 className="font-medium">Privacy Breach Reporting Form</h4>
                        <p className="text-sm text-welli-textSecondary">
                          Template for reporting privacy incidents or concerns.
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-1 text-welli-accent">
                          Download Document
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">
                        LINK
                      </div>
                      <div>
                        <h4 className="font-medium">HHS.gov: Health Information Privacy</h4>
                        <p className="text-sm text-welli-textSecondary">
                          Official government resources on HIPAA and patient privacy.
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-1 text-welli-accent">
                          Visit Website
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                
                {id !== '3' && (
                  <p className="text-welli-textSecondary">
                    No additional resources available for this module yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModuleDetails;
