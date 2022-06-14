import { StepState } from '@/components/snip-20/StepsBreadcrumb'

export function useStepIcon(currentStepIdx: number, activeStepIdx: number) {
  function getStepState(currentStepIdx: number, activeStepIdx: number): StepState {
    if (currentStepIdx < activeStepIdx) {
      return StepState.Visited
    }

    if (currentStepIdx > activeStepIdx) {
      return StepState.ToBeVisited
    }

    return StepState.Current
  }

  switch (getStepState(currentStepIdx, activeStepIdx)) {
    case StepState.ToBeVisited:
      if (currentStepIdx === 0) return { step: '/assets/step1-default.svg' }
      if (currentStepIdx === 1) return { step: '/assets/step2-default.svg' }
      if (currentStepIdx === 2) return { step: '/assets/step3-default.svg' }
      if (currentStepIdx === 3) return { step: '/assets/step4-default.svg' }

    case StepState.Current:
      if (currentStepIdx === 0) return { step: '/assets/step1-current.svg' }
      if (currentStepIdx === 1) return { step: '/assets/step2-current.svg' }
      if (currentStepIdx === 2) return { step: '/assets/step3-current.svg' }
      if (currentStepIdx === 3) return { step: '/assets/step4-current.svg' }

    case StepState.Visited:
      if (currentStepIdx === 0) return { step: '/assets/step1-visited.svg' }
      if (currentStepIdx === 1) return { step: '/assets/step2-visited.svg' }
      if (currentStepIdx === 2) return { step: '/assets/step3-visited.svg' }
      if (currentStepIdx === 3) return { step: '/assets/step4-visited.svg' }
  }
}
