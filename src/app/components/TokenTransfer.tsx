'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';
import { parseUnits, formatUnits } from 'viem';
import { tokenAbi, tokenAddress } from '../contracts/MinimalToken'; // Import from your token file

interface TransferFormData {
  amount: string;
  toAddress: string;
}

export function TokenTransfer() {
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState<TransferFormData>({
    amount: '',
    toAddress: '',
  });
  const [transferring, setTransferring] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const [decimals, setDecimals] = useState<number>(18);
  const [tokenSymbol, setTokenSymbol] = useState<string>('');

  // Hooks for contract interactions
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read token decimals
  const { data: decimalsData } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'decimals',
    // enabled: isConnected,
  });

  // Read token symbol
  const { data: symbolData } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'symbol',
    // enabled: isConnected,
  });

  // Read token balance
  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    // enabled: isConnected && !!address,
  });

  // Update state when data is fetched
  useEffect(() => {
    if (decimalsData !== undefined) {
      setDecimals(Number(decimalsData));
    }
  }, [decimalsData]);

  useEffect(() => {
    if (symbolData) {
      setTokenSymbol(symbolData as string);
    }
  }, [symbolData]);

  useEffect(() => {
    if (balanceData && decimals) {
      setBalance(formatUnits(balanceData as bigint, decimals));
    }
  }, [balanceData, decimals]);

  // Refresh balance after successful transaction
  useEffect(() => {
    if (isSuccess) {
      refetchBalance();
    }
  }, [isSuccess, refetchBalance]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransfer = async () => {
    if (!address || !formData.amount || !formData.toAddress) {
      alert('Please fill in all information');
      return;
    }

    // Validate address
    if (!formData.toAddress.startsWith('0x') || formData.toAddress.length !== 42) {
      alert('Invalid recipient address');
      return;
    }

    try {
      setTransferring(true);
      const amountInWei = parseUnits(formData.amount, decimals);

      // Call transfer function
      writeContract({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: 'transfer',
        args: [
          formData.toAddress as `0x${string}`,
          amountInWei
        ],
      });
    } catch (err: any) {
      console.error('Transfer error:', err);
      alert(`Error: ${err.message}`);
      setTransferring(false);
    }
  };

  // Reset form after successful transfer
  if (isSuccess && transferring) {
    setTimeout(() => {
      setFormData({
        amount: '',
        toAddress: '',
      });
      setTransferring(false);
      alert('Token transfer successful! 🎉');
    }, 1000);
  }

  if (!isConnected) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Please connect wallet to transfer tokens</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-6">Transfer {tokenSymbol || 'Tokens'}</h2>

      <div className="space-y-4 text-sm">
        {/* Current Balance */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Your wallet:</span>
            <br />
            <span className="font-mono text-xs break-all">{address}</span>
            <br />
            <span className="font-semibold">Balance:</span> {balance} {tokenSymbol || 'Tokens'}
          </p>
        </div>

        {/* Token Amount */}
        <div>
          <label className="block text-xs font-semibold mb-2">
            Amount to Send
          </label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0.0"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isPending || isConfirming}
          />
        </div>

        {/* To Address */}
        <div>
          <label className="block text-xs font-semibold mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            name="toAddress"
            value={formData.toAddress}
            onChange={handleInputChange}
            placeholder="0x..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isPending || isConfirming}
          />
        </div>

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          disabled={isPending || isConfirming || !formData.amount || !formData.toAddress}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all text-sm"
        >
          {isPending && 'Waiting for confirmation...'}
          {isConfirming && 'Processing transaction...'}
          {!isPending && !isConfirming && `Transfer ${tokenSymbol || 'Tokens'}`}
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