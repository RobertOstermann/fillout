import { motion } from "motion/react";

import { LoadingSpinner } from "@/components/custom/loading-spinner";
import { cn } from "@/components/lib/utils";

export type AnimatedStatusProps = {
  status: "idle" | "pending" | "success" | "error";
  className?: string;
};

export function AnimatedStatus({ status, className = "" }: AnimatedStatusProps) {
  if (status === "idle") {
    return null;
  }

  if (status === "pending") {
    return <LoadingSpinner className="size-6 max-w-full stroke-3 text-current" />;
  }

  return (
    <motion.div
      key={status}
      initial={{ scale: 0, opacity: 0 }}
      animate={status}
      variants={{
        success: { scale: 1, opacity: 1 },
        error: { scale: 1, opacity: 1 },
      }}
      transition={{
        type: "spring",
        stiffness: 75,
        damping: 10,
        duration: 1,
      }}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span className="font-semibold text-current">{status === "success" ? "✓" : "!"}</span>
    </motion.div>
  );
}
