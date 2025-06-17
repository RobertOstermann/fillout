import type { LucideProps } from "lucide-react";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/components/lib/utils";

export interface IProps extends LucideProps {
  className?: string;
}

export const LoadingSpinner = ({ className, ...props }: IProps) => {
  return (
    <Loader2Icon className={cn("animate-spin [animation-duration:1.5s]", className)} {...props} />
  );
};
