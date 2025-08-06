import { useState } from "react";
import SidebarToggle from "../dashboard-shad/SidebarToggle";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayoutShad() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen manrope">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <SidebarToggle />
      </SidebarProvider>
    </div>
  );
}
