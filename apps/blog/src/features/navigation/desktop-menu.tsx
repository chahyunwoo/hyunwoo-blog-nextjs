import ActiveLink from '@/entities/category/ui/active-link'
import type { MenuItem } from '@hyunwoo/shared/types'

interface DesktopMenuProps {
  items: MenuItem[]
}

export default function DesktopMenu({ items }: DesktopMenuProps) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {items.map(({ name, href }) => (
        <ActiveLink key={name} href={href} title={name} className="hover:!bg-transparent" />
      ))}
    </nav>
  )
}
