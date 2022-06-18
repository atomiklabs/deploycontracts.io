import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import TokenDetails from '@/components/snip-20/tokenDetails'
import TokenAllocation from '@/components/snip-20/tokenAllocation'
import TokenMarketing from '@/components/snip-20/tokenMarketing'
import TokenSummary from '@/components/snip-20/tokenSummary'
import { initialStepsFormData, stepsValidationSchema } from '@/utils/snip20Form'
import { createClient, InstantiateMsg, suggestAddingSecretNetworkToKeplrApp } from '@/lib/secret-client'
import type { SecretNetworkExtendedClient, ChainInfo, StoredWasmBinary } from '@/lib/secret-client'

const LocalContext = createContext({} as TSnip20StepsProvider)

const DECIMALS = 6

interface Snip20StepsProviderProps extends PropsWithChildren<unknown> {
  chainInfo: ChainInfo
  contractInfo: StoredWasmBinary
}

export function Snip20StepsProvider({ chainInfo, contractInfo, children }: Snip20StepsProviderProps) {
  const router = useRouter()
  const [secretClient, setSecretClient] = useState<SecretNetworkExtendedClient | null>()
  const [isRouterInitialized, setIsRouterInitialized] = useState(false)
  const [currentStepData, setCurrentStepData] = useState<TCurrentStepData>()
  const [snip20FormData, setSnip20FormData] = useLocalStorage(`snip20FormData`, initialStepsFormData)

  const connectWallet = useCallback(async (): Promise<string> => {
    console.log('[snip20SetpsProvider]: connectWallet ->')

    try {
      const { client } = await createClient({
        chainId: chainInfo.chainId,
        grpcUrl: chainInfo.grpcUrl,
      })

      setSecretClient(client)

      console.log('[snip20SetpsProvider]: connectWallet <-')
      return client.address
    } catch (error: any) {
      console.error(error)

      if (error.message === `There is no chain info for ${chainInfo.chainId}`) {
        await suggestAddingSecretNetworkToKeplrApp(chainInfo)

        const { client } = await createClient({
          chainId: chainInfo.chainId,
          grpcUrl: chainInfo.grpcUrl,
        })

        setSecretClient(client)

        console.log('[snip20SetpsProvider]: connectWallet <-')
        return client.address
      }

      console.log('[snip20SetpsProvider]: connectWallet <-')
      return ''
    }
  }, [suggestAddingSecretNetworkToKeplrApp])

  const instantiateSnip20Contract = useCallback(async (): Promise<string> => {
    if (!secretClient) {
      throw new Error('Cannot instantiate contract, missing Secret Network client instance')
    }

    let initMsg: InstantiateMsg

    // TODO: validate form data before sending the InitMsg
    const name = snip20FormData[0].tokenName!
    const symbol = name.substring(0, 3).toUpperCase()
    const tokenTotalSupply = BigInt(snip20FormData[0].tokenTotalSupply!)
    const initialBalances = snip20FormData[1].allocations?.map(({ value, address }) => ({
      amount: (((BigInt(value) * tokenTotalSupply) / BigInt(100)) * BigInt(10 ** DECIMALS)).toString(),
      address,
    }))
    const admin = snip20FormData[0].minterAddress

    initMsg = createInstantiateMsg({
      initial_balances: initialBalances,
      symbol,
      name,
      admin,
    })

    const { contractAddress } = await secretClient.instantiateContract({
      codeId: contractInfo.codeId,
      codeHash: contractInfo.codeHash,
      label: `SNIP-20 token #${globalThis.crypto.randomUUID()}`,
      initMsg,
    })

    try {
      await window.keplr!.suggestToken(chainInfo.chainId, contractAddress)
    } catch (error) {
      // the user didn't want to add token to Keplr tokens list
      console.error(error)
    }

    return contractAddress
  }, [secretClient, chainInfo, contractInfo])

  const connectedWalletAddress = useMemo(() => (secretClient ? secretClient.address : undefined), [secretClient])

  useEffect(() => {
    if (router.isReady) {
      const firstInvalidStepIndex = getLastInvalidStepIndex()
      router.replace(`/snip-20/step-${firstInvalidStepIndex}`)

      setIsRouterInitialized(true)
    }
  }, [router.isReady])

  useEffect(() => {
    if (isRouterInitialized) {
      updateCurrentStepData()
    }
  }, [router.query])

  function getLastInvalidStepIndex() {
    const lastStepIndex = 4
    let firstInvalidStepIndex = lastStepIndex

    for (let i = 0; i < lastStepIndex; i++) {
      const stepIndex = i + 1

      try {
        stepsValidationSchema[i].validateSync(snip20FormData[i])
      } catch (e) {
        firstInvalidStepIndex = stepIndex
        console.warn(`--- getLastInvalidStepIndex validation error at step ${stepIndex}`)
        break
      }
    }

    return firstInvalidStepIndex
  }

  function onNextStep(validatedData: any) {
    if (!currentStepData) {
      return console.error('--- currentStepData is not defined')
    }

    snip20FormData[currentStepData.stepIndex - 1] = { ...validatedData }
    setSnip20FormData([...snip20FormData])

    const nextStepPath = `step-${currentStepData.stepIndex + 1}`
    router.push(nextStepPath)
  }

  function goToPrevStep() {
    if (!currentStepData) {
      return console.error('--- currentStepData is not defined')
    }

    const prevStepIndex = currentStepData.stepIndex - 1
    if (prevStepIndex < 1) {
      return router.push('/')
    }

    const prevStepPath = `step-${prevStepIndex}`
    router.push(prevStepPath)
  }

  function updateCurrentStepData() {
    const updatedCurrentStep = getStepData(router.query)

    if (!updatedCurrentStep.component) {
      return console.error('--- updateCurrentStepData error')
    }

    setCurrentStepData(updatedCurrentStep)
  }

  function getFormData(stepIndex: number): TFormDataReturnValue {
    return {
      initialValues: snip20FormData[stepIndex - 1],
      validationSchema: stepsValidationSchema[stepIndex - 1],
    }
  }

  if (!currentStepData) {
    return null
  }

  return (
    <LocalContext.Provider
      value={{
        currentStepData,
        snip20FormData,
        getFormData,
        onNextStep,
        goToPrevStep,
        connectWallet,
        connectedWalletAddress,
        instantiateSnip20Contract,
      }}
    >
      {children}
    </LocalContext.Provider>
  )
}

