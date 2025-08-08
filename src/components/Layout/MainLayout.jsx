import { useEffect, useState } from 'react';
import ProfileMenu from '../dashboard/ProfileMenu';
import Sidebar from '../dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className="flex-1 min-h-screen bg-gray-50 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <div className="flex justify-end items-center px-4 pt-4">
          <ProfileMenu />
        </div>
        <div className="p-4 w-full max-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
