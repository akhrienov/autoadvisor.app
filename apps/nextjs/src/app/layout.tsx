import { ReactNode, FC } from 'react'
import type { Metadata } from 'next'
import { Exo } from 'next/font/google'
import { NextFont } from 'next/dist/compiled/@next/font'

import { Providers } from '@/app/providers'
import { appConfig } from '@/configs'
import '@/styles/globals.scss'

interface RootLayoutProps {
  children: ReactNode
}

const font: NextFont = Exo({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: `${appConfig.name} | ${appConfig.shortDescription}`,
  description: appConfig.longDescription,
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
