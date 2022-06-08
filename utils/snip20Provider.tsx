import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import TokenDetails from '@/components/snip-20/tokenDetails'
import TokenAllocation from '@/components/snip-20/tokenAllocation'
import TokenMarketing from '@/components/snip-20/tokenMarketing'

const LocalContext = createContext({} as TSnip20Provider)

interface TSnip20Provider {
  step1: { tokenName: string; tokenTotalSupply: number }
  step1ValidationSchema: typeof step1ValidationSchema
  currentStep: { index: number; component: JSX.Element }
  onNextStep: (data: {}) => void
}

const step1ValidationSchema = Yup.object().shape({
  tokenName: Yup.string().email().required(),
  tokenTotalSupply: Yup.number().min(1).required(),
})

export function Snip20Provider({ children }: any) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<{ index: number; component: JSX.Element }>()
  const [step1, setStep1] = useLocalStorage<TSnip20Provider['step1']>(`snip20-step1`, {
    tokenName: '',
    tokenTotalSupply: 1_000_000,
  })

  useEffect(() => {
    if (router.isReady) {
      routerIsReady()
    }
  }, [router.isReady, router.query])

  function routerIsReady() {
    const currentStep = getCurrentStep(router.query)

    if (!currentStep.component) {
      console.warn('--- Error: wrong query param step. Redirecting to the first step')
      return router.replace('/snip-20/step-1')
    }

    setCurrentStep({ ...currentStep })
  }

  if (!currentStep) {
    return null
  }

  function onNextStep(data: {}) {
    console.log('--- onNextStep: ', data)

    if (!currentStep) {
      console.error('--- currentStep is not defined')
      return
    }

    const nextStepPath = `step-${currentStep.index + 1}`
    router.push(nextStepPath)
  }

  return (
    <LocalContext.Provider value={{ currentStep, step1, step1ValidationSchema, onNextStep }}>
      {children}
    </LocalContext.Provider>
  )
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
