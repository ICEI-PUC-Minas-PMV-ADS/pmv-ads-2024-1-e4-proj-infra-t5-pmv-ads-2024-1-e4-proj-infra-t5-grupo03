'use client'

import { GameDetailsThumbGlow } from './GameDetailsThumbGlow'
import Image from 'next/image'

export function GameDetailsThumb({ src }) {
  if (!src) return null

  /** Suaviza o carregamento da imagem */
  const animateIn = (e) => {
    e.currentTarget.classList.remove('paused')
    e.currentTarget.classList.remove('blur-lg')
  }

  return (
    <div className='relative '>
      <GameDetailsThumbGlow src={src} />

      <Image
        width={768}
        height={1024}
        src={src}
        alt='Capa'
        className={
          'relative z-10 mb-3 h-72 w-full rounded-xl object-cover object-center ring-1 ring-card/10 blur-lg transition-all duration-500 ease-out animate-in fade-in paused'
        }
        quality={50}
        onLoad={animateIn}
        priority
      />
    </div>
  )
}
