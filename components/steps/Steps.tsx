import Step1 from '@/components/steps/Step1'
import Step2 from '@/components/steps/Step2'
import Step3 from '@/components/steps/Step3'
import Step4 from '@/components/steps/Step4'

export default function Steps() {
  return (
    <section>
      <div className='flex flex-row gap-x-4 justify-end'>
        <Step1 height={48} width={48} fill='#671bc9' fillRule='nonzero' stroke='black' />
        <Step2 height={48} width={48} />
        <Step3 height={48} width={48} />
        <Step4 height={48} width={48} />
      </div>
    </section>
  )
}
