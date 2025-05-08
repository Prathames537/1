import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    toast({
      title: "Page not found",
      description: "Redirecting you to your visits list",
      variant: "destructive",
    });
    const redirectTimer = setTimeout(() => {
      navigate("/assistants/visits");
    }, 1500);
    return () => clearTimeout(redirectTimer);
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-welli-background">
      <div className="text-center max-w-md p-6">
        <div className="w-20 h-20 bg-welli-main/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-welli-accent">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Redirecting to Visits</h1>
        <p className="text-welli-textSecondary mb-6">
          Sorry, we couldn't find the page you're looking for. Taking you to a safe place...
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/assistants/visits">Go to Visits</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/assistants/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
