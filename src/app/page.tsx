'use client';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { Layout } from './components/Layout';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { WalletInfo } from "./components/WalletInfo";
import { NFTGalleryWeb3 } from "./components/NFTGalleryWeb3";
import { NFTTransfer } from "./components/NFTTransfer";
import { ETHTransfer } from "./components/ETHTransfer";
import TokenBalance from "./components/TokenBalance";
import { TokenTransfer } from "./components/TokenTransfer";


export default function Home() {
  const { isConnected } = useAccount();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to OnChain App</h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your tokens and NFTs in one place
          </p>
          
          {!isConnected ? (
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <p className="text-blue-800 mb-4">
                Connect your wallet to access all features
              </p>
            </div>
          ) : (
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <p className="text-green-800 mb-4">
                Your wallet is connected! Explore the app features.
              </p>
            </div>
          )}
        </section>

        {/* Quick Access Tiles */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Token Transfer Tile */}
          <Link href="/tokens/transfer"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Transfer Tokens</h2>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Send tokens to any address quickly and securely.
            </p>
            <span className="text-blue-600 text-sm font-medium">
              Send tokens →
            </span>
          </Link>

          {/* NFT Transfer Tile */}
          <Link href="/nfts/transfer"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Transfer NFTs</h2>
              <div className="bg-purple-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Transfer your NFTs to another wallet or marketplace.
            </p>
            <span className="text-purple-600 text-sm font-medium">
              Transfer NFTs →
            </span>
          </Link>
        </section>

        {/* Features Overview */}
        <section className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">App Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Token Management</h3>
              <p className="text-gray-600">
                Transfer, view balances, and manage your tokens easily.
              </p>
            </div>

            <div className="p-4">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">NFT Features</h3>
              <p className="text-gray-600">
                Transfer NFTs and view your NFT collection with rich metadata.
              </p>
            </div>

            <div className="p-4">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Wallet</h3>
              <p className="text-gray-600">
                Safely connect your wallet and manage your digital assets.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}