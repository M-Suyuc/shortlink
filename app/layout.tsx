import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import { inter } from '@/config/fonts'

import SessionProvider from '@/providers/session-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Short Link',
  description:
    'A simple and efficient link shortening application. With ShortLink, you can create custom short links to easily share long URLs. This tool allows you to manage your shortened links and track traffic. Simplify your links with ShortLink!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={`${inter.className} selection:bg-neutral-200/50 dark:selection:bg-neutral-100/15`}>
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <Navbar />
            {children}
          </ThemeProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
