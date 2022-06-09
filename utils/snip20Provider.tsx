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
  const [isRouterReady, setIsRouterReady] = useState(false)
  const [currentStepData, setCurrentStepData] = useState<TCurrentStepData>()
  const [snip20FormData, setSnip20FormData] = useLocalStorage(`snip20FormData`, initialStepsFormData)

  useEffect(() => {
    if (router.isReady && !isRouterReady) {
      onRouterReady()
      setIsRouterReady(true)
    }
  }, [router.isReady])

  useEffect(() => {
    if (isRouterReady) {
      updateCurrentStepData()
    }
  }, [router.query])

  async function onRouterReady() {
    console.log('--- onRouterReady')

    const firstInvalidStepIndex = await validateAllSteps()
    router.replace(`/snip-20/step-${firstInvalidStepIndex}`)
  }

  async function validateAllSteps() {
    let firstInvalidStepIndex = stepsValidationSchema.length

    for (let i = 0; i < stepsValidationSchema.length; i++) {
      const stepIndex = i + 1

      try {
        await stepsValidationSchema[i].validate(snip20FormData[i])
      } catch (e) {
        firstInvalidStepIndex = stepIndex
        console.warn(`--- validateAllSteps validation error at step ${stepIndex}`, e)
        break
      }
    }

    return firstInvalidStepIndex
  }

  async function onNextStep(validatedData: any) {
    console.log('--- onNextStep: ', validatedData)

    if (!currentStepData) {
      return console.error('--- currentStepData is not defined')
    }

    snip20FormData[currentStepData.stepIndex - 1] = { ...validatedData }
    setSnip20FormData([...snip20FormData])

    const nextStepPath = `step-${currentStepData.stepIndex + 1}`
    router.push(nextStepPath)
  }

  function updateCurrentStepData() {
    const updatedCurrentStep = getStepData(router.query)
    console.log({ updatedCurrentStep })

    if (!updatedCurrentStep.component) {
      return console.error('--- updateCurrentStepData error')
    }

    setCurrentStepData(updatedCurrentStep)
  }

  function getFormData(stepIndex: number): TFormDataReturnValue {
    return {
      // @ts-ignore
      initialValues: initialStepsFormData[stepIndex - 1],
      // @ts-ignore
      validationSchema: stepsValidationSchema[stepIndex - 1],
    }
  }

  if (!currentStepData) {
    return null
  }

  return <LocalContext.Provider value={{ currentStepData, getFormData, onNextStep }}>{children}</LocalContext.Provider>
}

export function useSnip20() {
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
  }

  return errorResponse
}

export const initialStepsFormData = [
  { tokenName: '', tokenTotalSupply: 1_000_000 },
  { allocations: [{ name: '', value: 100, address: '' }] },
  { xyz: '' },
]

const stepsValidationSchema = [
  // step1
  yup.object({
    tokenName: yup.string().required('Required'),
    tokenTotalSupply: yup.number().min(1).required('Required'),
  }),
  // step2
  yup.object({
    allocations: yup
      .array(
        yup.object({
          name: yup.string().required('Required'),
          value: yup.number().min(0.01, 'Min value is 0.01').max(100, 'Max value is 100').required(),
          address: yup.string().required('Required'),
        }),
      )
      .min(1, 'You must have at least 1 allocation')
      .max(15, 'Maximum allocations limit is 15')
      .test({
        test: (arrayValues, context) => {
          console.log({ arrayValues })
          const sum = arrayValues?.reduce((prev, acc) => prev + (acc.value ?? 0), 0)
          return sum === 100
        },
        message: 'Sum of allocation values must be equal to 100%',
      })
      .required('Required'),
  }),
  // step3
  yup.object({
    xyz: yup.string(),
  }),
]

type TSnip20Provider = {
  currentStepData: TCurrentStepData
  onNextStep: (data: {}) => void
  getFormData: (stepIndex: number) => {
    initialValues: typeof initialStepsFormData
    validationSchema: typeof stepsValidationSchema
  }
}

type TFormDataReturnValue = {
  initialValues: typeof initialStepsFormData
  validationSchema: typeof stepsValidationSchema
}

type TCurrentStepData = { stepIndex: number; component: JSX.Element }
