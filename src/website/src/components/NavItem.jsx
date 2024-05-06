'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavItem({ href, children }) {
  const searchParamsIndex = href.indexOf('?')

  const hrefPath = href.slice(
    0,
    searchParamsIndex > 0 ? searchParamsIndex : href.length + 1,
  )

  const pathname = usePathname()
  const active = hrefPath === pathname

  return (
    <Link
      href={href}
      className={cn(
        'bg-none text-lg font-bold text-card-foreground/60',
        'data-[active=false]:hover:text-orange-400/75',
        'transition-all duration-300',
        'data-[active=true]:-translate-y-0.5',
        'data-[active=true]:translate-x-0.5',
        'data-[active=true]:scale-105',
        active &&
          `bg-gradient-to-b 
          from-orange-400 
          to-orange-800 
          bg-clip-text 
          text-transparent`,
      )}
      data-active={active}
      prefetch
    >
      {children}
    </Link>
  )
}
