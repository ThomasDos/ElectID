'use client'
import Navigation from '@/components/layout/navigation'
import { config } from '@/services/connect-kit-client'
import { ConnectKitProvider } from 'connectkit'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { WagmiConfig } from 'wagmi'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ElectID',
  description: 'DAO for the future of identity'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <html lang='en'>
            <body className={inter.className}>
              <Navigation />
              {children}
            </body>
          </html>
        </ConnectKitProvider>
      </WagmiConfig>
    </SessionProvider>
  )
}
