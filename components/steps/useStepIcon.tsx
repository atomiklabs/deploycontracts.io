import { StepState } from '@/components/steps'

type UseStepIconResult = { [k: string]: string }

export function useStepIcon(currentStepIdx: number, activeStepIdx: number): UseStepIconResult {
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
    case StepState.ToBeVisited: {
      return { fill: 'none', fillRule: 'nonzero', stroke: '#6075AA' }
    }
    case StepState.Current: {
      return { fill: 'none', fillRule: 'nonzero', stroke: 'url(#current)' }
    }
    case StepState.Visited: {
      return { fill: 'url(#visited)', fillRule: 'nonzero', stroke: 'black' }
    }
  }
}
