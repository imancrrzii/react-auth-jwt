// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptToken } from '../utils/tokenCrypto'; // Pastikan path benar
import useUserStore from '../store/useUserStore'; // Jika Anda menggunakan Zustand

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const clearUserStore = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user-storage');
      clearUserStore();
      navigate('/login');
      return;
    }

    const decryptedToken = decryptToken(accessToken);
    if (!decryptedToken) {
      console.warn("Invalid access token in localStorage. Redirecting to login.");
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user-storage');
      clearUserStore(); 
      navigate('/login');
      return; 
    }

    const user = useUserStore.getState().user;
    if (!user) {
        const storedUser = localStorage.getItem('user-storage');
        if (storedUser) {
            try {
                useUserStore.getState().setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data from localStorage:", e);
                localStorage.removeItem('user-storage');
                clearUserStore();
                navigate('/login');
            }
        } else {
            // Jika user data tidak ada di Zustand dan tidak di localStorage,
            // mungkin perlu fetch user data dari API, atau asumsikan perlu login
            // Untuk kesederhanaan, jika tidak ada user data, kita bisa mengarahkan ke login
            console.warn("User data not found. Redirecting to login.");
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user-storage');
            clearUserStore();
            navigate('/login');
            return;
        }
    }

  }, [navigate, clearUserStore]); 

  const accessToken = localStorage.getItem('access_token');
  if (accessToken && decryptToken(accessToken)) {
      return children;
  }

  return null; 
};

export default ProtectedRoute;