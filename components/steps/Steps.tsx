import { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Step1Icon, Step2Icon, Step3Icon, Step4Icon } from '@/components/steps/icons'
import { useStepIcon } from '@/components/steps/useStepIcon'
type StepsProps = {
  activeStep: number
}

const pageTitles = ['Token Details', 'Token Allocation', 'Marketing details', 'Summary']

export function Steps({ activeStep }: StepsProps) {
  const [hoveredId, sethoveredId] = useState<number | null>(null)

  return (
    <section>
      <div className='flex flex-row gap-x-4'>
        {[Step1Icon, Step2Icon, Step3Icon, Step4Icon].map((StepIcon, idx) =>
          activeStep === idx ? (
            <div className='flex flex-1 items-center gap-x-4'>
              <StepIcon
                key={idx}
                className='w-12 h-12 cursor-pointer'
                data-class='custom-tooltip'
                data-tip={pageTitles.slice(idx, idx + 1)}
                {...useStepIcon(idx, activeStep)}
                onMouseOver={() => {
                  sethoveredId(idx)
                }}
                onMouseLeave={() => {
                  sethoveredId(null)
                }}
              />
              <span className='text-gray-100 font-medium whitespace-nowrap tracking-[.2rem]'>
                STEP {activeStep + 1}/4
              </span>
              <ReactTooltip
                className='custom-tooltip'
                textColor='#DCE2F2'
                backgroundColor='#0F204C'
                place='bottom'
                type='dark'
                effect='solid'
              />
            </div>
          ) : (
            <div>
              <StepIcon
                key={idx}
                className='w-12 h-12 cursor-pointer self-end'
                data-class='custom-tooltip'
                data-tip={pageTitles.slice(idx, idx + 1)}
                {...useStepIcon(idx, activeStep)}
                onMouseOver={() => {
                  sethoveredId(idx)
                }}
                onMouseLeave={() => {
                  sethoveredId(null)
                }}
              />
              {
                <ReactTooltip
                  className='custom-tooltip'
                  textColor='#DCE2F2'
                  backgroundColor='#0F204C'
                  place='bottom'
                  type='dark'
                  effect='solid'
                />
              }
            </div>
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
