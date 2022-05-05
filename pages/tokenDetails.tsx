import { useState } from 'react'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import Container from '@/components/Container'
import Input from '@/components/Input'
import { Steps } from '@/components/steps'

export default function tokenDetails() {
  const [activeStep, setActiveStep] = useState(0)
  return (
    <section className='pt-20'>
      <Container>
        <div className='flex flex-col gap-y-[34px]'>
          <Steps activeStep={activeStep} />
          <h1 className='font-space-grotesk font-bold text-xl text-white'>Token details</h1>
          <p className='text-gray-100'>
            Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
            convallis tortor.
          </p>
        </div>

        <div className='mt-9 flex flex-col gap-y-[14px]'>
          <div className='text-white font-medium'>Minter adress</div>

          <SecondaryButton>Connect your wallet</SecondaryButton>
        </div>

        <form className='mt-12 flex flex-col gap-y-[52px]'>
          <Input label='Name of your token' placeholder='Token name' />
          <Input label='Tottal supply' placeholder='1 000 000 000' />

          <PrimaryButton>Next</PrimaryButton>
        </form>
      </Container>
    </section>
  )
}
