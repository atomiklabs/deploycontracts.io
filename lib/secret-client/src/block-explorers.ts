import { chainId } from "./chain-base";
import type { ChainKeyId } from "./chain-base"

export type BlockExplorerName = 'secretNodes' | 'mintscan'

export type BlockExplorer = { name: string; url: string }

type SecretNodesChains = Extract<ChainKeyId, | 'secretMainnet' | 'secretTestnet'>

export const secretNodesExplorers: Record<SecretNodesChains, BlockExplorer> = {
  secretMainnet: {
    name: 'Secret Nodes Mainnet',
    url: `https://secretnodes.com/secret/chains/${chainId.secretMainnet}`
  },
  secretTestnet: {
    name: 'Secret Nodes Testnet',
    url: `https://secretnodes.com/secret/chains/${chainId.secretTestnet}`
  },
} as const

type MintscanChains = Extract<ChainKeyId, | 'secretMainnet'>

export const mintscanExplorers: Record<MintscanChains, BlockExplorer> = {
  secretMainnet: {
    name: 'Secret Nodes Mainnet',
    url: `https://secretnodes.com/secret/chains/${chainId.secretMainnet}`
  },
} as const