export function useSnip20Steps() {
  return useContext(LocalContext)
}

function getStepData(routerQuery: ParsedUrlQuery) {
  const errorResponse = { stepIndex: -1, component: undefined }

  if (typeof routerQuery.step !== 'string') {
    return errorResponse
  }

  switch (routerQuery.step) {
    case 'step-1':
      return {
        stepIndex: 1,
        component: <TokenDetails />,
      }
    case 'step-2':
      return {
        stepIndex: 2,
        component: <TokenAllocation />,
      }
    case 'step-3':
      return {
        stepIndex: 3,
        component: <TokenMarketing />,
      }
    case 'step-4':
      return {
        stepIndex: 4,
        component: <TokenSummary />,
      }
  }

  return errorResponse
}

type TSnip20StepsProvider = {
  currentStepData: TCurrentStepData
  snip20FormData: typeof initialStepsFormData
  onNextStep: (data: {}) => void
  goToPrevStep: () => void
  getFormData: (stepIndex: number) => TFormDataReturnValue
  connectWallet: () => Promise<string>
  instantiateSnip20Contract: () => Promise<string>
  connectedWalletAddress: string | undefined
}

type TFormDataReturnValue = {
  initialValues: typeof initialStepsFormData[0]
  validationSchema: typeof stepsValidationSchema[0]
}

type TCurrentStepData = { stepIndex: number; component: JSX.Element }

type CreateInstantiateMsgProps = Omit<InstantiateMsg, 'decimals' | 'prng_seed'>

export function createInstantiateMsg(tokenInfo: CreateInstantiateMsgProps): InstantiateMsg {
  return {
    decimals: DECIMALS,
    prng_seed: btoa(window.crypto.randomUUID()),
    config: {
      public_total_supply: true,
    },
    ...tokenInfo,
  }
}
