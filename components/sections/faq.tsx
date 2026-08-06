import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/content/faqs";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    // The first answer is open on arrival — this is the best objection-handling
    // copy on the site and it was costing a click to see any of it.
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="space-y-3"
    >
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
