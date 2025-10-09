import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia, base } from '@wagmi/core/chains'


const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

const baseRpcUrl = alchemyApiKey 
  ? `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
  : undefined;

export const config = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(baseRpcUrl),
  },
})