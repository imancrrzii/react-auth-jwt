// import { Calendar, Home, Inbox, PanelsTopLeft, Search, Settings } from "lucide-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { useState } from "react";

// const items = [
//   {
//     title: "Home",
//     url: "home",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

// const SidebarWithToggle = () => {
//   const { toggleSidebar } = useSidebar();
//   return (
//     <>
//       <Sidebar collapsible="icon">
//         <SidebarContent>
//           <SidebarGroup>
//             <SidebarGroupLabel>Application</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild>
//                       <a href={item.url}>
//                         <item.icon />
//                         <span>{item.title}</span>
//                       </a>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>
//       <div className="flex-1 p-4">
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-full border bg-gray-100 hover:bg-gray-200 transition-transform duration-300">
//           <PanelsTopLeft className="w-4 h-4" />
//         </button>
//       </div>
//     </>
//   );
// };

// const DashboardShad = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="flex h-screen">
//       <SidebarProvider open={open} onOpenChange={setOpen}>
//         <SidebarWithToggle />
//       </SidebarProvider>
//     </div>
//   );
// };

// export default DashboardShad;