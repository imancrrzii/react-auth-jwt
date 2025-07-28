// jwtUtils.js
import { decryptToken } from "./tokenCrypto";

export const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Gagal mendekode JWT:", e);
    return null;
  }
};

export const getAccessTokenExpiration = () => {
  const encryptedToken = localStorage.getItem("access_token");
  if (!encryptedToken) return null;

  const accessToken = decryptToken(encryptedToken);
  if (!accessToken) return null;

  const decodedToken = decodeJwt(accessToken);
  if (decodedToken && decodedToken.exp) {
    return decodedToken.exp * 1000;
  }
  return null;
};