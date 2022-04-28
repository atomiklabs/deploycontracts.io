import { Step1Icon, Step2Icon, Step3Icon, Step4Icon } from '@/components/steps/icons'
import { useStepIcon } from '@/components/steps/useStepIcon'
type StepsProps = {
  activeStep: number
}

export function Steps({ activeStep }: StepsProps) {
  console.log(activeStep)

  return (
    <section>
      <div className='flex flex-row gap-x-4'>
        {[Step1Icon, Step2Icon, Step3Icon, Step4Icon].map((StepIcon, idx) =>
          activeStep === idx ? (
            <div className='flex flex-1 items-center gap-x-4'>
              <StepIcon key={idx} className='w-12 h-12 cursor-pointer' {...useStepIcon(idx, activeStep)} />
              <span className='text-gray-100 font-medium whitespace-nowrap tracking-[.2rem]'>
                STEP {activeStep + 1}/4
              </span>
            </div>
          ) : (
            <StepIcon key={idx} className='w-12 h-12 cursor-pointer self-end' {...useStepIcon(idx, activeStep)} />
          ),
        )}
      </div>
    </section>
  )
}

export enum StepState {
  ToBeVisited,
  Current,
  Visited,
}
