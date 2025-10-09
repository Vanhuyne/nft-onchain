'use client';

import { TokenTransfer } from '../../components/TokenTransfer';
import { Layout } from '../../components/Layout';
import { ETHTransfer } from '@/app/components/ETHTransfer';

export default function TokenTransferPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Transfer Tokens</h1>
        <TokenTransfer />
        
      </div>
        <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Transfer ETH</h1>
        <ETHTransfer />
      </div>

    </Layout>
  );
}