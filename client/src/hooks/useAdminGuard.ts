import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useAdminGuard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) return;
    if (!user || user.role !== "ADMIN") {
      navigate("/profile");
    }
  }, [user]);

  return user?.role === "ADMIN";
}
