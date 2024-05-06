import { GameCardGlow } from './GameCardGlow'
import { GameCardThumb } from './GameCardThumb'
import { Card, CardFooter } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Link from 'next/link'

function Name(props) {
  return (
    <p
      className='line-clamp-3 w-24 text-balance text-sm font-semibold text-card-foreground transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110'
      {...props}
    />
  )
}

function Avaliacao({ nota }) {
  return (
    <div
      title='Avaliação da comunidade'
      className='flex h-7 w-12 place-items-center justify-center gap-0.5 rounded-full bg-orange-700/5 ps-0.5 ring-[1px] ring-foreground/10 transition-all duration-300 ease-out  group-hover:scale-110 dark:bg-orange-600/5 dark:ring-foreground/20'
    >
      <span className='z-10 text-xs font-bold leading-5 text-foreground/90 transition-all duration-300 ease-out first-letter:text-sm group-hover:text-foreground/100'>
        {nota.toFixed(1)}
      </span>

      <Star size={14} className='z-10 -translate-y-px' />

      <div className='absolute z-0 h-7 w-12 rounded-full ring-4 ring-orange-600/50 blur transition-all duration-300 ease-out group-hover:ring-orange-600/90' />
    </div>
  )
}

export function GameCard({ slug, name, background_image, rating }) {
  return (
    <Link href={`/${slug}`} prefetch className='group'>
      <GameCardGlow src={background_image} />

      <Card
        title={name}
        className='relative w-44 max-w-48 ring-1
        ring-card/10 transition-all duration-300 ease-out animate-in zoom-in-95 slide-in-from-bottom-4 hover:-translate-y-1 hover:scale-105'
      >
        <GameCardThumb alt={name} src={background_image} />

        <CardFooter className='h-20 p-3'>
          <div className='flex items-center justify-between gap-2 pt-4'>
            <Name>{name}</Name>

            <Avaliacao nota={rating} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
