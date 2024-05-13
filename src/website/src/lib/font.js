import { Archivo as FontSans } from 'next/font/google'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  declarations: [
    { prop: 'font-stretch', value: '75% 125%' },
    { prop: 'font-feature-settings', value: 'wdth 125' },
    { prop: 'font-variation-settings', value: 'wdth 75% 125%' },
  ],
  axes: ['wdth'],
})

export { fontSans }
