'use client'

import Image from 'next/image'

export function GameCardGlow({ src }) {
  if (!src) return null

  /** Suaviza o carregamento da imagem */
  const animateIn = (e) => e.currentTarget.classList.remove('paused')

  return (
    <div className='relative'>
      <Image
        src={src}
        alt='glow'
        className={
          'absolute top-1 h-[16.5rem] rounded-lg object-cover opacity-20 blur-lg brightness-75 contrast-150 saturate-200 transition-all  duration-300 ease-out animate-in fade-in paused group-hover:scale-105 group-hover:opacity-90 group-hover:blur-2xl'
        }
        onLoad={animateIn}
        quality={50}
        width={640}
        height={640}
      />
    </div>
  )
}
