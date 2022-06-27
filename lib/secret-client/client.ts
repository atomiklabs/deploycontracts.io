import { SecretNetworkClient, Wallet } from 'secretjs'
import type { CreateClientOptions, MsgInstantiateContractParams } from 'secretjs'
import type { Window as KeplrWindow } from '@keplr-wallet/types'
import { ChainSettings } from './configuration'

declare global {
  interface Window extends KeplrWindow { }
}

export { SecretNetworkClient, Wallet }

export interface ContractManifest {
  codeId?: number
  codeHash?: string
  contractAddress?: string
}

export interface StoredWasmBinary {
  codeId: number;
  codeHash: string;
}

export type StoreCodeResult = StoredWasmBinary;

export type InstantiateContractProps = Omit<MsgInstantiateContractParams, 'sender'>

export interface InstantiateContractResult {
  contractAddress: string
}

export interface SecretNetworkExtendedClient extends SecretNetworkClient {
  storeCode: (wasmByteCode: Buffer, contractSourceCodeUrl?: string) => Promise<StoreCodeResult>
  instantiateContract: (props: InstantiateContractProps) => Promise<InstantiateContractResult>
}

export type HumanAddr = string

export type Uint128 = string

export interface InitialBalance {
  address: HumanAddr
  amount: Uint128
}

export interface InitConfig {
  /**
   * Indicates whether burn functionality should be enabled default: False
   */
  enable_burn?: boolean
  /**
   * Indicates whether deposit functionality should be enabled default: False
   */
  enable_deposit?: boolean
  /**
   * Indicates whether mint functionality should be enabled default: False
   */
  enable_mint?: boolean
  /**
   * Indicates whether redeem functionality should be enabled default: False
   */
  enable_redeem?: boolean
  /**
   * Indicates whether the total supply is public or should be kept secret. default: False
   */
  public_total_supply?: boolean
}

export interface InstantiateMsg {
  name: string
  symbol: string
  decimals: number
  prng_seed: string
  admin?: HumanAddr
  initial_balances?: Array<InitialBalance>
  config?: InitConfig
  marketing_info?: {
    project?: string
    description?: string
    marketing?: string
    logo?: { url: string }
  }
}

type CreateClientProps = Omit<CreateClientOptions, 'grpcWebUrl'> & ChainSettings

type CreateClientResult = {
  client: SecretNetworkExtendedClient
  chainSettings: Partial<ChainSettings>
}

export async function createBrowserSigner(chainId: string) {
  // if browser env available -> try using Keplr as a signer
  const hasBrowserDepsAvailable = () =>
    typeof window !== 'undefined' &&
    typeof window.keplr !== 'undefined' &&
    typeof window.getEnigmaUtils === 'function' &&
    typeof window.getOfflineSignerOnlyAmino === 'function'

  if (!hasBrowserDepsAvailable()) {
    throw new Error(
      `Cannot create browser signer. \ 
      One of dependecies is missing on the window object:\
      keplr, getEnigmaUtils, getOfflineSignerOnlyAmino`
    )
  }

  await window.keplr!.enable(chainId)

  const encryptionUtils = window.getEnigmaUtils!(chainId)
  const signer = window.getOfflineSignerOnlyAmino!(chainId)
  const walletAddress = (await signer.getAccounts())[0].address

  return {
    signer, walletAddress, encryptionUtils
  }
}

type Mnemonic = string

export async function createProgrammaticSigner(mnemonic: Mnemonic) {
  if (mnemonic.length === 0) {
    throw new Error('Mnemonic value is required to create a programmatic signer')
  }
  const signer = new Wallet(mnemonic)
  const walletAddress = signer.address

  return {
    signer,
    walletAddress,
  }
}

