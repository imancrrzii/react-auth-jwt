import { useEffect, useRef, useState } from "react";
import { HiKey } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import useUserStore from "../../store/useUserStore";
import { RiShutDownLine } from "react-icons/ri";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaGears } from "react-icons/fa6";

export default function ProfileMenu() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleClick = () => setOpen(!open);

  const handleAction = async (action) => {
    if (action === "logout") {
      const no_hp = user?.no_hp || "";

      if (!no_hp) {
        console.error("No phone number, silakan login ulang.");
        setOpen(false);
        return;
      }

      try {
        const response = await axiosInstance.post("/logout", { no_hp });

        if (response.data.respCode === "0000") {
          clearUser();
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("persist:root");
          navigate("/login");
        } else {
          console.error("Logout failed:", response.status, response.data);
        }
      } catch (error) {
        console.error("Logout API error:", error.response?.data || error.message);
        if (
          error.response?.status === 401 ||
          error.message === "Refresh token tidak ditemukan."
        ) {
          clearUser();
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("persist:root");
          navigate("/login");
        }
      }
    } else if (action === "account") {
      console.log("Navigating to account settings...");
    } else if (action === "change-password") {
      console.log("Navigating to change password...");
    }

    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div className="relative ml-auto" ref={menuRef}>
      <button
        onClick={handleClick}
        className="bg-blue-400 rounded-md w-10 h-10 flex items-center justify-center cursor-pointer">
        <IoSettingsSharp className="h-6 w-6 text-white" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-sm border-1 border-gray-200 rounded-lg z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => handleAction("account")}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <FaGears className="w-4 h-4 mr-2" />
                My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAction("change-password")}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <HiKey className="w-4 h-4 mr-2" />
                Ganti Password
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAction("logout")}
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                <RiShutDownLine className="w-4 h-4 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}