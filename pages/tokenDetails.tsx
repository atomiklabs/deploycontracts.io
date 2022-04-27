import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import Input from '@/components/Input'

export default function tokenDetails() {
  return (
    <section className='flex flex-col m-auto max-w-[500px] gap-y-8'>
      <h1 className=' font-space-grotesk font-bold text-xl text-white'>Token details</h1>
      <PrimaryButton>Primary Button</PrimaryButton>
      <SecondaryButton>Secondary Button</SecondaryButton>
      <Input label='Name of your token' placeholder='Token name' />
    </section>
  )
}
