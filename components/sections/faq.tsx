import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/content/faqs";

/**
 * A list of questions.
 *
 * `type="single"` with `collapsible`: one answer open at a time. A multi-open
 * accordion on a page this long lets a reader accumulate eight open panels
 * and lose their place, and there is no case here where two answers need to
 * be compared side by side.
 */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
