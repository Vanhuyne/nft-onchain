'use client';

import { Layout } from '../../components/Layout';

export default function TokenBalancePage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Token Balance</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            This page will display your token balances. You can implement balance details here.
          </p>
        </div>
      </div>
    </Layout>
  );
}