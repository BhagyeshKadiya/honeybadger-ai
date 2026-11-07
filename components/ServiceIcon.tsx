import { Code2, Database, Globe, LayoutDashboard, Rocket, Search, Smartphone, Workflow, type LucideProps } from "lucide-react";
import type { ServiceIcon as IconName } from "@/content/services";

const MAP = {
  globe: Globe,
  layout: LayoutDashboard,
  smartphone: Smartphone,
  workflow: Workflow,
  database: Database,
  rocket: Rocket,
  search: Search,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function ServiceIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = MAP[name] ?? Code2;
  return <Icon aria-hidden="true" {...props} />;
}

