'use client';

import { useState } from 'react';
import { useAccount, useSendTransaction, useBalance } from 'wagmi';
import { parseEther, formatEther } from 'viem';

export function ETHTransfer() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  const { sendTransaction, isPending, error, isSuccess } = useSendTransaction();

  const handleTransfer = async () => {
    if (!recipient || !amount || !isConnected) return;

    try {
      setIsLoading(true);
      await sendTransaction({
        to: recipient as `0x${string}`,
        value: parseEther(amount),
      });
    } catch (err) {
      console.error('Transfer failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">ETH Transfer</h2>
        <p className="text-gray-500">Please connect your wallet to transfer ETH</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Transfer ETH</h2>
      
      {/* Balance Display */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Your Balance:</p>
        <p className="text-lg font-semibold">
          {balance ? formatEther(balance.value) : '0'} ETH
        </p>
      </div>

      {/* Transfer Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {recipient && !isValidAddress(recipient) && (
            <p className="text-red-500 text-sm mt-1">Invalid address format</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            step="0.001"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {balance && amount && parseFloat(amount) > parseFloat(formatEther(balance.value)) && (
            <p className="text-red-500 text-sm mt-1">Insufficient balance</p>
          )}
        </div>

        <button
          onClick={handleTransfer}
          disabled={
            !recipient || 
            !amount || 
            !isValidAddress(recipient) || 
            isPending || 
            isLoading ||
            (balance && parseFloat(amount) > parseFloat(formatEther(balance.value)))
          }
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPending || isLoading ? 'Sending...' : 'Send ETH'}
        </button>

        {/* Status Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              Error: {error.message}
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-600 text-sm">
              Transaction sent successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}