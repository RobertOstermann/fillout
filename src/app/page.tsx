import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 pt-24 text-center">
      <h1 className="from-primary via-primary to-background-primary/85 bg-gradient-to-b via-85% bg-clip-text text-7xl font-bold text-transparent md:text-9xl">
        Forms that
        <br />
        do it all
      </h1>
      <p className="text-muted-foreground max-w-md text-lg font-semibold">
        Well not really since this is just an interview project
      </p>
      <Button size="lg" className="text-background-primary py-6 text-2xl" asChild>
        <Link href="/form">Get Started - it's free</Link>
      </Button>
    </div>
  );
}
