"use client";

import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="form-layout" className="flex flex-col bg-linear-to-b">
      <SidebarProvider className="flex flex-col">
        <div className="flex flex-1 overflow-auto">
          <div className="sm:pl-6">
            <AppSidebar />
          </div>
          <div className="flex flex-1 flex-col overflow-auto p-4 pb-0 sm:pr-8">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
