"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVertical } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { MotionStyle } from "motion/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import type { FormPage } from "@/app/form/page";
import { cn } from "@/components/lib/utils";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type SortableBreadcrumbProps = {
  form: FormPage;
  isActive: boolean;
  isDragging: boolean;
  isDropdownOpen?: boolean;
  openDropdownMenu?: () => void;
};

export function SortableBreadcrumb(props: SortableBreadcrumbProps) {
  const { form, isActive, isDropdownOpen, openDropdownMenu } = props;

  const router = useRouter();
  const { listeners, setNodeRef, transform, transition } = useSortable({
    id: form.id,
  });

  const style: MotionStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      key={form.id}
      ref={setNodeRef}
      // This has some bugs when using dropdown menu items, so leaving disabled
      // layout={isDragging ? false : "position"}
      transition={{ duration: 0.3 }}
      className="z-10"
      style={style}
      {...listeners}
    >
      <BreadcrumbItem>
        {isActive && <DropdownMenuTrigger className="absolute z-0 p-6" tabIndex={-1} />}
        <Button
          variant={isActive ? "outline" : "breadcrumb"}
          className="group z-10"
          onClick={() => {
            if (isActive) {
              openDropdownMenu?.();
            } else {
              router.push(`/form?id=${form.id}`);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (isActive) {
                openDropdownMenu?.();
              } else {
                router.push(`/form?id=${form.id}`);
              }
            }
          }}
          onContextMenu={(e) => {
            if (isActive) {
              e.preventDefault();
              openDropdownMenu?.();
            }
          }}
        >
          <div className="w-4">
            <DynamicIcon
              name={form.icon}
              className={isActive ? "text-breadcrumb-active-foreground size-4.5" : "size-4.5"}
            />
          </div>
          {form.label}
          {isActive && (
            <EllipsisVertical
              className={cn(
                "size-4 max-w-0 overflow-hidden opacity-0 transition-all delay-150 duration-300 group-hover:max-w-4 group-hover:opacity-100 group-focus:max-w-4 group-focus:opacity-100 group-data-[state=open]:max-w-4 group-data-[state=open]:opacity-100",
                isDropdownOpen ? "max-w-4 opacity-100" : "",
              )}
            />
          )}
        </Button>
      </BreadcrumbItem>
    </motion.div>
  );
}
