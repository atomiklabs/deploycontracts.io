import { useCallback, useEffect, useMemo, useState } from 'react'

import { createBrowserSigner, createClient, suggestAddingSecretNetworkToKeplrApp } from '@/lib/secret-client'
import type { InstantiateMsg, SecretNetworkExtendedClient } from '@/lib/secret-client'
import type { Configuration } from '@/lib/snip20-token-creator'
import { calculateInitialBalances } from '@/lib/snip20-token-creator/entity/token-summary'
import type { TokenSummaryEntity } from '@/lib/snip20-token-creator/entity/token-summary'
import { getImageFromCID } from '@/utils/ipfs'

type CreateInstantiateMsgProps = Omit<InstantiateMsg, 'prng_seed'>

function createInstantiateMsg(tokenInfo: CreateInstantiateMsgProps): InstantiateMsg {
  return {
    prng_seed: btoa(window.crypto.randomUUID()),
    config: {
      public_total_supply: true,
    },
    ...tokenInfo,
  }
}

export type UseSecretClientProps = Configuration

export function useSecretClient({ chainSettings, tokenFactorySettings }: UseSecretClientProps) {
  const [secretClient, setSecretClient] = useState<SecretNetworkExtendedClient>()

  const connectWallet = useCallback(async (): Promise<string> => {
    try {
      const { signer, walletAddress, encryptionUtils } = await createBrowserSigner(chainSettings.chainId)
      const { client } = await createClient({
        ...chainSettings,
        wallet: signer,
        walletAddress,
        encryptionUtils,
      })

      setSecretClient(client)

      return client.address
    } catch (error: any) {
      console.warn(error.message)
      try {
        if (error.message.includes(`There is no chain info for ${chainSettings.chainId}`)) {

          await suggestAddingSecretNetworkToKeplrApp(chainSettings)



          const { signer, walletAddress, encryptionUtils } = await createBrowserSigner(chainSettings.chainId)
          const { client } = await createClient({
            ...chainSettings,
            wallet: signer,
            walletAddress,
            encryptionUtils,
          })

          setSecretClient(client)

          return client.address
        }
      }
      catch (error) {
        console.warn('Could not connect at this time, try again')
      }
    }
    console.error('Could not connect wallet')
    return ''
  }, [suggestAddingSecretNetworkToKeplrApp])

  const instantiateSnip20Contract = useCallback(
    async ({ basicTokenInfo, allocationInfo, marketingInfo }: TokenSummaryEntity): Promise<string> => {
      if (!secretClient) {
        throw new Error('Cannot instantiate contract, missing Secret Network client instance')
      }

      if (!tokenFactorySettings) {
        throw Error('Cannot instantiate contract, missing token factory settings')
      }

      const initMsg = createInstantiateMsg({
        admin: basicTokenInfo.minterAddress,
        // TODO: allow passing custom name from the user
        name: basicTokenInfo.tokenSymbol,
        symbol: basicTokenInfo.tokenSymbol,
        decimals: tokenFactorySettings.tokenDecimals,
        initial_balances: calculateInitialBalances({
          allocations: allocationInfo.allocations,
          tokenDecimals: tokenFactorySettings.tokenDecimals,
          totalTokenSupply: basicTokenInfo.tokenTotalSupply,
        }),
        marketing_info: {
          project: marketingInfo.projectName,
          description: marketingInfo.projectDescription,
          logo: marketingInfo.projectLogoCID ? { url: getImageFromCID(marketingInfo.projectLogoCID) } : undefined,
        },
      })

      const { contractAddress } = await secretClient.instantiateContract({
        codeId: tokenFactorySettings.codeId,
        codeHash: tokenFactorySettings.codeHash,
        label: `SNIP-20 token #${globalThis.crypto.randomUUID()}`,
        initMsg,
      })

      try {
        await window.keplr!.suggestToken(chainSettings.chainId, contractAddress)
      } catch (error) {
        // the user didn't want to add token to Keplr tokens list
        console.warn(error)
      }

      return contractAddress
    },
    [secretClient],
  )

  const isReady = typeof secretClient !== 'undefined'

  const isReadOnly = isReady && !secretClient.address

  const connectedWalletAddress = useMemo(() => (secretClient ? secretClient.address : undefined), [secretClient])

  useEffect(() => {
    // create read-only client for starters
    createClient({
      ...chainSettings
    }).then(({ client }) => setSecretClient(client))
  }, [])

  useEffect(() => {
    async function onAccountChanged() {
      const { signer, walletAddress, encryptionUtils } = await createBrowserSigner(chainSettings.chainId)
      const { client } = await createClient({
        ...chainSettings,
        wallet: signer,
        walletAddress,
        encryptionUtils,
      })

      setSecretClient(client)
    }

    window.addEventListener('keplr_keystorechange', onAccountChanged)

    return () => window.removeEventListener('keplr_keystorechange', onAccountChanged)
  }, [secretClient, connectedWalletAddress])

  return {
    inner: secretClient,
    isReady,
    isReadOnly,
    connectWallet,
    connectedWalletAddress,
    instantiateSnip20Contract,
  }
}