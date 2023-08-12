'use client'
import Navigation from '@/components/layout/navigation'
import { config } from '@/services/blockchain/connect-kit-client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ConnectKitProvider } from 'connectkit'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'
import './globals.css'

const poppins = Poppins({ weight: ['300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <html lang='en'>
          <body className={`${poppins.className} min-h-screen max-w-screen`}>
            <Navigation />
            {children}
            <Toaster />
          </body>
        </html>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
