import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiChevronLeft, HiChevronDown, HiHome } from "react-icons/hi";
import { MdHistory } from "react-icons/md";
import {
  LuHouse,
  LuQrCode,
  LuUsers,
} from "react-icons/lu";
import { FaCreditCard, FaTools } from "react-icons/fa";
import logo2 from "../../assets/images/logo-3.png";
import logoMini from "../../assets/images/logo-kecil.svg";

export default function Sidebar({ collapsed, setCollapsed }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (label) => {
    setActiveMenu((prev) => (prev === label ? null : label));
  };

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

  const layananGroup = {
    label: "Retribusi",
    icon: <FaTools className="h-5 w-5" />,
    items: [
      {
        name: "Pengguna",
        path: "/retribusi/pengguna",
        icon: <LuUsers className="h-5 w-5" />,
      },
      {
        name: "Institusi",
        path: "/retribusi/institusi",
        icon: <LuHouse className="h-5 w-5" />,
      },
    ],
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white text-black transition-all duration-300 border-r-1 border-gray-200 shadow-xs ${
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
          className="absolute top-12 -right-3 bg-white text-gray-800 rounded-xl shadow p-0 hover:bg-gray-200 transition-all cursor-pointer"
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
              <div className="px-4 text-gray-400 text-xs mb-2 font-normal">
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
                  } py-3 mb-1 rounded hover:bg-blue-300 transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-500 font-semibold"
                      : "text-black"
                  }`
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

        <div className="mb-4">
          {!collapsed && (
            <div className="px-4 text-gray-400 text-xs mb-2 font-normal">
              {layananGroup.label}
            </div>
          )}
          <button
            onClick={() => toggleMenu(layananGroup.label)}
            className={`w-full flex items-center ${
              collapsed ? "justify-center" : "px-4"
            } py-3 mb-1 rounded hover:bg-blue-300 transition-colors ${
              activeMenu === layananGroup.label
                ? "bg-blue-100 text-blue-500 font-semibold"
                : "text-black"
            }`}
          >
            {!collapsed ? (
              <>
                <div className="flex items-center gap-2 flex-1">
                  {React.cloneElement(layananGroup.icon, {
                    className: "h-5 w-5",
                  })}
                  <span className="font-bold text-sm">
                    {layananGroup.label}
                  </span>
                </div>
                <HiChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    activeMenu === layananGroup.label ? "rotate-180" : ""
                  }`}
                />
              </>
            ) : (
              React.cloneElement(layananGroup.icon, {
                className: "h-5 w-5 mx-auto",
              })
            )}
          </button>

          {/* Submenu */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeMenu === layananGroup.label ? "max-h-60" : "max-h-0"
            }`}
          >
            {layananGroup.items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "justify-center" : "px-8"
                  } py-3 text-sm font-semibold mb-1 rounded hover:bg-blue-300 transition-colors cursor-pointer ${
                    isActive
                      ? "bg-blue-100 text-blue-500 font-semibold"
                      : "text-black"
                  }`
                }
              >
                {React.cloneElement(item.icon, {
                  className: `h-5 w-5 ${collapsed ? "mx-auto" : ""}`,
                })}
                {!collapsed && <span className="ml-2">{item.name}</span>}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
