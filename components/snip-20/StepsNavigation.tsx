import GradientText from '@/components/buttons/GradientText'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import { useSnip20Steps } from '@/utils/snip20StepsProvider'

export default function StepsNavigation({
  className,
  submitText,
  onClick,
}: {
  className?: string
  submitText?: string
  onClick?: () => void
}) {
  const { goToPrevStep } = useSnip20Steps()

  return (
    <div className={`${className} flex flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-16`}>
      <div className='basis-full sm:basis-3/4 sm:order-1'>
        <PrimaryButton>{submitText ? submitText : 'Next'}</PrimaryButton>
      </div>

      <div className='basis-full sm:basis-1/4 text-center sm:text-left'>
        <GradientText
          onClick={(e) => {
            e.preventDefault()
            goToPrevStep()
          }}
        >
          Back
        </GradientText>
      </div>
    </div>
  )
}
