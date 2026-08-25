import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        // A ruled line rather than a box. The form sits on the open white
        // page and a bordered field would be the only rounded, filled thing
        // on the page — an underline reads as a place to write without
        // introducing a shape the design does not otherwise use.
        "w-full border-b border-line bg-transparent py-3 text-base text-ink transition-colors",
        "placeholder:text-muted focus-visible:border-pink focus-visible:outline-none",
        "aria-invalid:border-pink-3",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
