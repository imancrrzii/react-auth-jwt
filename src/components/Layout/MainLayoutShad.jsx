import { useState } from "react";
import SidebarToggle from "../dashboard-shad/SidebarToggle";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayoutShad() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen max-w-screen overflow-hidden">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <SidebarToggle />
      </SidebarProvider>
    </div>
  );
}
