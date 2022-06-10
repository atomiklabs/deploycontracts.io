import LinkButton from '@/components/buttons/LinkButton'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import { useSnip20Steps } from '@/utils/snip20StepsProvider'

export default function StepsNavigation({ className }: { className?: string }) {
  const { goToPrevStep } = useSnip20Steps()

  return (
    <div className={`${className} flex flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-16`}>
      <div className='basis-full sm:basis-3/4 sm:order-1'>
        <PrimaryButton type='submit' className='w-full h-full m-auto'>
          Next
        </PrimaryButton>
      </div>

      <div className='basis-full sm:basis-1/4 text-center sm:text-left'>
        <LinkButton
          onClick={(e) => {
            e.preventDefault()
            goToPrevStep()
          }}
        >
          Back
        </LinkButton>
      </div>
    </div>
  )
}
