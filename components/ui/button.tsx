import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Supreme, sentence case, not uppercase. The site's uppercase treatment is
  // reserved for eyebrows — using it on buttons as well leaves the page with
  // two competing families of small tracked caps and no hierarchy between
  // them. `rounded-sm` resolves through the zeroed --radius scale, so buttons
  // are square for the same reason the cards are, and would round again with
  // them if that decision were ever reversed.
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-display font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* The primary CTA. Filled with the THIRD pink, not the first.
           #F8206D behind white type is 4.0:1, which is under AA for a label
           at button size; #B5115B is 6.3:1 and clears it comfortably. The
           brief assigns the third pink to backgrounds, which is exactly what
           this is — and hover brings the main pink in, so the hot colour is
           still what the button does when you touch it. */
        primary: "bg-pink-3 text-white hover:bg-pink",
        /* Secondary on the light ground. */
        outline:
          "border border-ink/20 bg-transparent text-ink hover:border-pink-3 hover:text-pink-ink",
        /* On the deep ground: the polarity inverts. */
        onDeep: "bg-page text-ink hover:bg-white",
        onDeepGhost:
          "border border-white/25 bg-transparent text-page hover:border-white/60 hover:bg-white/5",
        ghost: "text-ink hover:text-pink-ink",
        link: "text-pink-ink underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-13 px-7 text-base",
        xl: "h-15 px-9 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
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
