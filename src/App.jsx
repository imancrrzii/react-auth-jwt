// src/AppRoot.jsx
import React, { useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { setRedirectToLogin } from './utils/axiosInstance';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/dashboard.jsx';
import MainLayout from './components/Layout/MainLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import useUserStore from './store/useUserStore.jsx';

const App = () => {
  const navigate = useNavigate();
  const clearUserStore = useUserStore((state) => state.clearUser); 

  useEffect(() => {
    setRedirectToLogin(() => {
      clearUserStore();
      navigate('/login');
    });
  }, [navigate, clearUserStore]); 

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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
  );
};

export default App;