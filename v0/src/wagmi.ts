import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygon } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia, polygon],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string }),
  ],
  ssr: true,
  transports: {
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
