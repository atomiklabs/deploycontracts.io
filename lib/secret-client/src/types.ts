import type { Currency } from "@keplr-wallet/types"
import type { BlockExplorer, BlockExplorerName } from "./block-explorers"
import type { GatewayProviderName } from "./blockchain-gateways"

export type Provider = {}

export interface ChainSettings {
  chainId: string,
  chainName: string
  grpcUrl: string
  rpcUrl: string
  restUrl: string
}

export type Chain = {
  /** chain ID string */
  id: string
  /** Human-readable name */
  name: string
  /** Internal network name (e.g. mainnet, testent, localnet, etc.) */
  network: string
  /** Currency used by chain */
  nativeCurrency?: Currency
  /** Collection of gRPC endpoints */
  grpcUrls: { [key in GatewayProviderName]?: string } & {
    [key: string]: string
    default: string
  },
  /** Collection of REST endpoints */
  restUrls: { [key in GatewayProviderName]?: string } & {
    [key: string]: string
    default: string
  }
  /** Collection of g endpoints */
  rpcUrls: { [key in GatewayProviderName]?: string } & {
    [key: string]: string
    default: string
  }
  /** Collection of block explorers */
  blockExplorers?: {
    [key in BlockExplorerName]?: BlockExplorer
  } & {
    [key: string]: BlockExplorer
    default: BlockExplorer
  }
}

export type ChainProviderFn<
  TProvider extends Provider = any,
  TChain extends Chain = Chain,
  > = (chain: TChain) => {
    chain: TChain
    provider: () => TProvider
  } | null

declare global {
  type InjectedProviderFlags = {
    /** More wallets to add here as injected providers */
    isKeplr?: true
  }

  interface Cosmos {
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    providers?: Cosmos[]

    /**
     * EIP-747: Add wallet_watchAsset to Provider
     * https://eips.ethereum.org/EIPS/eip-747
     */
    //  request(args: {
    //   method: 'wallet_watchAsset'
    //   params: WatchAssetParams
    // }): Promise<boolean>

    /**
     * EIP-1193: Ethereum Provider JavaScript API
     * https://eips.ethereum.org/EIPS/eip-1193
     */
    // request(args: { method: 'eth_accounts' }): Promise<string[]>
    // request(args: { method: 'eth_chainId' }): Promise<string>
    // request(args: { method: 'eth_requestAccounts' }): Promise<string[]>

    /**
     * EIP-1474: Remote procedure call specification
     * https://eips.ethereum.org/EIPS/eip-1474
     */
    // request(args: { method: 'web3_clientVersion' }): Promise<string>

    /**
     * EIP-2255: Wallet Permissions System
     * https://eips.ethereum.org/EIPS/eip-2255
     */
    // request(args: {
    //   method: 'wallet_requestPermissions'
    //   params: [{ eth_accounts: Record<string, any> }]
    // }): Promise<WalletPermission[]>
    // request(args: {
    //   method: 'wallet_getPermissions'
    // }): Promise<WalletPermission[]>

    /**
     * EIP-3085: Wallet Add Ethereum Chain RPC Method
     * https://eips.ethereum.org/EIPS/eip-3085
     */
    // request(args: {
    //   method: 'wallet_addEthereumChain'
    //   params: AddEthereumChainParameter[]
    // }): Promise<null>

    /**
     * EIP-3326: Wallet Switch Ethereum Chain RPC Method
     * https://eips.ethereum.org/EIPS/eip-3326
     */
    // request(args: {
    //   method: 'wallet_switchEthereumChain'
    //   params: [{ chainId: string }]
    // }): Promise<null>
  }

  interface Window {
    cosmos: Cosmos
  }
}