export async function createClient({
  chainId,
  chainName,
  grpcUrl,
  rpcUrl,
  restUrl,
  wallet,
  walletAddress,
  encryptionUtils
}: CreateClientProps): Promise<CreateClientResult> {
  if (!wallet) {
    console.warn('Secret Client is in read-only mode. It cannot sign transactions for you.')
  }

  const client = await SecretNetworkClient.create({
    grpcWebUrl: grpcUrl,
    wallet,
    chainId,
    walletAddress,
    encryptionUtils,
  })

  async function storeCode(wasmByteCode: Buffer, contractSourceCodeUrl: string = ''): Promise<StoreCodeResult> {
    if (!wallet) {
      throw new Error('Secret Client is in read-only mode. It cannot sign transactions for you.')
    }

    console.log('Uploading contract')

    const uploadReceipt = await client.tx.compute.storeCode(
      {
        wasmByteCode: wasmByteCode,
        sender: client.address,
        source: contractSourceCodeUrl,
        builder: '',
      },
      {
        gasLimit: 5000000,
      }
    )

    if (uploadReceipt.code !== 0) {
      console.log(`Failed to get code id: ${JSON.stringify(uploadReceipt.rawLog)}`)
      throw new Error(`Failed to upload contract`)
    }

    const codeIdKv = uploadReceipt.jsonLog![0].events[0].attributes.find((a: any) => {
      return a.key === 'code_id'
    })

    if (!codeIdKv) {
      console.log(`Failed to get code id: ${JSON.stringify(uploadReceipt.rawLog)}`)
      throw new Error(`Failed to upload contract`)
    }

    const codeId = Number(codeIdKv.value)
    const codeHash = await client.query.compute.codeHash(codeId)

    return { codeId, codeHash }
  }

  async function instantiateContract({ codeId, codeHash, initMsg, label }: InstantiateContractProps): Promise<InstantiateContractResult> {
    if (!wallet) {
      throw new Error('Secret Client is in read-only mode. It cannot sign transactions for you.')
    }

    const contract = await client.tx.compute.instantiateContract(
      {
        sender: client.address,
        codeId,
        codeHash,
        initMsg,
        label,
      },
      {
        gasLimit: 1000000,
      }
    )

    if (contract.code !== 0) {
      throw new Error(`Failed to instantiate the contract with the following error ${contract.rawLog}`)
    }

    const contractAddress = contract.arrayLog!.find(
      log => log.type === 'message' && log.key === 'contract_address'
    )!.value

    return { contractAddress }
  }

  const extendedClient: SecretNetworkExtendedClient = Object.assign(client, {
    storeCode,
    instantiateContract,
  })

  return {
    client: extendedClient,
    chainSettings: {
      chainName,
      grpcUrl,
      rpcUrl,
      restUrl,
    },
  }
}

export async function suggestAddingSecretNetworkToKeplrApp({ chainId, chainName, restUrl, rpcUrl }: Partial<ChainSettings> = {}) {
  if (typeof window.keplr === 'undefined') {
    throw Error('Wallet extension is not available. Install Keplr App and try again.')
  }

  const extendedChainSettings = {
    rpc: rpcUrl || '',
    rest: restUrl || '',
    chainName: chainName || '',
    chainId: chainId || '',
    bip44: {
      coinType: 529,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'secret',
      bech32PrefixAccPub: 'secretpub',
      bech32PrefixValAddr: 'secretvaloper',
      bech32PrefixValPub: 'secretvaloperpub',
      bech32PrefixConsAddr: 'secretvalcons',
      bech32PrefixConsPub: 'secretvalconspub',
    },
    currencies: [
      {
        coinDenom: 'SCRT',
        coinMinimalDenom: 'uscrt',
        coinDecimals: 6,
        coinGeckoId: 'secret',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'SCRT',
        coinMinimalDenom: 'uscrt',
        coinDecimals: 6,
        coinGeckoId: 'secret',
      },
    ],
    stakeCurrency: {
      coinDenom: 'SCRT',
      coinMinimalDenom: 'uscrt',
      coinDecimals: 6,
      coinGeckoId: 'secret',
    },
    coinType: 529,
    gasPriceStep: {
      low: 0.1,
      average: 0.25,
      high: 1,
    },
    features: ['secretwasm', 'ibc-transfer', 'ibc-go'],
  }

  if (extendedChainSettings.chainId === 'mainnet') {
    // we never have to suggest adding the Secret Netwrok Mainnet
    console.error('The Secret Netwrok Mainnet is already present in the Keplr App');
    return;
  }

  try {
    if (!extendedChainSettings.chainId) {
      throw new Error('Suggested chain info is missing `chainId` property')
    }

    if (!extendedChainSettings.chainName) {
      throw new Error('Suggested chain info is missing `chainName` property')
    }

    if (!extendedChainSettings.rpc) {
      throw new Error('Suggested chain info is missing `rpcUrl` property')
    }

    if (!extendedChainSettings.rest) {
      throw new Error('Suggested chain info is missing `restUrl` property')
    }

    await window.keplr.experimentalSuggestChain(extendedChainSettings)
  } catch (error: any) {
    console.error(`Failed to suggest the network switch: ${error.message}`)
  }
}