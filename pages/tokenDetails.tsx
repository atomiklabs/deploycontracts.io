import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import Container from '@/components/Container'
import Input from '@/components/Input'
import Steps from '@/components/steps/Steps'

export default function tokenDetails() {
  return (
    <section>
      <Container>
        <div className='mt-10 col-span-full sm:col-start-3 sm:col-span-8 xl:col-start-5 xl:col-span-4'>
          <Steps />
        </div>
        <div className='col-span-full sm:col-start-3 sm:col-span-8 xl:col-start-5 xl:col-span-4 flex flex-col gap-y-[34px]'>
          <h1 className='font-space-grotesk font-bold text-xl text-white'>Token details</h1>
          <p className='text-gray-100'>
            Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
            convallis tortor.
          </p>
        </div>
        <div className='col-span-full sm:col-start-3 sm:col-span-8 xl:col-start-5 xl:col-span-4'>
          <SecondaryButton title='secondary button' />
        </div>
        <form className='col-span-full sm:col-start-3 sm:col-span-8 xl:col-start-5 xl:col-span-4 mt-12 flex flex-col gap-y-[52px]'>
          <Input label='Name of your token' placeholder='ABCD' />
          <Input label='Tottal supply' placeholder='1 000 000 000' />
          <PrimaryButton title='primary button' />
        </form>
      </Container>
    </section>
  )
}
