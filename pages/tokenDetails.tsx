import { useState } from 'react'
import useForm from '@/utils/useForm'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import Container from '@/components/Container'
import Input from '@/components/Input'
import { Steps } from '@/components/steps'

const iniialValues = {
  tokenName: '',
  supply: '',
}

export default function tokenDetails() {
  const [activeStep, setActiveStep] = useState(0)
  const { inputs, handleChange, handleSubmit } = useForm(iniialValues)

  return (
    <section className='mt-20'>
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

          <SecondaryButton>
            <div className='px-12 py-4'>Connect your wallet</div>
          </SecondaryButton>
        </div>

        <form className='mt-12 flex flex-col gap-y-[52px]' onSubmit={handleSubmit}>
          <Input
            label='Name of your token'
            placeholder='Token name'
            name='tokenName'
            value={inputs.tokenName}
            handleChange={handleChange}
          />
          <Input
            label='Tottal supply'
            placeholder='1 000 000 000'
            name='supply'
            value={inputs.supply}
            handleChange={handleChange}
          />

          <PrimaryButton type='submit'>
            <div className='px-12 py-4'>Next</div>
          </PrimaryButton>
        </form>
      </Container>
    </section>
  )
}
