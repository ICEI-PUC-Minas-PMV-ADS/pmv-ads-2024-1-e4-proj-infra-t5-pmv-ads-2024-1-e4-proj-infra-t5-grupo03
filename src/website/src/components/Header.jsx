import { HomeNavItem } from './HomeNavItem'
import { Marca } from './Marca'
import { NavItem } from './NavItem'
import { Search } from './Search'
import { UserDropdown } from './UserDropdown'
import { Link } from 'lucide-react'
import { Suspense } from 'react'

export function Header() {
  return (
    <header className='sticky top-3 z-40 flex place-content-center'>
      <div className='flex h-14 w-full max-w-6xl items-center justify-between gap-4 rounded-xl border-[0.5px] border-border/20 bg-card/50 p-6 text-card-foreground backdrop-blur-lg'>
        <nav className='flex h-full items-center gap-10'>
          <HomeNavItem />

          <NavItem href={'/lancamentos'}>Lançamentos</NavItem>
        </nav>

        <div className='flex items-center gap-6'>
          <Suspense>
            <Search />
          </Suspense>

          <UserDropdown></UserDropdown>
        </div>
      </div>
    </header>
  )
}
