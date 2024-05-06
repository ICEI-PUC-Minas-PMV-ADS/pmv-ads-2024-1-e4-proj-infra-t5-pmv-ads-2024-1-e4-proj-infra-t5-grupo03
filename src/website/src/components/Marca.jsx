import { GradientText } from './ui/GradientText'
import { cn } from '@/lib/utils'
import { Gamepad2 } from 'lucide-react'

const GamePadIcon = () => (
  <div
    className={
      'pointer-events-none inset-0 flex items-center justify-center bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text '
    }
  >
    <Gamepad2 className='h-8 w-8 stroke-[1.25px] pe-2 text-muted-foreground' />
  </div>
)

export function Marca({ isHome }) {
  return (
    <div className='relative flex h-full shrink-0 items-center'>
      {/* Colorido = Home ou hover */}
      <GradientText
        className={cn(
          'z-20 from-orange-400 to-orange-800',
          'transition-all duration-300 ease-out',
          `${isHome ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`,
          isHome && 'scale-105',
        )}
      >
        <GamePadIcon />
        Boxgames
      </GradientText>
      {/* Cinza = Demais páginas */}
      <GradientText
        className={cn(
          'absolute z-10',
          'transition-all duration-300 ease-out',
          isHome && 'scale-105',
        )}
      >
        <GamePadIcon />
        Boxgames
      </GradientText>
    </div>
  )
}
