"use client";
import React, { Suspense, useEffect, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CircleCheck, Clipboard, Copy, Flag, Pencil, Plus, PlusCircle, Trash } from "lucide-react";
import type { IconName } from "lucide-react/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { SortableBreadcrumb } from "@/app/form/_components/SortableBreadcrumb";
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
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FormPage = {
  id: string;
  label: string;
  icon: IconName;
};

const defaultForms: FormPage[] = [
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

export default function Page() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}

function Form() {
  const router = useRouter();
  const search = useSearchParams();
  const id = search.get("id");

  const [forms, setForms] = useState<FormPage[]>(defaultForms);
  const [selectedForm, setSelectedForm] = useState(
    defaultForms.find((x) => x.id === id) ?? defaultForms.at(0),
  );

  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<false | "rename" | "new">(false);
  const [pageIndex, setPageIndex] = useState<number>();
  const [pageName, setPageName] = useState("");

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPageName(selectedForm?.label ?? "");
  }, [selectedForm]);

  useEffect(() => {
    const form = forms.find((x) => x.id === id);

    if (!form && id !== "ending") {
      router.push("/form");
      return;
    }

    setSelectedForm(forms.find((x) => x.id === id));
  }, [id]);

  const generateUniqueId = (pageName: string) => {
    const baseId = (pageName.trim() ? pageName.trim() : "page")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (!forms.some((form) => form.id === baseId)) {
      return baseId;
    }

    let counter = 1;
    let uniqueId = `${baseId}-${counter}`;

    while (forms.some((form) => form.id === uniqueId)) {
      counter++;
      uniqueId = `${baseId}-${counter}`;
    }

    return uniqueId;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (active.id !== over?.id) {
      setForms((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext sensors={sensors} onDragStart={() => setIsDragging(true)} onDragEnd={handleDragEnd}>
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
        <div className="bg-background border-sidebar-border flex h-(--header-height) w-full items-center overflow-auto overflow-y-hidden rounded-md border-2 px-4">
          <Breadcrumb>
            <SortableContext items={forms.map((x) => x.id)}>
              <BreadcrumbList className="relative">
                {/* Background dotted line */}
                <div className="absolute inset-0 flex items-center">
                  <div className="border-muted-foreground/30 w-[calc(100%-1rem)] border-t-2 border-dotted"></div>
                </div>
                {forms.map((form, index) => {
                  const isActive = form.id === selectedForm?.id;

                  if (isActive) {
                    return (
                      <DropdownMenu
                        key={form.id}
                        open={dropdownMenuOpen}
                        onOpenChange={setDropdownMenuOpen}
                      >
                        <SortableBreadcrumb
                          form={form}
                          isActive={isActive}
                          isDragging={isDragging}
                          isDropdownOpen={dropdownMenuOpen}
                          openDropdownMenu={() => setDropdownMenuOpen(true)}
                        />
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
                            <DropdownMenuItem onClick={() => setDialogOpen("rename")}>
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

                                const duplicatedForm: FormPage = {
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
                        <BreadcrumbSeparator
                          className="opacity-0 transition-all duration-300 hover:cursor-pointer hover:opacity-100 active:scale-95"
                          onClick={() => {
                            setPageIndex(index);
                            setPageName("");
                            setDialogOpen("new");
                          }}
                        >
                          <PlusCircle />
                        </BreadcrumbSeparator>
                      </DropdownMenu>
                    );
                  }

                  return (
                    <React.Fragment key={form.id}>
                      <SortableBreadcrumb form={form} isActive={isActive} isDragging={isDragging} />
                      <BreadcrumbSeparator
                        className="opacity-0 transition-all duration-300 hover:cursor-pointer hover:opacity-100 active:scale-95"
                        onClick={() => {
                          setPageIndex(index);
                          setPageName("");
                          setDialogOpen("new");
                        }}
                      >
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
                          id === "ending"
                            ? "text-breadcrumb-active-foreground size-4.5"
                            : "size-4.5"
                        }
                      />
                      Ending
                    </Link>
                  </Button>
                </BreadcrumbItem>
                <BreadcrumbItem className="pr-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPageIndex(undefined);
                      setPageName("");
                      setDialogOpen("new");
                    }}
                  >
                    <Plus strokeWidth={3} className="size-4.5" />
                    Add Page
                  </Button>
                </BreadcrumbItem>
              </BreadcrumbList>
            </SortableContext>
          </Breadcrumb>
        </div>
        <Dialog open={!!dialogOpen} onOpenChange={(open) => setDialogOpen(open ? "new" : false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogOpen === "new" ? "New" : "Rename"} Page</DialogTitle>
            </DialogHeader>
            <div>
              <Label htmlFor="page-name">Name</Label>
              <Input
                id="page-name"
                name="page name"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={() => {
                  if (dialogOpen === "new") {
                    const newForm: FormPage = {
                      id: generateUniqueId(pageName),
                      label: pageName.trim(),
                      icon: "file-text",
                    };

                    setForms((prevForms) => {
                      const newForms = [...prevForms];
                      newForms.splice((pageIndex ?? forms.length) + 1, 0, newForm);
                      return newForms;
                    });

                    router.push(`/form?id=${newForm.id}`);
                  }

                  if (dialogOpen === "rename" && selectedForm && pageName.trim()) {
                    setForms((prevForms) =>
                      prevForms.map((form) =>
                        form.id === selectedForm.id ? { ...form, label: pageName.trim() } : form,
                      ),
                    );
                    setSelectedForm((prev) => (prev ? { ...prev, label: pageName.trim() } : prev));
                  }
                  setDialogOpen(false);
                }}
              >
                {dialogOpen === "new" ? "Create" : "Rename"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DndContext>
  );
}
