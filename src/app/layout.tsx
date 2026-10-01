import type { ReactNode } from 'react'

import { Newsreader, Source_Sans_3 } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

import './globals.css'

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700']
})

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700']
})

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: {
    template: '%s — Venerque Autrement',
    default: 'Venerque Autrement — Collectif citoyen'
  },
  description:
    'Liste participative et citoyenne pour un Venerque plus solidaire, respectueux du vivant et démocratique. Programme, valeurs et contact.',
  robots: 'index,follow',
  keywords: ['Venerque', 'Venerque Autrement', 'municipales', 'citoyenneté', 'écologie', 'participation'],
  metadataBase: new URL(appUrl),
  openGraph: {
    title: 'Venerque Autrement',
    description: 'Collectif citoyen pour un autre Venerque — solidarité, transparence, respect du vivant.',
    type: 'website',
    siteName: 'Venerque Autrement',
    url: appUrl,
    locale: 'fr_FR',
    images: [
      {
        url: '/images/logo-venerque-autrement.png',
        type: 'image/png',
        width: 512,
        height: 512,
        alt: 'Logo Venerque Autrement'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venerque Autrement',
    description: 'Collectif citoyen pour un autre Venerque.'
  }
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang='fr'
      className={cn(sourceSans.variable, newsreader.variable, 'flex min-h-full w-full scroll-smooth')}
      suppressHydrationWarning
    >
      <body className='flex min-h-full w-full flex-auto flex-col font-sans antialiased'>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
