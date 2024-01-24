import { ReactNode, FC } from 'react'
import type { Metadata } from 'next'
import { Exo } from 'next/font/google'
import { NextFont } from 'next/dist/compiled/@next/font'

import { ReduxProvider } from '@/redux/provider'

import configs from '@/configs'

import '@/styles/globals.scss'

type RootLayoutProps = {
  children: ReactNode
}

const font: NextFont = Exo({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: `${configs.site.name} | ${configs.site.description.short}`,
  description: configs.site.description.long,
  icons: {
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}

export default RootLayout
