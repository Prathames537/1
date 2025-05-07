
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Always redirect to the dashboard for doctors
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
};

export default Index;
