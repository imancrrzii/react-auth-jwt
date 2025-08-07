import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { Calendar, Landmark, PanelsTopLeft, Users } from "lucide-react";
import SidebarMenu from "./SidebarMenuItems";
import Header from "../dashboard-shad/Header";
import { Outlet } from "react-router-dom";
import { SidebarHeader } from "../ui/sidebar";
import logo from "../../assets/images/logo/SIFINA-XL.png";
import logoKecil from "../../assets/images/fitur-1.svg";
import { RiDashboardLine } from "react-icons/ri";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard-shad/dashboard-shad-home",
    icon: RiDashboardLine,
  },
  {
    title: "Pengguna",
    url: "/dashboard-shad/dashboard-shad-user",
    icon: Users,
  },
  {
    title: "Institusi",
    url: "/dashboard-shad/dashboard-shad-institution",
    icon: Landmark,
  },
];

export default function SidebarToggle() {
  const { toggleSidebar, state } = useSidebar();

  const user = {
    name: "Iman Carrazi Syamsidi",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const handleLogout = () => {
    alert("Logout clicked");
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader
          className={`flex items-start justify-center py-6 ${
            state === "collapsed" ? "px-3" : "px-6"
          }`}
        >
          {state === "collapsed" ? (
            <img
              src={logoKecil}
              alt="Logo Kecil"
              className="w-12 transition-all duration-300"
            />
          ) : (
            <img
              src={logo}
              alt="Logo Besar"
              className="w-40 h-auto transition-all duration-300"
            />
          )}
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu items={items} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-1 border-b bg-gray-50">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl border bg-[#b8dbff] hover:bg-gray-200 transition-transform duration-300"
          >
            <PanelsTopLeft className="w-4 h-4 text-sky-900" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
            <Calendar className="w-4 h-4 text-sky-900" />
            <span className="block md:hidden">
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="hidden md:block">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <Header user={user} onLogout={handleLogout} />
        </div>

        <div className="flex-1 overflow-auto py-4 px-6 lg:p-10 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
}
