import GradientText from '@/components/buttons/GradientText'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import Link from 'next/link'

interface StepsNavigationProps {
  className?: string
  submitText?: string
  prevStepPath?: string
}

export default function StepsNavigation({ className, submitText, prevStepPath }: StepsNavigationProps) {
  return (
    <div className={`${className} flex flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-16`}>
      <div className='basis-full sm:basis-3/4 sm:order-1'>
        <PrimaryButton type='submit'>{submitText ? submitText : 'Next'}</PrimaryButton>
      </div>

      <div className='basis-full sm:basis-1/4 text-center sm:text-left'>
        {typeof prevStepPath === 'string' && (
          <Link href={prevStepPath}>
            <a>
              <GradientText>Back</GradientText>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}
