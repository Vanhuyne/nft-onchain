'use client';

import { TokenTransfer } from '../../components/TokenTransfer';
import { Layout } from '../../components/Layout';

export default function TokenTransferPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Transfer Tokens</h1>
        <TokenTransfer />
      </div>
    </Layout>
  );
}