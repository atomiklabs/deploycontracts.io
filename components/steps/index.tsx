import dynamic from 'next/dynamic'
import { useStepIcon } from '@/components/steps/useStepIcon'
type StepsProps = {
  activeStep: number
}

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
})

const stepTitles = ['Token Details', 'Token Allocation', 'Marketing details', 'Summary']

export function Steps({ activeStep }: StepsProps) {
  activeStep -= 1

  return (
    <section>
      <div className='flex flex-row gap-x-4'>
        {[...Array(4)].map((_, idx) => (
          <div
            key={`step-icon-${idx}`}
            className={`flex items-center ${activeStep === idx ? 'sm:flex-1' : ''} gap-x-4`}
          >
            <div
              className='w-12 h-12 cursor-pointer'
              data-for='custom-class'
              data-tip={stepTitles.slice(idx, idx + 1)}
              {...useStepIcon(idx, activeStep)}
            >
              <img src={useStepIcon(idx, activeStep)?.step} alt='step icon' />
            </div>

            {activeStep === idx && (
              <span className='hidden sm:block text-gray-100 text-sm font-medium whitespace-nowrap tracking-[.2rem]'>
                STEP {`${activeStep + 1}/${stepTitles.length}`}
              </span>
            )}

            <ReactTooltip
              id='custom-class'
              className='custom-tooltip'
              textColor='#DCE2F2'
              backgroundColor='#0F204C'
              place='bottom'
              type='dark'
              effect='solid'
            />
          </div>
        ))}
      </div>

      <div className='sm:hidden mt-3 text-gray-100 text-sm font-medium whitespace-nowrap tracking-[.2rem]'>
        STEP {`${activeStep + 1}/${stepTitles.length}`}
      </div>
    </section>
  )
}

export enum StepState {
  ToBeVisited,
  Current,
  Visited,
}
