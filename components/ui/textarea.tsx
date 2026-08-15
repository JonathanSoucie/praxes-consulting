import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink transition-colors",
        "placeholder:text-muted focus-visible:border-accent focus-visible:bg-surface",
        "aria-invalid:border-red-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
