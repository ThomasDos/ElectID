'use client'
import Navigation from '@/components/layout/navigation'
import { config } from '@/services/blockchain/connect-kit-client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ConnectKitProvider } from 'connectkit'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <html lang='en'>
          <body className={`${inter.className} min-h-screen`}>
            <Navigation />
            {children}
            <Toaster />
          </body>
        </html>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
