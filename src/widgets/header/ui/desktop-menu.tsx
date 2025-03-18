import { MenuItem } from "../model/types";
import ActiveLink from "./active-link";

interface DesktopMenuProps {
  items: MenuItem[];
}

export default function DesktopMenu({ items }: DesktopMenuProps) {
  return (
    <nav className="hidden sm:flex items-center gap-6">
      {items.map(({ name, href }) => (
        <ActiveLink
          key={name}
          href={href}
          title={name}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        />
      ))}
    </nav>
  );
}
