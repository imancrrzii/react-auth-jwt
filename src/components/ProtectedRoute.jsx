import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decryptToken } from "../utils/tokenCrypto";
import useUserStore from "../store/useUserStore";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const clearUserStore = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("persist:root");
      clearUserStore();
      navigate("/login");
      return;
    }

    const decryptedToken = decryptToken(accessToken);
    if (!decryptedToken) {
      console.warn(
        "Invalid access token in localStorage. Redirecting to login."
      );
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("persist:root");
      clearUserStore();
      navigate("/login");
      return;
    }

    const user = useUserStore.getState().user;
    if (!user) {
      const storedUser = localStorage.getItem("persist:root");
      if (storedUser) {
        try {
          useUserStore.getState().setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user data from localStorage:", e);
          localStorage.removeItem("persist:root");
          clearUserStore();
          navigate("/login");
        }
      } else {
        console.warn("User data not found. Redirecting to login.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("persist:root");
        clearUserStore();
        navigate("/login");
        return;
      }
    }
  }, [navigate, clearUserStore]);

  const accessToken = localStorage.getItem("access_token");
  if (accessToken && decryptToken(accessToken)) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
