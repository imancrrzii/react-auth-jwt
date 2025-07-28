// axiosInstance.js
import axios from "axios";
import { decryptToken, encryptToken } from "./tokenCrypto";
import { getAccessTokenExpiration } from "./jwt";
import CryptoJS from "crypto-js";


let redirectToLogin = () => {
  console.warn("Redirect function not set in axiosInstance. Please set it.");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

export const setRedirectToLogin = (func) => {
  redirectToLogin = func;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/v1",
});

const refreshAxiosInstance = axios.create({
  baseURL: "http://localhost:9000/v1",
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const clearAuthTokensAndRedirect = (errorMsg = "Sesi Anda telah berakhir.") => {
  console.error(errorMsg);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user-storage");
  redirectToLogin();
};

const refreshAccessToken = async () => {
  try {
    const encryptedRefreshToken = localStorage.getItem("refresh_token");
    if (!encryptedRefreshToken) {
      clearAuthTokensAndRedirect(
        "Refresh token tidak ditemukan. Silakan login ulang."
      );
      throw new Error("Refresh token tidak ditemukan.");
    }

    const refreshToken = decryptToken(encryptedRefreshToken);
    if (!refreshToken) {
      clearAuthTokensAndRedirect(
        "Refresh token tidak valid. Silakan login ulang."
      );
      throw new Error("Gagal mendekripsi refresh token.");
    }

    const response = await refreshAxiosInstance.get(
      "/refresh-token",
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    if (response.data.respCode === "0000") {
      const newAccessToken = response.data.data.access_token;
      const newRefreshToken = response.data.data.refresh_token;

      localStorage.setItem("access_token", encryptToken(newAccessToken));
      if (newRefreshToken) {
        localStorage.setItem("refresh_token", encryptToken(newRefreshToken));
      }
      return newAccessToken;
    } else {
      clearAuthTokensAndRedirect(
        response.data.respMessage || "Refresh token gagal. Silakan login ulang."
      );
      throw new Error(
        response.data.respMessage || "Gagal mendapatkan token baru."
      );
    }
  } catch (error) {
    console.error("Error saat refresh token:", error);
    if (
      !error.message.includes("Refresh token tidak ditemukan") &&
      !error.message.includes("Gagal mendekripsi refresh token") &&
      !error.message.includes("Gagal mendapatkan token baru") // Tambahkan ini
    ) {
      clearAuthTokensAndRedirect(
        "Terjadi kesalahan saat mencoba refresh token. Silakan login ulang."
      );
    }
    throw error; 
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url === "/login" || config.url === "/verify-otp") {
      return config;
    }

    const encryptedToken = localStorage.getItem("access_token");

    if (!encryptedToken) {
      clearAuthTokensAndRedirect(
        "Access token tidak ditemukan. Silakan login ulang."
      );
      return Promise.reject(
        new axios.Cancel("No access token available, redirecting to login.")
      );
    }

    const accessToken = decryptToken(encryptedToken);
    if (!accessToken) {
      clearAuthTokensAndRedirect(
        "Access token rusak atau tidak valid. Silakan login ulang."
      );
      return Promise.reject(
        new axios.Cancel("Invalid access token, redirecting to login.")
      );
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    const clientSecret = import.meta.env.VITE_SECRET_KEY || "your-default-secret"; 

    const httpMethod = config.method?.toUpperCase() || "GET";
    const endpointPath = new URL(config.baseURL + config.url).pathname;

    // Handle body
    let requestBody = "";
    if (config.data) {
      if (typeof config.data === "object") {
        requestBody = JSON.stringify(config.data);
      } else {
        requestBody = config.data;
      }
    }

    const minifiedBody = requestBody.replace(/\s+/g, "").toLowerCase();
    const bodyHash = CryptoJS.SHA256(minifiedBody).toString(CryptoJS.enc.Hex);

    const currentTimestamp = new Date();
    currentTimestamp.setHours(currentTimestamp.getHours() + 7);
    const formattedTime = currentTimestamp.toISOString().slice(0, 19) + "+07:00";

    const stringToSign = `${httpMethod}:${endpointPath}:${accessToken}:${bodyHash}:${formattedTime}`;
    const signature = CryptoJS.HmacSHA512(stringToSign, clientSecret).toString(CryptoJS.enc.Hex);

    // Set headers
    config.headers["X-TIMESTAMP"] = formattedTime;
    config.headers["X-SIGNATURE"] = signature;

    const expirationTime = getAccessTokenExpiration();
    const currentTime = Date.now();
    const REFRESH_THRESHOLD_IN_MS = 10 * 60 * 1000;

    if (
      expirationTime &&
      expirationTime - currentTime < REFRESH_THRESHOLD_IN_MS
    ) {
      console.log(
        "Access token akan segera kedaluwarsa, mencoba me-refresh..."
      );

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await refreshAccessToken();
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return config;
        } catch (error) {
          processQueue(error);
          return Promise.reject(error); 
        } finally {
          isRefreshing = false;
        }
      } else {
        console.log(
          "Refresh sedang berjalan, mengantrekan request:",
          config.url
        );
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            config.headers["Authorization"] = `Bearer ${token}`;
            return config; 
          })
          .catch((err) => {
            console.error(
              "Request diantrekan, refresh gagal. Menolak:",
              config.url,
              err
            );
            return Promise.reject(err);
          });
      }
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh-token"
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await refreshAccessToken();
          localStorage.setItem("access_token", encryptToken(newAccessToken));
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        console.log(
          "Error 401, refresh sedang berjalan, mengantrekan request:",
          originalRequest.url
        );
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest); 
          })
          .catch((err) => {
            console.error(
              "Request diantrekan karena 401, refresh gagal. Menolak:",
              originalRequest.url,
              err
            );
            return Promise.reject(err);
          });
      }
    } else if (
      error.response?.status === 401 &&
      originalRequest.url === "/refresh-token"
    ) {
      // Jika refresh-token itu sendiri mengembalikan 401, langsung redirect
      console.error("Refresh token API returned 401. Session expired.");
      clearAuthTokensAndRedirect(
        "Refresh token tidak valid atau kedaluwarsa. Silakan login ulang."
      );
      return Promise.reject(error); // Tolak error refresh token
    }

    return Promise.reject(error); 
  }
);

export default axiosInstance;
