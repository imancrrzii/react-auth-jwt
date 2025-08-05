import { NavLink } from "react-router-dom";
import { HiChevronLeft, HiHome } from "react-icons/hi";
import logo2 from "../../assets/images/logo-3.png";
import logoMini from "../../assets/images/logo-kecil.svg";
import React from "react";
import { MdHistory } from "react-icons/md";
import { LuQrCode } from "react-icons/lu";
import { FaCreditCard } from "react-icons/fa";

export default function Sidebar({ collapsed, setCollapsed }) {
  const menuGroups = [
    {
      label: "Dashboard",
      items: [
        {
          name: "Beranda",
          path: "/dashboard",
          icon: <HiHome className="h-5 w-5" />,
        },
        {
          name: "Informasi Rekening",
          path: "/info-rekening",
          icon: <MdHistory className="h-5 w-5" />,
        },
      ],
    },
    {
      label: "QRIS",
      items: [
        {
          name: "Informasi QRIS",
          path: "/qris",
          icon: <LuQrCode className="h-5 w-5" />,
        },
      ],
    },
    {
      label: "Virtual Account",
      items: [
        {
          name: "Informasi VA",
          path: "/va",
          icon: <FaCreditCard className="h-5 w-5" />,
        },
      ],
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white text-black transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="relative flex items-center justify-between px-4 py-4">
        <img
          src={collapsed ? logoMini : logo2}
          alt="Logo"
          className="h-16 object-contain transition-all duration-300"
        />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-12 -right-3 bg-white text-gray-800 rounded-xl shadow p-0 hover:bg-gray-200 transition-all"
        >
          <HiChevronLeft
            className={`h-8 w-8 transform transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <div className="mt-4 px-2 py-2">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            {!collapsed && (
              <div className="px-2 text-gray-400 text-xs mb-2 font-normal">
                {group.label}
              </div>
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "justify-center" : "px-4"
                  } py-3 mb-1 rounded hover:bg-blue-300 ${
                    isActive ? "bg-blue-100 rounded-lg" : ""
                  } ${isActive ? "text-blue-500" : "text-black"}`
                }
              >
                {React.cloneElement(item.icon, {
                  className: `h-5 w-5 ${collapsed ? "mx-auto" : ""}`,
                })}
                {!collapsed && (
                  <span className="ml-2 font-bold text-sm">{item.name}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
