import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import GradientText from '@/components/buttons/GradientText'
import H2 from '@/components/headings/H2'
import Container from '@/components/snip-20/Container'
import StepsBreadcrumb from '@/components/snip-20/StepsBreadcrumb'
import TokenDetails from '@/components/snip-20/tokenDetails'
import TokenAllocation from '@/components/snip-20/tokenAllocation'
import TokenMarketing from '@/components/snip-20/tokenMarketing'
import TokenSummary from '@/components/snip-20/tokenSummary'

import { useSecretClient } from '@/hooks/secret-client-hook'
import type { UseSecretClientProps } from '@/hooks/secret-client-hook'

import { configuration } from '@/lib/snip20-token-creator'

import {
  BasicTokenInfoEntity,
  schema as basicTokenInfoSchema,
} from '@/lib/snip20-token-creator/entity/basic-token-info'
import { AllocationInfoEntity, schema as allocationInfoSchema } from '@/lib/snip20-token-creator/entity/allocation-info'
import { MarketingInfoEntity, schema as marketingInfoSchema } from '@/lib/snip20-token-creator/entity/marketing-info'
import * as tokenSummaryEntity from '@/lib/snip20-token-creator/entity/token-summary'
import type { TokenSummaryEntity } from '@/lib/snip20-token-creator/entity/token-summary'

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

interface MetaState {
  lastPresentedStepIdx?: number
  connectedWalletAddress?: string
}

enum GoLiveState {
  None,
  InProgress,
  Completed,
  Failed,
}

interface TokenCreatorPageProps extends UseSecretClientProps {
  formStorageKey: string
  metaStorageKey: string
}

function createDefaultProps(): TokenCreatorPageProps {
  return {
    ...configuration,
    formStorageKey: 'snip-20-token-creator/form',
    metaStorageKey: 'snip-20-token-creator/meta',
  }
}

export default function TokenCreatorPage(
  { formStorageKey, metaStorageKey, chainSettings, tokenFactorySettings }: TokenCreatorPageProps = createDefaultProps(),
) {
  const router = useRouter()
  const secretClient = useSecretClient({ chainSettings, tokenFactorySettings })

  const [formState, setFormState] = useLocalStorage<TokenSummaryEntity>(
    formStorageKey,
    tokenSummaryEntity.createDefault(),
  )

  const [metaState, setMetaState] = useLocalStorage<MetaState>(metaStorageKey, {})

  const [goLiveState, setGoLiveState] = useState<GoLiveState>(GoLiveState.None)

  const isCurrentStep = useCallback(
    (step: TokenCreatorStep) => (typeof router.query.step === 'string' ? router.query.step === step : false),
    [router],
  )

  const stepPath = (step: TokenCreatorStep) => `/snip-20/${step}`

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
          setGoLiveState(GoLiveState.InProgress)

          secretClient
            .instantiateSnip20Contract(formData)
            .then((contractAddress) => {
              setGoLiveState(GoLiveState.Completed)
              // reset form state
              console.log(`Congrats, token created at ${contractAddress} address`)
              setFormState(tokenSummaryEntity.createDefault())
              setMetaState({})
              setTimeout(() => {
                router.replace(`/docs/?token=${encodeURI(contractAddress)}`)
              }, 2000)
            })
            .catch((error) => {
              setGoLiveState(GoLiveState.Failed)
              console.error(error)
            })
        }
    }
  }

  useEffect(() => {
    if (!metaState.lastPresentedStepIdx) {
      return
    }

    const step = tokenCreatorSteps[metaState.lastPresentedStepIdx]

    if (!step) {
      return
    }

    navigateTo(stepPath(step))
  }, [])

  useEffect(() => {
    setMetaState((metaState) => {
      // don't update lastPresentedStepIdx if the current step is not the most advanced one visited so far
      if (metaState.lastPresentedStepIdx && metaState.lastPresentedStepIdx >= currentStepIdx) {
        return metaState
      }

      return { ...metaState, lastPresentedStepIdx: currentStepIdx }
    })
  }, [currentStepIdx])

  // trying to connect to Keplr automatically
  useEffect(() => {
    if (secretClient.connectedWalletAddress) {
      // wallet is already connected, skip
      return
    }

    if (!metaState.connectedWalletAddress) {
      // connected wallet address has not been stored during previous session, skip
      return
    }

    // only call it when the user has connected walled during previous sessions
    console.info('Requesting Secret Client connection automatically')
    secretClient.connectWallet()
  }, [secretClient, secretClient.connectedWalletAddress, metaState.connectedWalletAddress])

  // store most recently used wallet address
  useEffect(() => {
    setMetaState((metaState) => ({ ...metaState, connectedWalletAddress: secretClient.connectedWalletAddress }))
  }, [secretClient.connectedWalletAddress])

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
            <>
              {goLiveState === GoLiveState.None && (
                <TokenSummary
                  prevStepPath={stepPath(TokenCreatorStep.MarketingInfo)}
                  formData={formState}
                  stepPath={stepPath}
                  onSubmit={createOnSubmit(TokenCreatorStep.Summary)}
                />
              )}

              {goLiveState === GoLiveState.InProgress && (
                <div className='text-white'>
                  <H2>Going live 🚀</H2>
                  <p className='mt-10 flex gap-4 items-center'>
                    <span className='loader w-10 h-10 flex-none bg-[#671bc9]' />
                    Your contract is being created, please wait. Once it's completed, you will be able to:
                  </p>
                  <ul className='mt-5 list-inside list-disc'>
                    <li>add it to Keplr tokens list</li>
                    <li>use it with code snippets we provided</li>
                  </ul>
                </div>
              )}

              {goLiveState === GoLiveState.Completed && (
                <div className='text-white'>
                  <H2>Completed</H2>
                  <p className='my-10'>Taking you to the token page...</p>
                </div>
              )}

              {goLiveState === GoLiveState.Failed && (
                <div className='text-white'>
                  <H2>Failed</H2>
                  <p className='my-10'>
                    Creating contract failed. You can{' '}
                    <button type='button' onClick={() => setGoLiveState(GoLiveState.None)}>
                      <GradientText>Go back to form</GradientText>
                    </button>{' '}
                    and try again, or reach out to our team for assistance.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: tokenCreatorSteps.map((stepName) => `/snip-20/${stepName.toLowerCase()}`),
    fallback: false,
  }
}

export function getStaticProps() {
  return {
    props: createDefaultProps(),
  }
}
