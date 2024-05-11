'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme}
      className='toaster group'
      position='top-center'
      duration={10000}
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-orange-600/5 backdrop-blur-md group-[.toaster]:text-white/90 border-px group-[.toaster]:border-orange-400/5 group-[.toaster]:shadow-lg shadow-orange-400/50 font-display text-lg whitespace-nowrap w-fit h-[5rem] -translate-x-[20%]',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
