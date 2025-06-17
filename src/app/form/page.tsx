"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Form() {
  return (
    <Button size="lg" className="text-background-primary py-6 text-2xl" asChild>
      <Link href="/">Go Back</Link>
    </Button>
  );
}
