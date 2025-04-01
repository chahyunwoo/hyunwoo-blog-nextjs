import type { MenuItem } from "@/types";
import ActiveLink from "@/components/features/navigation/active-link";

interface DesktopMenuProps {
  items: MenuItem[];
}

export default function DesktopMenu({ items }: DesktopMenuProps) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {items.map(({ name, href }) => (
        <ActiveLink
          key={name}
          href={href}
          title={name}
          className="hover:bg-transparent"
        />
      ))}
    </nav>
  );
}
