'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { 
  getTokenName, 
  getTokenSymbol, 
  getTokenBalance,
  getTotalSupply,
  getMaxSupply
} from '../contracts/MinimalToken';

export default function TokenBalance() {
  const { address, isConnected } = useAccount();
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [totalSupply, setTotalSupply] = useState<string>('0');
  const [maxSupply, setMaxSupply] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch token data when component mounts or wallet connects/changes
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Always fetch basic token info
        const name = await getTokenName();
        const symbol = await getTokenSymbol();
        setTokenName(name);
        setTokenSymbol(symbol);

        // Fetch total supply
        const supply = await getTotalSupply();
        setTotalSupply(supply.formatted);
        
        // Fetch max supply
        const max = await getMaxSupply();
        setMaxSupply(max.formatted);

        // Fetch the user's balance if wallet is connected
        if (isConnected && address) {
          const balanceData = await getTokenBalance(address as `0x${string}`);
          setBalance(balanceData.formatted);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching token data:', err);
        setError('Failed to load token data. Please check your connection and try again.');
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [address, isConnected]);

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="animate-pulse flex flex-col space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 rounded-lg shadow-md">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{tokenName} ({tokenSymbol})</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Token Stats */}
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg text-gray-600 mb-1">Total Supply</h3>
            <p className="text-xl text-gray-800">
              {parseFloat(totalSupply).toLocaleString()} {tokenSymbol}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg text-gray-600 mb-1">Maximum Supply</h3>
            <p className="text-xl text-gray-800">
              {parseFloat(maxSupply).toLocaleString()} {tokenSymbol}
            </p>
          </div>
        </div>
        
        {/* User Balance */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg text-gray-600 mb-2">Your Balance</h3>
          
          {isConnected && address ? (
            <div>
              <p className="text-3xl font-bold text-indigo-600">
                {parseFloat(balance).toLocaleString()} {tokenSymbol}
              </p>
              <p className="text-sm text-gray-500 mt-2 truncate">
                Address: {address}
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">Connect your wallet to view your balance</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Token Progress */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Supply Used</span>
          <span>{((parseFloat(totalSupply) / parseFloat(maxSupply)) * 100).toFixed(2)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${Math.min((parseFloat(totalSupply) / parseFloat(maxSupply)) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}