# OnChain App

A comprehensive blockchain-based web application built with Next.js that allows users to manage their tokens and NFTs in one place.

![OnChain App Screenshot](https://placeholder-for-screenshot.com)

## Features

- **Wallet Integration**: Connect with major Ethereum-compatible wallets
- **Token Management**:
  - View token balances across multiple chains
  - Transfer tokens to any address
- **NFT Capabilities**:
  - Browse your NFT collection in a visual gallery
  - Transfer NFTs to other wallets
- **Multi-Chain Support**:
  - Ethereum Mainnet
  - Base
  - Arbitrum
- **Transaction Tracking**: View your transaction history

## Tech Stack

- **Frontend Framework**: Next.js 15
- **Blockchain Integration**: 
  - wagmi v2
  - viem
  - web3.js
  - RainbowKit v2
  - Reown AppKit
- **Styling**: TailwindCSS v4

## Getting Started

### Prerequisites

- Node.js 18+ 
- A wallet with Base, Ethereum or Arbitrum assets
- Alchemy API key (for enhanced RPC connections)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
```

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
  app/
    components/      # Reusable UI components
    config/          # Blockchain configuration
    contracts/       # Smart contract interfaces
    nfts/            # NFT-related pages
    tokens/          # Token-related pages
    transactions/    # Transaction history
    wallet/          # Wallet information
```

## Deployment

This project can be deployed on Vercel or any other Next.js-compatible hosting service.

```bash
# Build for production
npm run build

# Start the production server
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [wagmi](https://wagmi.sh/)
- [Reown AppKit](https://reown.xyz/appkit)
- [TailwindCSS](https://tailwindcss.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
