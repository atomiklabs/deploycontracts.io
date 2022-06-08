import { useRouter } from 'next/router'
import TokenDetails from '@/components/snip-20/tokenDetails'
import TokenAllocation from '@/components/snip-20/tokenAllocation'
import TokenMarketing from '@/components/snip-20/tokenMarketing'
import { Snip20Provider } from '@/utils/snip20Provider'

import { useEffect, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import Snip20 from '@/components/snip-20'

export default function Step() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<{ step: number; component: JSX.Element }>()

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

    setCurrentStep(currentStep)
  }

  if (!currentStep) {
    return
  }

  return (
    <Snip20Provider>
      <Snip20 step={currentStep.step} component={currentStep.component} />
    </Snip20Provider>
  )
}

function getCurrentStep(routerQuery: ParsedUrlQuery) {
  const errorResponse = { step: -1, component: undefined }

  if (typeof routerQuery.step !== 'string') {
    return errorResponse
  }

  switch (routerQuery.step) {
    case 'step-1':
      return {
        step: 1,
        component: <TokenDetails />,
      }
    case 'step-2':
      return {
        step: 2,
        component: <TokenAllocation />,
      }
    case 'step-3':
      return {
        step: 3,
        component: <TokenMarketing />,
      }
  }

  return errorResponse
}
