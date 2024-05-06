import './globals.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { GridBackground } from '@/components/ui/GridBackground'
import { fontSans } from '@/lib/font'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'Boxgames',
}

export default function RootLayout({ children }) {
  return (
    <html lang='pt-BR' suppressHydrationWarning className='scroll-smooth'>
      <body
        className={cn(
          'dark',
          'scroll-smooth font-sans text-sm tracking-wide subpixel-antialiased',
          fontSans.variable,
        )}
      >
        <div className='grid min-h-screen content-between'>
          <Header />

          <main className='container min-h-[calc(100vh-12rem)] max-w-6xl scroll-smooth  pt-10'>
            {children}
          </main>

          <Footer />
        </div>

        <GridBackground />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
