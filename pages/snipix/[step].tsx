import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Container from '@/components/snip-20/Container'
import StepsBreadcrumb from '@/components/snip-20/StepsBreadcrumb'
import TokenDetails from '@/components/snip-20/tokenDetails'
import TokenAllocation from '@/components/snip-20/tokenAllocation'
import TokenMarketing from '@/components/snip-20/tokenMarketing'
import TokenSummary from '@/components/snip-20/tokenSummary'

import { createBrowserSigner, createClient, suggestAddingSecretNetworkToKeplrApp } from '@/lib/secret-client'
import type { InstantiateMsg, SecretNetworkExtendedClient } from '@/lib/secret-client'

import { configuration } from '@/lib/snip20-token-creator'
import type { Configuration } from '@/lib/snip20-token-creator'

import {
  BasicTokenInfoEntity,
  schema as basicTokenInfoSchema,
} from '@/lib/snip20-token-creator/entity/basic-token-info'
import { AllocationInfoEntity, schema as allocationInfoSchema } from '@/lib/snip20-token-creator/entity/allocation-info'
import { MarketingInfoEntity, schema as marketingInfoSchema } from '@/lib/snip20-token-creator/entity/marketing-info'
import * as tokenSummaryEntity from '@/lib/snip20-token-creator/entity/token-summary'
import type { TokenSummaryEntity } from '@/lib/snip20-token-creator/entity/token-summary'

import { getImageFromCID } from '@/utils/ipfs'
import { useLocalStorage } from '@/utils/useLocalStorage'

// Define all possible steps
export enum TokenCreatorStep {
  AllocationInfo = 'allocation-info',
  BasicInfo = 'basic-info',
  MarketingInfo = 'marketing-info',
  Summary = 'summary',
}

// Define order of steps
export const tokenCreatorSteps: Array<TokenCreatorStep> = [
  TokenCreatorStep.BasicInfo,
  TokenCreatorStep.AllocationInfo,
  TokenCreatorStep.MarketingInfo,
  TokenCreatorStep.Summary,
]

type CreateInstantiateMsgProps = Omit<InstantiateMsg, 'prng_seed'>

export function createInstantiateMsg(tokenInfo: CreateInstantiateMsgProps): InstantiateMsg {
  return {
    prng_seed: btoa(window.crypto.randomUUID()),
    config: {
      public_total_supply: true,
    },
    ...tokenInfo,
  }
}

type UseSecretClientProps = Configuration

