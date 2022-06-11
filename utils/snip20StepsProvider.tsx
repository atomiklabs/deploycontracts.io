import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import TokenDetails from '@/components/snip-20/tokenDetails'
import TokenAllocation from '@/components/snip-20/tokenAllocation'
import TokenMarketing from '@/components/snip-20/tokenMarketing'
import TokenSummary from '@/components/snip-20/tokenSummary'
import { initialStepsFormData, stepsValidationSchema } from '@/utils/snip20Form'

const LocalContext = createContext({} as TSnip20StepsProvider)

export function Snip20StepsProvider({ children }: any) {
  const router = useRouter()
  const [isRouterInitialized, setIsRouterInitialized] = useState(false)
  const [currentStepData, setCurrentStepData] = useState<TCurrentStepData>()
  const [snip20FormData, setSnip20FormData] = useLocalStorage(`snip20FormData`, initialStepsFormData)

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
      return console.error('--- goToPrevStep prevStepIndex', prevStepIndex)
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
    <LocalContext.Provider value={{ currentStepData, snip20FormData, getFormData, onNextStep, goToPrevStep }}>
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
}

type TFormDataReturnValue = {
  initialValues: typeof initialStepsFormData[0]
  validationSchema: typeof stepsValidationSchema[0]
}

type TCurrentStepData = { stepIndex: number; component: JSX.Element }
