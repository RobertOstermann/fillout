"use client";
import { TriangleAlert } from "lucide-react";

export default function ErrorComponent() {
  return (
    <div className="from-primary/25 to-background flex h-full w-full flex-col bg-linear-to-b">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="text-destructive">
          <TriangleAlert size={64} />
        </div>

        <div className="flex items-center justify-center gap-2">
          <h2 className="text-2xl font-semibold md:text-3xl">Something went wrong</h2>
        </div>

        <p className="text-muted-foreground mx-auto max-w-md text-lg">
          Please refresh or try again later
        </p>
      </div>
    </div>
  );
}
