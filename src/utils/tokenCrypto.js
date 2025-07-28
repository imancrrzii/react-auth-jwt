import CryptoJS from "crypto-js";

const SECRET_KEY = "RAHASIA_NEGARA"; 

export const encryptToken = (token) => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

export const decryptToken = (encryptedToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.error("Gagal dekripsi token:", e);
    return null;
  }
};
