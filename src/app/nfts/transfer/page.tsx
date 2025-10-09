'use client';

import { NFTTransfer } from '../../components/NFTTransfer';
import { Layout } from '../../components/Layout';

export default function NFTTransferPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Transfer NFTs</h1>
        <NFTTransfer />
      </div>
    </Layout>
  );
}