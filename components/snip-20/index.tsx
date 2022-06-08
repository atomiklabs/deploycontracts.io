import Container from '@/components/snip-20/Container'
import { Steps } from '@/components/steps'
import { useSnip20 } from '@/utils/snip20Provider'

export default function Snip20() {
  const { currentStep } = useSnip20()

  if (!currentStep) {
    return null
  }

  return (
    <Container className='pt-20'>
      <Steps activeStep={currentStep.index} />

      <section className='mt-10'>{currentStep.component}</section>
    </Container>
  )
}
