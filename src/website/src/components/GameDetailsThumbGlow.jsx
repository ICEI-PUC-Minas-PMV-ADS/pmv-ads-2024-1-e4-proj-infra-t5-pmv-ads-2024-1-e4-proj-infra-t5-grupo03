'use client'

import Image from 'next/image'

export function GameDetailsThumbGlow({ src }) {
  if (!src) return null

  /** Suaviza o carregamento da imagem */
  const animateIn = (e) => e.currentTarget.classList.remove('paused')

  return (
    <div className={'relative'}>
      <Image
        src={src}
        alt={'glow'}
        className={
          'absolute top-1 z-0 h-[18.5rem] scale-110 rounded-lg object-cover opacity-70 blur-xl brightness-75 contrast-150 saturate-200 transition-all duration-500 ease-out animate-in fade-in paused'
        }
        onLoad={animateIn}
        quality={50}
        width={768}
        height={1024}
      />
    </div>
  )
}
