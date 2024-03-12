'use client'
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

import { ReduxProvider } from '@/redux/provider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  )
}
