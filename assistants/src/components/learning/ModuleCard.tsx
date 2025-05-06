
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  image: string;
}

interface ModuleCardProps {
  module: Module;
}

const ModuleCard = ({ module }: ModuleCardProps) => {
  const { id, title, description, duration, progress, image } = module;
  const isCompleted = progress === 100;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-200 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
            <CheckCircle className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-welli-textSecondary mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-welli-textSecondary" />
          <span className="text-xs text-welli-textSecondary">{duration}</span>
          
          <BookOpen className="h-4 w-4 text-welli-textSecondary ml-2" />
          <span className="text-xs text-welli-textSecondary">5 lessons</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span className={cn(
              isCompleted ? "text-green-600" : "text-welli-textSecondary"
            )}>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          to={`/learning/${id}`}
          className={cn(
            "w-full text-center py-2 rounded-md text-sm font-medium",
            isCompleted 
              ? "bg-welli-background text-welli-accent hover:bg-welli-background/80"
              : "gradient-cta"
          )}
        >
          {isCompleted ? 'Review Module' : 'Continue Learning'}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
