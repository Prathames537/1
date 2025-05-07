
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Always redirect to the dashboard for assistants
    navigate("/dashboard", { replace: true });
  }, [navigate]);
  return null;
};

export default Index;
