import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border border-line bg-surface px-4 py-2 text-sm text-ink transition-colors",
        "placeholder:text-muted focus-visible:border-accent focus-visible:bg-surface",
        "aria-invalid:border-red-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
