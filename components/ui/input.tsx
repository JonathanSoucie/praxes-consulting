import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-sm border border-line-strong bg-surface px-3 py-2 text-sm text-ink transition-colors",
        "placeholder:text-muted focus-visible:border-accent",
        "aria-invalid:border-red-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
