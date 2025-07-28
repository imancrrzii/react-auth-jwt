import { useState } from 'react';
import ProfileMenu from '../dashboard/ProfileMenu';
import Sidebar from '../dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 min-h-screen bg-gray-50 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <div className="flex justify-end items-center px-4 pt-4">
          <ProfileMenu />
        </div>
        <div className="p-4">
             <Outlet />
        </div>
      </div>
    </div>
  );
}