function useSecretClient({ chainSettings, tokenFactorySettings }: UseSecretClientProps) {
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

      console.warn('Could not connect at this time, try again')

      return ''
    }
  }, [suggestAddingSecretNetworkToKeplrApp])

  const instantiateSnip20Contract = useCallback(
    async ({ basicTokenInfo, allocationInfo, marketingInfo }: TokenSummaryEntity): Promise<string> => {
      if (!secretClient) {
        throw new Error('Cannot instantiate contract, missing Secret Network client instance')
      }

      const initMsg = createInstantiateMsg({
        admin: basicTokenInfo.minterAddress,
        // TODO: allow passing custom name from the user
        name: basicTokenInfo.tokenSymbol,
        symbol: basicTokenInfo.tokenSymbol,
        decimals: tokenFactorySettings.tokenDecimals,
        initial_balances: tokenSummaryEntity.calculateInitialBalances({
          allocations: allocationInfo.allocations,
          tokenDecimals: tokenFactorySettings.tokenDecimals,
          totalTokenSupply: basicTokenInfo.tokenTotalSupply,
        }),
        marketing_info: {
          project: marketingInfo.projectName,
          description: marketingInfo.projectDescription,
          logo: marketingInfo.projectLogoCID ? getImageFromCID(marketingInfo.projectLogoCID) : undefined,
        },
      })

      console.log('instantiate', initMsg)

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

  const connectedWalletAddress = useMemo(() => (secretClient ? secretClient.address : undefined), [secretClient])

  return {
    connectWallet,
    connectedWalletAddress,
    instantiateSnip20Contract,
  }
}

interface TokenCreatorStepPageProps extends UseSecretClientProps {
  storageKey: string
}

function createDefaultProps(): TokenCreatorStepPageProps {
  return {
    ...configuration,
    storageKey: 'snip-20-token-creator',
  }
}

export default function TokenCreatorStepPage(
  { storageKey, chainSettings, tokenFactorySettings }: TokenCreatorStepPageProps = createDefaultProps(),
) {
  const router = useRouter()
  const secretClient = useSecretClient({ chainSettings, tokenFactorySettings })
  const [formState, setFormState] = useLocalStorage<TokenSummaryEntity>(storageKey, tokenSummaryEntity.createDefault())

  const isCurrentStep = useCallback(
    (step: TokenCreatorStep) => (typeof router.query.step === 'string' ? router.query.step === step : false),
    [router],
  )

  const stepPath = (step: TokenCreatorStep) => `/snipix/${step}`

  const navigateTo = useCallback((path: string) => router.push(path, undefined, { shallow: true }), [router])

  const currentStepIdx =
    typeof router.query.step === 'string' ? tokenCreatorSteps.findIndex((step) => step === router.query.step) : -1

  function createOnSubmit(step: TokenCreatorStep): any {
    switch (step) {
      case TokenCreatorStep.BasicInfo:
        return (formData: BasicTokenInfoEntity) => {
          setFormState({ ...formState, basicTokenInfo: formData })
          navigateTo(stepPath(TokenCreatorStep.AllocationInfo))
        }

      case TokenCreatorStep.AllocationInfo:
        return (formData: AllocationInfoEntity) => {
          setFormState({ ...formState, allocationInfo: formData })
          navigateTo(stepPath(TokenCreatorStep.MarketingInfo))
        }

      case TokenCreatorStep.MarketingInfo:
        return (formData: MarketingInfoEntity) => {
          setFormState({ ...formState, marketingInfo: formData })
          navigateTo(stepPath(TokenCreatorStep.Summary))
        }

      case TokenCreatorStep.Summary:
        return (formData: TokenSummaryEntity) => {
          secretClient
            .instantiateSnip20Contract(formData)
            .then((contractAddress) => {
              alert(`Congrats, token created at ${contractAddress} address`)
              console.log(`Congrats, token created at ${contractAddress} address`)
              router.replace('/')
            })
            .catch((error) => {
              console.log({ chainSettings })
              console.error('something went wrong, try again')
              console.error(error)
            })
        }
    }
  }

  useEffect(() => {
    if (secretClient.connectedWalletAddress) {
      // wallet is already connected, skip
      return
    }

    if (!formState.basicTokenInfo.minterAddress) {
      // minter address has not been stored during previous session, skip
      return
    }

    // only call it when the user has connected walled during previous sessions
    console.info('Requesting Secret Client connection automatically')
    secretClient.connectWallet()
  }, [secretClient])

  return (
    <>
      <Head>
        <title>Deploy SNIP-20 smart contract for free</title>
        <meta
          name='description'
          content={`Fill up the form to create and deploy new SNIP-20 smart contract. This would take only few minutes and it's completely free.`}
        />
      </Head>

      <Container className='pt-20'>
        <StepsBreadcrumb activeStep={currentStepIdx} />

        <section className='mt-10 pb-20'>
          {isCurrentStep(TokenCreatorStep.BasicInfo) && (
            <TokenDetails
              minterAddress={secretClient.connectedWalletAddress}
              prevStepPath='/'
              formData={formState.basicTokenInfo}
              validationSchema={basicTokenInfoSchema}
              onConnectWallet={secretClient.connectWallet}
              onSubmit={createOnSubmit(TokenCreatorStep.BasicInfo)}
            />
          )}

          {isCurrentStep(TokenCreatorStep.AllocationInfo) && (
            <TokenAllocation
              prevStepPath={stepPath(TokenCreatorStep.BasicInfo)}
              formData={formState.allocationInfo}
              validationSchema={allocationInfoSchema}
              onSubmit={createOnSubmit(TokenCreatorStep.AllocationInfo)}
            />
          )}

          {isCurrentStep(TokenCreatorStep.MarketingInfo) && (
            <TokenMarketing
              prevStepPath={stepPath(TokenCreatorStep.AllocationInfo)}
              formData={formState.marketingInfo}
              validationSchema={marketingInfoSchema}
              onSubmit={createOnSubmit(TokenCreatorStep.MarketingInfo)}
            />
          )}

          {isCurrentStep(TokenCreatorStep.Summary) && (
            <TokenSummary
              prevStepPath={stepPath(TokenCreatorStep.MarketingInfo)}
              formData={formState}
              stepPath={stepPath}
              onSubmit={createOnSubmit(TokenCreatorStep.Summary)}
            />
          )}
        </section>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: tokenCreatorSteps.map((stepName) => `/snipix/${stepName.toLowerCase()}`),
    fallback: false,
  }
}

export function getStaticProps() {
  return {
    props: createDefaultProps(),
  }
}
