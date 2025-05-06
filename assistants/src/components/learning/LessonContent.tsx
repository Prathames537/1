import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface LessonSection {
  type: 'text' | 'video' | 'quiz';
  title: string;
  content: string;
  videoUrl?: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  sections: LessonSection[];
}

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
}

const LessonContent = ({ lesson, onComplete }: LessonContentProps) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const { toast } = useToast();

  const currentSection = lesson.sections[currentSectionIndex];
  const progress = ((currentSectionIndex + 1) / lesson.sections.length) * 100;
  
  const handleNext = () => {
    if (currentSectionIndex < lesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setShowQuizResults(false);
    } else {
      // Complete the lesson
      toast({
        title: "Lesson Completed",
        description: `You've completed the lesson: ${lesson.title}`,
      });
      onComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setShowQuizResults(false);
    }
  };
  
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedAnswers = [...quizAnswers];
    updatedAnswers[questionIndex] = answerIndex;
    setQuizAnswers(updatedAnswers);
  };
  
  const handleSubmitQuiz = () => {
    setShowQuizResults(true);
    
    // Check if all answers are correct
    const allCorrect = currentSection.quiz?.every((q, i) => quizAnswers[i] === q.correctAnswer) ?? false;
    
    if (allCorrect) {
      toast({
        title: "Quiz Completed",
        description: "All answers are correct! You can proceed to the next section.",
      });
    } else {
      toast({
        title: "Quiz Attempted",
        description: "Review your answers and try again.",
      });
    }
  };
  
  const isQuizCompleted = () => {
    if (currentSection.type !== 'quiz' || !currentSection.quiz) return false;
    return currentSection.quiz.every((_, i) => quizAnswers[i] !== undefined) && showQuizResults;
  };
  
  const renderSectionContent = () => {
    switch(currentSection.type) {
      case 'text':
        return (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: currentSection.content }} />
          </div>
        );
        
      case 'video':
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-md overflow-hidden relative">
              {/* Placeholder for video - in a real app, use an iframe or video component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center cursor-pointer group">
                  <Play className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
                alt="Video thumbnail" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentSection.content }} />
            </div>
          </div>
        );
        
      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none mb-4">
              <div dangerouslySetInnerHTML={{ __html: currentSection.content }} />
            </div>
            
            {currentSection.quiz?.map((question, qIndex) => (
              <Card key={qIndex} className={showQuizResults ? (quizAnswers[qIndex] === question.correctAnswer ? "border-green-500" : "border-red-500") : ""}>
                <CardContent className="p-4 space-y-4">
                  <h4 className="font-medium text-lg">{question.question}</h4>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div 
                        key={oIndex}
                        className={`p-3 border rounded-md cursor-pointer ${
                          quizAnswers[qIndex] === oIndex 
                            ? 'border-welli-accent bg-welli-background' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${
                          showQuizResults && oIndex === question.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : ''
                        } ${
                          showQuizResults && quizAnswers[qIndex] === oIndex && oIndex !== question.correctAnswer
                            ? 'border-red-500 bg-red-50'
                            : ''
                        }`}
                        onClick={() => !showQuizResults && handleQuizAnswer(qIndex, oIndex)}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border ${
                            quizAnswers[qIndex] === oIndex 
                              ? 'border-welli-accent bg-welli-accent' 
                              : 'border-gray-300'
                          } mr-3 flex items-center justify-center`}>
                            {quizAnswers[qIndex] === oIndex && (
                              <CheckCircle className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {!showQuizResults && (
              <Button 
                onClick={handleSubmitQuiz} 
                disabled={currentSection.quiz?.length !== quizAnswers.filter(a => a !== undefined).length}
                className="w-full"
              >
                Submit Answers
              </Button>
            )}
          </div>
        );
        
      default:
        return <p>Content type not supported</p>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{currentSection.title}</h2>
        <div className="text-sm text-welli-textSecondary">
          Section {currentSectionIndex + 1} of {lesson.sections.length}
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="bg-white rounded-lg shadow p-6">
        {renderSectionContent()}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={currentSection.type === 'quiz' && !isQuizCompleted()}
          className="flex items-center bg-welli-accent hover:bg-welli-accent/90"
        >
          {currentSectionIndex === lesson.sections.length - 1 ? "Complete Lesson" : "Next"} 
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default LessonContent;
