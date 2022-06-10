import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import LinkButton from '@/components/buttons/LinkButton'

export default function tokenMarketing() {
  const { goToPrevStep } = useSnip20Steps()

  return (
    <div className='flex flex-col gap-y-[34px]'>
      <h1 className='font-space-grotesk font-bold text-xl text-white'>Marketing details</h1>
      <p className='text-gray-100'>
        Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
        convallis tortor.
      </p>

      <LinkButton
        onClick={(e) => {
          e.preventDefault()
          goToPrevStep()
        }}
      >
        Back
      </LinkButton>
    </div>
  )
}
