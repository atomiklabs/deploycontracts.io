import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import TokenDetails from '@/components/snip-20/tokenDetails'
import TokenAllocation from '@/components/snip-20/tokenAllocation'
import TokenMarketing from '@/components/snip-20/tokenMarketing'

const LocalContext = createContext({} as TSnip20Provider)

export function Snip20Provider({ children }: any) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<{ index: number; component: JSX.Element }>()
  const [snip20FormData, setSnip20FormData] = useLocalStorage<TSnip20FormData>(`snip20FormData`, initialSnip20FormData)

  useEffect(() => {
    if (router.isReady) {
      routerIsReady()
    }
  }, [router.isReady, router.query])

  async function routerIsReady() {
    const currentStep = getCurrentStep(router.query)

    if (!currentStep.component) {
      console.warn('--- Error: wrong query param step. Redirecting to the first step')
      return router.replace('/snip-20/step-1')
    }

    try {
      await snip20ValidationSchema.validate(snip20FormData)
    } catch (e) {
      console.warn('--- localstorage snip20FormData schema is wrong, reset to default values', e)
      setSnip20FormData(initialSnip20FormData)
    }

    setCurrentStep({ ...currentStep })
  }

  if (!currentStep) {
    return null
  }

  async function onNextStep(data: {}) {
    console.log('--- onNextStep: ', data)

    if (!currentStep) {
      console.error('--- currentStep is not defined')
      return
    }

    const updatedSnip20FormData = {
      ...snip20FormData,
      [`step${currentStep.index}`]: {
        ...data,
      },
    }

    try {
      await snip20ValidationSchema.validate(updatedSnip20FormData)
      setSnip20FormData(updatedSnip20FormData)
    } catch (e) {
      console.error('--- snip20ValidationSchema', e)
    }

    const nextStepPath = `step-${currentStep.index + 1}`
    router.push(nextStepPath)
  }

  return <LocalContext.Provider value={{ currentStep, snip20FormData, onNextStep }}>{children}</LocalContext.Provider>
}

export function useSnip20() {
  return useContext(LocalContext)
}

function getCurrentStep(routerQuery: ParsedUrlQuery) {
  const errorResponse = { index: -1, component: undefined }

  if (typeof routerQuery.step !== 'string') {
    return errorResponse
  }

  switch (routerQuery.step) {
    case 'step-1':
      return {
        index: 1,
        component: <TokenDetails />,
      }
    case 'step-2':
      return {
        index: 2,
        component: <TokenAllocation />,
      }
    case 'step-3':
      return {
        index: 3,
        component: <TokenMarketing />,
      }
  }

  return errorResponse
}

const initialSnip20FormData: TSnip20FormData = {
  step1: { tokenName: '', tokenTotalSupply: 1_000_000 },
  step2: { abc: '' },
  step3: { xyz: '' },
}

export const snip20ValidationSchema = yup.object({
  step1: yup.object({
    tokenName: yup.string().required(),
    tokenTotalSupply: yup.number().min(1).required(),
  }),
  step2: yup.object({
    abc: yup.string(),
  }),
  step3: yup.object({
    xyz: yup.string(),
  }),
})

type TSnip20Provider = {
  currentStep: { index: number; component: JSX.Element }
  snip20FormData: TSnip20FormData
  onNextStep: (data: {}) => void
}

type TSnip20FormData = yup.TypeOf<typeof snip20ValidationSchema>
