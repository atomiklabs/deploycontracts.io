import Container from '@/components/snip-20/Container'
import { Steps } from '@/components/steps'
import { useSnip20Steps } from '@/utils/snip20StepsProvider'

export default function Snip20() {
  const { currentStepData } = useSnip20Steps()

  if (!currentStepData) {
    return null
  }

  return (
    <Container className='pt-20'>
      <Steps activeStep={currentStepData.stepIndex} />

      <section className='mt-10'>{currentStepData.component}</section>
    </Container>
  )
}
