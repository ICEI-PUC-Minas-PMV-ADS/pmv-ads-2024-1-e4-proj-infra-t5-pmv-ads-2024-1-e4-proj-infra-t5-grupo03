'use client'

import { Marca } from './Marca'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HomeNavItem() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <Link href='/?page=1' title='Página inicial' className='group h-full'>
      <Marca {...{ isHome }} />
    </Link>
  )
}
