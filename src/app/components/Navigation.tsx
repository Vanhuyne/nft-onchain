'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';

// Icons (you can replace with your preferred icon library)
const icons = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ),
  token: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
    </svg>
  ),
  nft: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
  ),
  transactions: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  ),
  wallet: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M17 9a1 1 0 00-1-1h-4a2 2 0 110-4h.93a.5.5 0 01.39.192l.38.48a.5.5 0 00.78 0l.38-.48a.5.5 0 01.39-.192H15a2 2 0 012 2v.5a.5.5 0 01-.5.5H15v3a2 2 0 110 4h-4a2 2 0 110-4h4a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1.5a.5.5 0 01-.5-.5V9zM4 8a1 1 0 100-2 1 1 0 000 2zm0 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
};

// Define navigation categories and items
const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: icons.dashboard,
  },
  {
    name: 'Tokens',
    icon: icons.token,
    subItems: [
      { name: 'Transfer Tokens', href: '/tokens/transfer' },
      { name: 'Token Balance', href: '/tokens/balance' },
    ],
  },
  {
    name: 'NFTs',
    icon: icons.nft,
    subItems: [
      { name: 'Transfer NFT', href: '/nfts/transfer' },
      { name: 'My NFT Gallery', href: '/nfts/gallery' },
    ],
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: icons.transactions,
  },
  {
    name: 'Wallet',
    href: '/wallet',
    icon: icons.wallet,
  },
];

export function Navigation() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const { isConnected } = useAccount();

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="bg-white border-r border-gray-200 w-64 h-full">
      <div className="px-4 py-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Onchain App</h2>

        {/* Connection Status */}
        <div className={`mb-6 px-3 py-2 rounded-md ${isConnected ? 'bg-green-50' : 'bg-orange-50'}`}>
          <p className={`text-xs ${isConnected ? 'text-green-800' : 'text-orange-800'}`}>
            {isConnected ? '🟢 Wallet Connected' : '🟠 Wallet Disconnected'}
          </p>
        </div>

        {/* Navigation Items */}
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleCategory(item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${
                      expandedCategory === item.name ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </div>
                    <svg
                      className={`h-4 w-4 transition-transform ${expandedCategory === item.name ? 'transform rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Sub-items */}
                  {expandedCategory === item.name && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link 
                            href={subItem.href}
                            className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors ${
                              isActive(subItem.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${
                    isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}