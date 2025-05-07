
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const NotFound = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.error("Attempted to access non-existent route - redirecting to dashboard");
    toast({
      title: "Page not found",
      description: "Redirecting you to the dashboard",
      variant: "destructive",
    });
    
    // Redirect to dashboard after a short delay
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 1500);
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-welli-light-green mb-4">
          <svg className="h-10 w-10 text-welli-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Redirecting to Dashboard</h1>
        <p className="text-welli-gray-600">Taking you to a safe place...</p>
      </div>
    </div>
  );
};

export default NotFound;
