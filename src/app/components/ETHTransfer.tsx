'use client';

import { useState } from 'react';
import { useAccount, useSendTransaction, useBalance, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';

export function ETHTransfer() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: balance, refetch: refetchBalance } = useBalance({
    address: address,
    // watch: true,
  });

  const { sendTransaction, isPending, data: hash } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess, error } = useWaitForTransactionReceipt({ hash });

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

  // Refresh balance after successful transaction
  if (isSuccess && isLoading) {
    setTimeout(() => {
      setAmount('');
      setRecipient('');
      setIsLoading(false);
      refetchBalance();
      alert('ETH transfer successful! 🎉');
    }, 1000);
  }

  if (!isConnected) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Please connect wallet to transfer ETH</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-6">Transfer ETH</h2>
      
      <div className="space-y-4 text-sm">
        {/* Current Balance */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Your wallet:</span>
            <br />
            <span className="font-mono text-xs break-all">{address}</span>
            <br />
            <span className="font-semibold">Balance:</span> {balance ? formatEther(balance.value) : '0'} ETH
          </p>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-semibold mb-2">
            Amount to Send (ETH)
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isPending || isConfirming}
          />
          {balance && amount && parseFloat(amount) > parseFloat(formatEther(balance.value)) && (
            <p className="text-red-500 text-xs mt-1">Insufficient balance</p>
          )}
        </div>

        {/* To Address */}
        <div>
          <label className="block text-xs font-semibold mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isPending || isConfirming}
          />
          {recipient && !isValidAddress(recipient) && (
            <p className="text-red-500 text-xs mt-1">Invalid address format</p>
          )}
        </div>

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          disabled={
            !recipient || 
            !amount || 
            !isValidAddress(recipient) || 
            isPending || 
            isConfirming ||
            isLoading ||
            (balance && parseFloat(amount) > parseFloat(formatEther(balance.value)))
          }
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all text-sm"
        >
          {isPending && 'Waiting for confirmation...'}
          {isConfirming && 'Processing transaction...'}
          {!isPending && !isConfirming && 'Transfer ETH'}
        </button>

        {/* Status Messages */}
        {hash && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-semibold text-green-700 mb-2">
              Transaction Hash:
            </p>
            <a
              href={`https://basescan.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-blue-600 hover:underline break-all"
            >
              {hash}
            </a>
          </div>
        )}

        {isConfirming && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">
              ⏳ Waiting for transaction confirmation...
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              ✅ Transaction successful!
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm font-semibold text-red-700 mb-1">
              ❌ Error:
            </p>
            <p className="text-xs text-red-600">
              {error.message}
            </p>
          </div>
        )}
      </div>

      {/* Warning */}
      <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <p className="text-xs text-orange-800">
          <span className="font-semibold">⚠️ Important Notice:</span>
          <br />
          • Double-check recipient address before transfer
          <br />
          • Transaction cannot be reversed after confirmation
          <br />
          • You will pay gas fees for the transaction
        </p>
      </div>
    </div>
  );
}