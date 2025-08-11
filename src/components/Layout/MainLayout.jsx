import { useEffect, useState } from "react";
import ProfileMenu from "../dashboard/ProfileMenu";
import Sidebar from "../dashboard/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;

  // Detect screen size and collapse sidebar if small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen max-w-screen overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className="flex-1 min-h-screen bg-gray-50 transition-all duration-300 overflow-x-hidden"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <div className="flex justify-end items-center px-6 pt-4">
          <ProfileMenu />
        </div>
        <div className="flex-1 bg-gray-50">
          <div className="h-full w-full py-4 px-3 lg:px-6 lg:p-10">
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
