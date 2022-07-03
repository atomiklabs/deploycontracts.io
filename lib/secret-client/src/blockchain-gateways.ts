import type { ChainKeyId } from "./chains"

type GatewayUrls = {
  grpcUrl: string
  restUrl: string
  rpcUrl: string
}

export type GatewayProviderName =
  | 'forbole'
  | 'secretDevEnv'
  | 'roninVentures'
  | 'secretSaturn'

type RoninVenturesChains = Extract<ChainKeyId, | 'secretMainnet' | 'secretTestnet'>

export const roninVenturesGateways: Record<RoninVenturesChains, GatewayUrls> = {
  secretMainnet: {
    grpcUrl: 'https://web-rpc.roninventures.io',
    restUrl: 'https://api.roninventures.io',
    rpcUrl: 'https://rpc.roninventures.io',
  },
  secretTestnet: {
    grpcUrl: 'https://testnet-web-rpc.roninventures.io',
    restUrl: 'https://testnet-api.roninventures.io',
    rpcUrl: 'https://testnet-rpc.roninventures.io',
  },
} as const

type ForboleChains = Extract<ChainKeyId, | 'secretMainnet'>

export const forboleGateways: Record<ForboleChains, GatewayUrls> = {
  secretMainnet: {
    grpcUrl: 'https://grpc.secret.forbole.com',
    restUrl: 'https://api.secret.forbole.com',
    rpcUrl: 'https://rpc.secret.forbole.com',
  },
} as const

type SecretSaturnChains = Extract<ChainKeyId, | 'secretTestnet'>

export const secretSaturnGateways: Record<SecretSaturnChains, GatewayUrls> = {
  secretTestnet: {
    grpcUrl: 'https://grpc.testnet.secretsaturn.net',
    restUrl: 'https://lcd.testnet.secretsaturn.net',
    rpcUrl: 'https://rpc.testnet.secretsaturn.net',
  },
} as const

type SecretDevEnvChains = Extract<ChainKeyId, | 'secretLocal'>

export const secretDevEnvGateways: Record<SecretDevEnvChains, GatewayUrls> = {
  secretLocal: {
    grpcUrl: 'http://localhost:9091',
    restUrl: 'http://localhost:1317',
    rpcUrl: 'http://localhost:26657',
  },
} as const
