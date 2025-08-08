import { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { setRedirectToLogin } from "./utils/axiosInstance";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/dashboard.jsx";
import MainLayout from "./components/Layout/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import useUserStore from "./store/useUserStore.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPortalPage from "./pages/LoginPortalPage.jsx";
import About from "./pages/About.jsx";
import MainLayoutShad from "./components/Layout/MainLayoutShad.jsx";
import Homepage from "./pages/dashboard-shad/Homepage.jsx";
import Institution from "./pages/dashboard-shad/Institution.jsx";
import User from "./pages/dashboard-shad/User/User.jsx";
import UserTambah from "./pages/dashboard-shad/User/UserTambah.jsx";
import { Toaster } from "sonner";
import AddUser from "./pages/AddUser.jsx";

const App = () => {
  const navigate = useNavigate();
  const clearUserStore = useUserStore((state) => state.clearUser);
  const user = {
    name: "Iman Carrazi Syamsidi",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  useEffect(() => {
    setRedirectToLogin(() => {
      clearUserStore();
      navigate("/login");
    });
  }, [navigate, clearUserStore]);

  return (
    <>
      <ToastContainer />
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tentang-sifina" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-portal" element={<LoginPortalPage />} />
        <Route path="/verify-otp" element={<LoginPage />} />
        {/* <Route path="/dashboard-shadcn" element={<DashboardShad />} /> */}
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/retribusi/pengguna"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/dashboard-shad" element={<MainLayoutShad />}>
          <Route
            path="dashboard-shad-home"
            element={<Homepage user={user} />}
          />
          <Route path="dashboard-shad-user" element={<User />} />
          <Route path="dashboard-shad-user/tambah" element={<UserTambah />} />
          <Route path="dashboard-shad-institution" element={<Institution />} />
          {/* <Route path="inbox" element={<InboxPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="settings" element={<SettingsPage />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
