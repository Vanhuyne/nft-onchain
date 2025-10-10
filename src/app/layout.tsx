import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ContextProvider from './providers';
import { headers } from 'next/headers';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OnChain App',
  description: 'An application for interacting with blockchain assets',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const headersObj = await headers();
  const cookies = headersObj.get('cookie')
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
