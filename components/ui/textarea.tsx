import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-30 w-full rounded-sm border border-line-strong bg-surface px-3 py-2.5 text-sm text-ink transition-colors",
        "placeholder:text-muted focus-visible:border-accent",
        "aria-invalid:border-red-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
