import type { Metadata } from 'next';
import './globals.scss';
import ThemeProvider from './ThemeProvider';
import { AppBase } from '@/app/AppBase';

export const metadata: Metadata = {
  title: 'Climbing Pill',
};

export default function RootLayout({ children }) {

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
  );
}
