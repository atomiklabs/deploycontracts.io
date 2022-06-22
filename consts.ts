export const defaultColors = { error: '#FC0E47' }

export const landingPageUrl = {
  contracts: '/#available-contracts',
  openSource: '/#open-source',
  sponsors: '/#our-sponsors',
  team: '/#our-team',
  navbarLogo: '/',
  // TODO: Update link to exact repository when ready
  github: 'https://github.com/atomiklabs',
  createNewToken: '/snip-20',
  secretNetworkGrant: 'https://scrt.network/developers/grants',
  atomikLabs: 'https://atomiklabs.io',
}

export const WORKERS_URL = process.env.NEXT_PUBLIC_WORKERS_URL || 'http://127.0.0.1:8787'

export const CHAIN_INFO = {
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID!,
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME!,
  rpcUrl: process.env.NEXT_PUBLIC_CHAIN_RPC!,
  grpcUrl: process.env.NEXT_PUBLIC_CHAIN_GRPC!,
  restUrl: process.env.NEXT_PUBLIC_CHAIN_REST!,
}

export const CONTRACT_INFO = {
  codeId: parseInt(process.env.NEXT_PUBLIC_CODE_ID!, 10),
  codeHash: process.env.NEXT_PUBLIC_CODE_HASH!,
}
export const LOCAL_DEV_API_KEY = process.env.NEXT_PUBLIC_LOCAL_DEV_API_KEY
