import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full resize-y border-b border-line bg-transparent py-3 text-base text-ink transition-colors",
        "placeholder:text-muted focus-visible:border-pink focus-visible:outline-none",
        "aria-invalid:border-pink-3",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
