'use client';

import { Layout } from '../components/Layout';

export default function TransactionsPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Transactions</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            This page will display your transaction history. You can implement transaction details here.
          </p>
        </div>
      </div>
    </Layout>
  );
}