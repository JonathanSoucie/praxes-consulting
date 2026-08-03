import {
  BarChart3,
  ClipboardCheck,
  FileStack,
  MessagesSquare,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { Service } from "@/content/services";

/**
 * Named icon lookup, so content files can reference an icon by string without
 * importing React components into the data layer.
 */
const icons: Record<Service["icon"], LucideIcon> = {
  BarChart3,
  ClipboardCheck,
  FileStack,
  MessagesSquare,
  Search,
  Workflow,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: Service["icon"];
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon aria-hidden strokeWidth={1.5} className={className} />;
}
