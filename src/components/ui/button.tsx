import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { AnimatedStatus } from "@/components/custom/animated-status";
import { cn } from "@/components/lib/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-[1px] active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        destructive:
          "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs",
        outline:
          "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        breadcrumb:
          "bg-breadcrumb-background hover:bg-breadcrumb-hover hover:text-accent-foreground border shadow-xs",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      status: {
        idle: "hover:cursor-pointer",
        pending: "pointer-events-none opacity-50 duration-250",
        success: "pointer-events-none duration-250 has-[svg]:text-xl",
        error: "pointer-events-none duration-250 has-[svg]:text-xl",
      },
    },
    compoundVariants: [
      {
        variant: ["default"],
        status: "error",
        class: "bg-destructive/50 dark:bg-destructive/50",
      },
      {
        variant: ["destructive"],
        status: "success",
        class: "bg-primary/50 dark:bg-primary/50",
      },
      {
        variant: ["outline", "ghost"],
        status: "success",
        class: "text-primary border-primary dark:border-primary",
      },
      {
        variant: ["outline", "ghost"],
        status: "error",
        class: "text-destructive border-destructive dark:border-destructive",
      },
      {
        variant: ["secondary"],
        status: "success",
        class: "bg-primary/30 dark:bg-primary/30",
      },
      {
        variant: ["secondary"],
        status: "error",
        class: "bg-destructive/30 dark:bg-destructive/30",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  status = "idle",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const statusElement = (
    <>
      <div className={cn("relative flex items-center justify-center")}>
        <div className={cn("flex items-center gap-2", status !== "idle" && "invisible")}>
          {children}
        </div>

        {status !== "idle" && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            <AnimatedStatus status={status ?? "idle"} />
          </div>
        )}
      </div>
    </>
  );

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, status, className }))}
      {...props}
    >
      {status === "idle" ? children : statusElement}
    </Comp>
  );
}

export { Button, buttonVariants };
