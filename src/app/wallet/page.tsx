'use client';

import { Layout } from '../components/Layout';
import { useAccount } from 'wagmi';

export default function WalletPage() {
  const { address, isConnected } = useAccount();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Wallet Details</h1>
        
        {!isConnected ? (
          <div className="bg-orange-50 rounded-lg p-6">
            <p className="text-orange-800">
              Please connect your wallet to view wallet details.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Your Address</h2>
              <p className="font-mono text-sm bg-gray-50 p-3 rounded break-all">
                {address}
              </p>
            </div>
            
            {/* Additional wallet details can be added here */}
          </div>
        )}
      </div>
    </Layout>
  );
}