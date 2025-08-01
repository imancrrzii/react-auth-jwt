
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { encryptData, decryptData } from "../utils/tokenCrypto";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "persist:root",
      getStorage: () => localStorage,
      storage: {
        getItem: (name) => {
          const encrypted = localStorage.getItem(name);
          return encrypted ? decryptData(encrypted) : null;
        },
        setItem: (name, value) => {
          const encrypted = encryptData(value);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default useUserStore;
