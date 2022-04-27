import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton'

export default function tokenDetails() {
  return (
    <section className='text-center'>
      <h1 className=' font-space-grotesk font-bold text-xl text-white'>Token details</h1>

      <PrimaryButton>Primary Button</PrimaryButton>
      <SecondaryButton>secondary button</SecondaryButton>
    </section>
  )
}
