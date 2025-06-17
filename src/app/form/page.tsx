"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Form() {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-2">
      <div
        id="form-reveal"
        className="bg-background border-sidebar-border flex-1 rounded-md border-2 p-4"
      >
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 text-center">
          <h1 className="from-fillout-primary via-fillout-primary/90 to-fillout-primary/80 bg-gradient-to-br bg-clip-text text-7xl font-bold text-transparent md:text-9xl">
            Form Name
          </h1>

          <p className="text-muted-foreground mx-auto max-w-md text-lg">
            The form you're looking for seems to have wandered off into the digital void
          </p>
        </div>
      </div>
      <Button size="lg" className="text-fillout-primary py-6 text-2xl" asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
}
