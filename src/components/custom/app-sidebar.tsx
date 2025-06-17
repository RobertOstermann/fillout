import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Calendar,
  CircleEllipsis,
  EllipsisVertical,
  FileStack,
  Image,
  Mail,
} from "lucide-react";

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
        title: "Switch",
        icon: Activity,
      },
      {
        title: "Multiple Choice",
        icon: CircleEllipsis,
      },
      {
        title: "Email Input",
        icon: Mail,
      },
      {
        title: "Picture Choice",
        icon: Image,
      },
    ],
  },
  {
    label: "Choices",
    items: [
      {
        title: "Dropdown",
        icon: EllipsisVertical,
      },
      {
        title: "Picture Choice",
        icon: Image,
      },
      {
        title: "Multiselect",
        icon: FileStack,
      },
      {
        title: "Date",
        icon: Calendar,
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
            <p className="text-center font-semibold">Form Inputs</p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {items.map((section) => {
          return (
            <SidebarGroup key={section.label}>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              <div className="flex flex-row flex-wrap justify-around gap-2">
                {section.items.map((item) => (
                  <div key={`${section.label}-${item.title}`} className="flex">
                    <SidebarMenuButton
                      size="lg"
                      className="border-fillout-primary h-22 w-26 flex-col items-center justify-between border-1 text-center text-sm text-wrap transition-all duration-200 active:scale-95"
                      tooltip={item.title}
                    >
                      <div className="bg-fillout-primary/25 flex w-full justify-center rounded-md p-1">
                        <item.icon width={18} />
                      </div>
                      <div className="flex h-20 w-full items-center justify-center overflow-hidden">
                        <p className="text-center">{item.title}</p>
                      </div>
                    </SidebarMenuButton>
                  </div>
                ))}
              </div>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
