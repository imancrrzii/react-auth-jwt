import { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { setRedirectToLogin } from "./utils/axiosInstance";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/dashboard.jsx";
import MainLayout from "./components/Layout/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import useUserStore from "./store/useUserStore.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPortalPage from "./pages/LoginPortalPage.jsx";
import About from "./pages/About.jsx";

const App = () => {
  const navigate = useNavigate();
  const clearUserStore = useUserStore((state) => state.clearUser);

  useEffect(() => {
    setRedirectToLogin(() => {
      clearUserStore();
      navigate("/login");
    });
  }, [navigate, clearUserStore]);

  return (
    <> 
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tentang-sifina" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-portal" element={<LoginPortalPage />} />
        <Route path="/verify-otp" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;