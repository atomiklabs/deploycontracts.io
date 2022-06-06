import Container from '@/components/snip-20/Container'
import { Steps } from '@/components/steps'

export default function Snip20({ step, component }: { step: number; component: JSX.Element }) {
  return (
    <Container className='pt-20'>
      <Steps activeStep={step} />

      <section className='mt-10'>{component}</section>
    </Container>
  )
}
