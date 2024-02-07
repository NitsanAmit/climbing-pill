import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from './theme-provider'
import { AppBase } from '@/app/AppBase';

export const metadata: Metadata = {
  title: 'Climbing Pill',
}

export default function RootLayout({ children, }) {

  return (
    <html lang="en">
    <body>
    <ThemeProvider>
      <AppBase>
        {children}
      </AppBase>
    </ThemeProvider>
    </body>
    </html>
  )
}
