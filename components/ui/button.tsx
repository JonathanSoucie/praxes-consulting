import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Violet — the booking CTA and form submits. */
        primary: "bg-accent text-white hover:bg-accent-hover card-raise",
        /* On the dark gradient: solid white pill. */
        onDark: "bg-white text-ink hover:bg-white/90",
        /* On the dark gradient: translucent secondary. */
        onDarkGhost:
          "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/18",
        outline:
          "border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent",
        soft: "bg-accent-soft text-accent-ink hover:bg-accent/15",
        ghost: "text-ink hover:bg-accent-soft hover:text-accent-ink",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12.5 px-7 text-[0.9375rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (e.g. a Next.js <Link>) instead of a <button>. */
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
