import dynamic from 'next/dynamic'
import { useStepIcon } from '@/components/snip-20/useStepIcon'
type StepsProps = {
  activeStep: number
}

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
})

export const stepTitles = ['Basic info', 'Allocation info', 'Marketing info', 'Summary']

export default function StepsBreadcrumb({ activeStep }: StepsProps) {
  return (
    <section>
      <div className='flex flex-row gap-x-4'>
        {stepTitles.map((x, idx) => (
          <div
            key={`step-icon-${idx}`}
            className={`flex items-center ${activeStep === idx ? 'sm:flex-1' : ''} gap-x-4`}
          >
            <div className='w-12 h-12' data-for='custom-class' data-tip={x}>
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
