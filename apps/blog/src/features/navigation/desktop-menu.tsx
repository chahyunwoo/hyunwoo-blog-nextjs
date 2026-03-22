import type { MenuItem } from '@hyunwoo/shared/types'
import { ActiveLink } from '@/entities/category'

interface DesktopMenuProps {
  items: MenuItem[]
}

export function DesktopMenu({ items }: DesktopMenuProps) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {items.map(({ name, href }) => (
        <ActiveLink key={name} href={href} title={name} className="hover:!bg-transparent" />
      ))}
    </nav>
  )
}
