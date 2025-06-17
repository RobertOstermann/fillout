"use client";
import React, { useEffect, useState } from "react";
import { CircleCheck, EllipsisVertical, Plus, PlusCircle } from "lucide-react";
import type { IconName } from "lucide-react/dynamic";
import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

type Form = {
  id: string;
  label: string;
  icon: IconName;
};

const defaultForms: Form[] = [
  {
    id: "info",
    label: "Info",
    icon: "info",
  },
  {
    id: "details",
    label: "Details",
    icon: "file-text",
  },
  {
    id: "other",
    label: "Other",
    icon: "file-text",
  },
];

export default function Form() {
  const search = useSearchParams();
  const id = search.get("id");

  const [forms, setForms] = useState<Form[]>(defaultForms);
  const [selectedForm, setSelectedForm] = useState(defaultForms.find((x) => x.id === id));

  useEffect(() => {
    setSelectedForm(defaultForms.find((x) => x.id === id));
  }, [id]);

  return (
    <div className="flex flex-1 flex-col gap-4 pb-2">
      <div
        id="form-reveal"
        className="bg-background border-sidebar-border flex-1 rounded-md border-2 p-4"
      >
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 text-center">
          <h1 className="from-primary via-primary to-fillout-primary/85 bg-gradient-to-b via-70% bg-clip-text text-7xl font-bold text-transparent md:text-9xl">
            {selectedForm?.label ?? "Form"}
          </h1>

          <p className="text-muted-foreground mx-auto max-w-md text-lg">
            The form you're looking for seems to have wandered off into the digital void
          </p>
        </div>
      </div>
      <div className="bg-background border-sidebar-border flex h-(--header-height) w-full items-center justify-center rounded-md border-2">
        <Breadcrumb>
          <BreadcrumbList className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="border-muted-foreground/30 w-full border-t-2 border-dotted"></div>
            </div>
            {forms.map((form, index) => {
              const isActive = form.id === selectedForm?.id;
              const lastItem = forms.length - 1 === index;

              if (isActive) {
                return (
                  <React.Fragment key={form.id}>
                    <BreadcrumbItem>
                      <Button variant={isActive ? "outline" : "breadcrumb"} className="group">
                        <div className="w-4">
                          <DynamicIcon
                            name={form.icon}
                            className={
                              isActive ? "text-breadcrumb-active-foreground size-4.5" : "size-4.5"
                            }
                          />
                        </div>
                        {form.label}
                        <EllipsisVertical className="size-4 max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-4 group-hover:opacity-100 group-focus:max-w-4 group-focus:opacity-100" />
                      </Button>
                    </BreadcrumbItem>
                    {!lastItem && (
                      <BreadcrumbSeparator className="opacity-0 transition-all duration-300 hover:cursor-pointer hover:opacity-100 active:scale-95">
                        <PlusCircle />
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                );
              }

              return (
                <React.Fragment key={form.id}>
                  <BreadcrumbItem>
                    <Button variant={isActive ? "outline" : "breadcrumb"} asChild>
                      <Link href={`/form?id=${form.id}`}>
                        <div className="w-4">
                          <DynamicIcon
                            name={form.icon}
                            className={
                              isActive ? "text-breadcrumb-active-foreground size-4.5" : "size-4.5"
                            }
                          />
                        </div>
                        {form.label}
                      </Link>
                    </Button>
                  </BreadcrumbItem>
                  {!lastItem && (
                    <BreadcrumbSeparator className="opacity-0 transition-all duration-300 hover:cursor-pointer hover:opacity-100 active:scale-95">
                      <PlusCircle />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
            <BreadcrumbItem>
              <Button variant={id === "ending" ? "outline" : "breadcrumb"} asChild>
                <Link href="/form?id=ending">
                  <CircleCheck
                    className={
                      id === "ending" ? "text-breadcrumb-active-foreground size-4.5" : "size-4.5"
                    }
                  />
                  Ending
                </Link>
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button variant="outline">
                <Plus strokeWidth={3} className="size-4.5" />
                Add Page
              </Button>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
