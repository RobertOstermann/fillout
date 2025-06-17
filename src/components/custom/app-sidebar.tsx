import type { LucideIcon } from "lucide-react";
import { Calendar, Home, Paperclip, Trophy, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type Section = {
  label: string;
  items: Item[];
};

type Item = {
  title: string;
  icon: LucideIcon;
};

const items: Section[] = [
  {
    label: "Frequently Used",
    items: [
      {
        title: "Home",
        icon: Home,
      },
      {
        title: "Players",
        icon: Users,
      },
      {
        title: "Entries",
        icon: Calendar,
      },
      {
        title: "Leaders",
        icon: Trophy,
      },
      {
        title: "Documents",
        icon: Paperclip,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="top-(--header-height) ml-6 h-[calc(100svh-var(--header-height))]! pt-4"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <p className="text-center font-semibold">Welcome!</p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {items.map((section) => {
          return (
            <SidebarGroup key={section.label}>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
