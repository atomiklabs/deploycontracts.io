import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import Input from '@/components/Input'
import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import { Form, Formik } from 'formik'

export default function tokenDetails() {
  const { onNextStep, getFormData } = useSnip20Steps()
  const stepIndex = 1
  const { initialValues, validationSchema } = getFormData(stepIndex)

  return (
    <>
      <div className='flex flex-col gap-y-[34px]'>
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

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onNextStep}>
        <Form>
          <Input
            className='mt-14'
            name='tokenName'
            type='text'
            label='Token symbol'
            placeholder='SCRT'
            required
            autoComplete='off'
          />

          {/* TODO: Display big numbers with spaces eg. '1 000 000' */}
          <Input
            className='mt-14'
            name='tokenTotalSupply'
            type='number'
            step={1}
            label='Total supply'
            required
            autoComplete='off'
          />

          <PrimaryButton className='mt-20' type='submit'>
            Next
          </PrimaryButton>
        </Form>
      </Formik>
    </>
  )
}
