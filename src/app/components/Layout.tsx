'use client';

import { Navigation } from './Navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-3 px-6 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">OnChain App</h1>
          <ConnectButton />
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} OnChain App - All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}