'use client';

import { Layout } from '../../components/Layout';

export default function NFTGalleryPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My NFT Gallery</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            This page will display your NFT collection. You can implement the gallery here.
          </p>
        </div>
      </div>
    </Layout>
  );
}