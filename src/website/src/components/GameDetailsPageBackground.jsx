'use client'

import Image from 'next/image'

export function GameDetailsPageBackground({ src }) {
  if (!src) return null

  /** Suaviza o carregamento da imagem */
  const animateIn = (e) => {
    e.currentTarget.classList.remove('paused')
    e.currentTarget.classList.remove('blur-lg')
  }

  return (
    <div className='pointer-events-none fixed left-0 top-0 h-screen w-screen opacity-30'>
      <Image
        src={src}
        alt='background'
        fill={true}
        className={
          '-z-50 bg-center object-cover blur-lg ease-out animate-in fade-in paused [animation-duration:5s] [transition-duration:2s]'
        }
        onLoad={animateIn}
        priority
      />

      <div className='fixed left-0 top-0 -z-10 h-screen w-screen overflow-clip bg-gradient-to-b from-transparent from-70% to-background/100 to-90%' />
    </div>
  )
}
