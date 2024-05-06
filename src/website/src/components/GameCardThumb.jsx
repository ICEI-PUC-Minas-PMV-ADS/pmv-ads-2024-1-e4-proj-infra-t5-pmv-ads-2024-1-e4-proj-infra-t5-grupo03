'use client'

import Image from 'next/image'

function GameCardImage({ src, alt }) {
  if (!src) return null

  /** Suaviza o carregamento da imagem */
  const animateIn = (e) => {
    e.currentTarget.classList.remove('paused')
    e.currentTarget.classList.remove('blur-lg')
  }

  return (
    <Image
      width={480}
      height={480}
      src={src}
      alt={alt}
      className={
        'h-48 scale-110 object-cover blur-lg transition-all duration-300 ease-out animate-in fade-in paused group-hover:scale-100'
      }
      onLoad={animateIn}
      quality={50}
      priority
    />
  )
}

export function GameCardThumb({ alt, src }) {
  return (
    <div className='h-48 w-44 -translate-x-px overflow-hidden rounded-lg ring-1 ring-card/10 saturate-[90%] sepia-[40%] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[101%] group-hover:drop-shadow group-hover:saturate-[120%] group-hover:sepia-0'>
      <GameCardImage alt={alt} src={src} />

      <div className='absolute inset-0 h-48 rounded-lg bg-gradient-to-t from-orange-600/20 via-black/40 via-20% to-orange-600/10 to-95%' />
    </div>
  )
}
