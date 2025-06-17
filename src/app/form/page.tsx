"use client";
import React, { useEffect, useState } from "react";
import {
  CircleCheck,
  Clipboard,
  Copy,
  EllipsisVertical,
  Flag,
  Pencil,
  Plus,
  PlusCircle,
  Trash,
} from "lucide-react";
import type { IconName } from "lucide-react/dynamic";
import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const router = useRouter();
  const search = useSearchParams();
  const id = search.get("id");

  const [forms, setForms] = useState<Form[]>(defaultForms);
  const [selectedForm, setSelectedForm] = useState(defaultForms.find((x) => x.id === id));

  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameDialogName, setRenameDialogName] = useState("");

  useEffect(() => {
    setRenameDialogName(selectedForm?.label ?? "");
  }, [selectedForm]);

  useEffect(() => {
    setSelectedForm(forms.find((x) => x.id === id));
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
      <div className="bg-background border-sidebar-border flex h-(--header-height) w-full items-center overflow-auto rounded-md border-2 px-4">
        <Breadcrumb>
          <BreadcrumbList className="relative">
            {/* Background dotted line */}
            <div className="absolute inset-0 flex items-center">
              <div className="border-muted-foreground/30 w-[calc(100%-1rem)] border-t-2 border-dotted"></div>
            </div>
            {forms.map((form) => {
              const isActive = form.id === selectedForm?.id;

              if (isActive) {
                return (
                  <DropdownMenu key={form.id}>
                    <BreadcrumbItem>
                      <DropdownMenuTrigger asChild>
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
                          <EllipsisVertical className="size-4 max-w-0 overflow-hidden opacity-0 transition-all delay-150 duration-300 group-hover:max-w-4 group-hover:opacity-100 group-focus:max-w-4 group-focus:opacity-100 group-data-[state=open]:max-w-4 group-data-[state=open]:opacity-100" />
                        </Button>
                      </DropdownMenuTrigger>
                    </BreadcrumbItem>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel>Settings</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => {
                            setForms((prevForms) => {
                              const formToMove = prevForms.find((x) => x.id === form.id);
                              if (!formToMove) return prevForms;

                              const remainingForms = prevForms.filter((x) => x.id !== form.id);
                              return [formToMove, ...remainingForms];
                            });
                          }}
                        >
                          <Flag fill="blue" /> Set as first page
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRenameDialogOpen(true)}>
                          <Pencil /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clipboard /> Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            const currentIndex = forms.findIndex((f) => f.id === form.id);
                            const baseName = form.label;

                            let duplicateNumber = 1;
                            while (
                              forms.some((f) => f.label === `${baseName} (${duplicateNumber})`)
                            ) {
                              duplicateNumber++;
                            }

                            const duplicatedForm: Form = {
                              id: `${form.id}-${duplicateNumber}`,
                              label: `${baseName} (${duplicateNumber})`,
                              icon: form.icon,
                            };

                            setForms((prevForms) => {
                              const newForms = [...prevForms];

                              let insertIndex = currentIndex + 1;
                              while (
                                insertIndex < newForms.length &&
                                newForms[insertIndex].label.startsWith(`${baseName} (`)
                              ) {
                                insertIndex++;
                              }

                              newForms.splice(insertIndex, 0, duplicatedForm);
                              return newForms;
                            });
                          }}
                        >
                          <Copy /> Duplicate
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setForms((prevForms) => prevForms.filter((f) => f.id !== form.id));
                            if (selectedForm?.id === form.id) {
                              const remainingForms = forms.filter((f) => f.id !== form.id);
                              if (remainingForms.length > 0) {
                                router.push(`/form?id=${remainingForms[0].id}`);
                              } else {
                                router.push("/form?id=ending");
                              }
                            }
                          }}
                        >
                          <Trash className="text-destructive" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                    <BreadcrumbSeparator className="opacity-0 transition-all duration-300 hover:cursor-pointer hover:opacity-100 active:scale-95">
                      <PlusCircle />
                    </BreadcrumbSeparator>
                  </DropdownMenu>
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
                  <BreadcrumbSeparator className="opacity-0 transition-all duration-300 hover:cursor-pointer hover:opacity-100 active:scale-95">
                    <PlusCircle />
                  </BreadcrumbSeparator>
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
            <BreadcrumbItem className="pr-4">
              <Button variant="outline">
                <Plus strokeWidth={3} className="size-4.5" />
                Add Page
              </Button>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Page</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="page-name">Page Name</Label>
            <Input
              id="page-name"
              name="page name"
              value={renameDialogName}
              onChange={(e) => setRenameDialogName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => setRenameDialogOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                if (selectedForm && renameDialogName.trim()) {
                  setForms((prevForms) =>
                    prevForms.map((form) =>
                      form.id === selectedForm.id
                        ? { ...form, label: renameDialogName.trim() }
                        : form,
                    ),
                  );
                  setSelectedForm((prev) =>
                    prev ? { ...prev, label: renameDialogName.trim() } : prev,
                  );
                }
                setRenameDialogOpen(false);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
