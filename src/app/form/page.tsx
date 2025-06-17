import { Button } from "@/components/ui/button";

export default function Form() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <h1 className="from-primary via-primary to-background-primary/85 bg-gradient-to-b via-85% bg-clip-text text-7xl font-bold text-transparent md:text-9xl">
        A form that is a form
      </h1>
      <Button size="lg" className="text-background-primary py-6 text-2xl">
        Go Back
      </Button>
    </div>
  );
}
