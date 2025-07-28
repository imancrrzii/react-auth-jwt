// axiosInstance.js
import axios from "axios";
import { decryptToken, encryptToken } from "./tokenCrypto";
import { getAccessTokenExpiration } from "./jwt";

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

        // --- LOG UNTUK REFRESH TOKEN NORMAL (SETELAH DEKRIPSI, SEBELUM DIKIRIM KE BACKEND) ---
    // console.log("--- Refresh Token Logging ---");
    // console.log("Refresh Token (Decrypted, before sending):", refreshToken);
    // try {
    //   const decodedRefreshToken = decodeJwt(refreshToken);
    //   console.log("Decoded Refresh Token (Payload):", decodedRefreshToken);
    // } catch (e) {
    //   console.warn("Could not decode Refresh Token for logging:", e);
    // }
    // console.log("----------------------------");

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

    const expirationTime = getAccessTokenExpiration();
    const currentTime = Date.now();
    const REFRESH_THRESHOLD_IN_MS = 10 * 60 * 1000;
  //  const REFRESH_THRESHOLD_IN_MS = 110000; // debug 1 menit

    // console.log("Access Token Check:");
    // console.log("Expiration Time (ms):", expirationTime);
    // console.log("Current Time (ms):", currentTime);
    // console.log("Time left (ms):", expirationTime - currentTime);
    // console.log("Refresh threshold (ms):", REFRESH_THRESHOLD_IN_MS);
    // console.log(
    //   "Is within refresh threshold?",
    //   expirationTime && expirationTime - currentTime < REFRESH_THRESHOLD_IN_MS
    // );

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
