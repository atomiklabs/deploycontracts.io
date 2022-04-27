import { Step1Icon, Step2Icon, Step3Icon, Step4Icon, useStepIcon } from '@/components/steps/icons'

type StepsProps = {
  activeStep: number
}

export function Steps({ activeStep }: StepsProps) {
  return (
    <section>
      <div className='flex flex-row gap-x-4 justify-end'>
        {[Step1Icon, Step2Icon, Step3Icon, Step4Icon].map((StepIcon, idx) => (
          <StepIcon key={idx} className='w-12 h-12' {...useStepIcon(idx, activeStep)} />
        ))}
      </div>
    </section>
  )
}

export enum StepState {
  ToBeVisited,
  Current,
  Visited,
}
