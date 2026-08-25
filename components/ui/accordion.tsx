"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

/**
 * A ruled list rather than a stack of cards.
 *
 * The card version put a border and a fill around every question, which on a
 * page that is otherwise open white read as eight boxes competing with the
 * headline above them. A hairline between items does the same structural job
 * and leaves the negative space intact.
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-line first:border-t", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-start justify-between gap-8 py-6 text-left font-display text-lg text-ink transition-colors hover:text-pink-ink sm:text-xl",
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          className="mt-1 size-5 shrink-0 text-pink-ink transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-data-[state=open]:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("measure-wide pb-8 text-ink-soft", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
