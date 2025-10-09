import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers'; // Make sure you have this providers component for Wagmi/RainbowKit

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OnChain App',
  description: 'An application for interacting with blockchain assets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
