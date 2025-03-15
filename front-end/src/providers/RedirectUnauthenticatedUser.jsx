import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";

function RedirectUnauthenticatedUser({ children }) {

    const { user } = useAuthStore();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    }, [user, navigate]);
  
    
    if (!user) {
      return null; 
    }
  

  return <>{children}</>;
}

export default RedirectUnauthenticatedUser