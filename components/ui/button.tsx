import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Work Sans, sentence case, not uppercase. The site's uppercase treatment is
  // reserved for eyebrows — using it on buttons as well leaves the page with
  // two competing families of small tracked caps and no hierarchy between
  // them. The UI face rather than the display face because a button is
  // something the reader operates: Supreme is drawn for headlines and starts
  // working against itself at label sizes. `rounded-sm` resolves through the
  // zeroed --radius scale, so buttons are square for the same reason the
  // cards are, and would round again with them if that were ever reversed.
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-ui font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* The primary CTA. Filled with the THIRD pink, not the first.
           #F8206D behind white type is 4.0:1, under AA for a label at button
           size; #B5115B is 6.3:1 and clears it.

           Hover goes to the near-black rather than to the hot pink. It used
           to bring #F8206D in, which meant the button LOST contrast the
           moment you pointed at it — 6.3:1 down to 4.0:1 — and hover is the
           one state that should never be the weakest. --color-deep is not
           overridden by `on-deep`, so this stays near-black wherever the
           button lands: 17.5:1 with the white label. */
        primary: "bg-pink-3 text-white hover:bg-deep",

        /* Secondary, and ground-agnostic.

           The border was `ink/20`, which composites to about #CDCDCD on the
           page — 1.5:1, against the 3:1 that WCAG asks of a control boundary.
           A button whose edge you cannot locate is not a low-contrast button,
           it is an invisible one. It is now the full ink, 15.9:1.

           Every colour here is a token that `on-deep` redefines, so the
           variant inverts by itself: on the page it is black on white, inside
           a dark band it is white on black, and the hover fill swaps ink and
           card in both directions. That is what let `onDeepGhost` go — it was
           this variant with a 2.3:1 border. */
        outline:
          "border border-ink bg-transparent text-ink hover:bg-ink hover:text-card",

        /* Filled, on the deep ground.

           The label is `text-deep`, NOT `text-ink`. This one only appears
           inside `on-deep`, and that utility redefines --color-ink to
           near-white for the copy around it — so `text-ink` on a white fill
           rendered a blank white block with an invisible label. --color-deep
           is not among the tokens it overrides, which is what makes it safe.
           17.5:1, and hover holds it. */
        onDeep: "bg-page text-deep hover:bg-white",

        ghost: "text-ink hover:bg-ink/8 hover:text-pink-ink",
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
