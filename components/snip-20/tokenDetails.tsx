import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import Input from '@/components/Input'
import { useSnip20 } from '@/utils/snip20Provider'
import { Formik } from 'formik'

export default function tokenDetails() {
  const { step1, step1ValidationSchema, onNextStep } = useSnip20()

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

      <Formik initialValues={step1} validationSchema={step1ValidationSchema} onSubmit={onNextStep}>
        {({ errors, touched, submitForm, isValid }) => {
          return (
            <>
              <Input
                className='mt-14'
                name='tokenName'
                type='text'
                label='Token name'
                placeholder='XYZ'
                error={errors.tokenName}
                touched={touched.tokenName}
              />

              {/* TODO: Display big numbers with spaces eg. '1 000 000' */}
              <Input
                className='mt-14'
                name='tokenTotalSupply'
                type='number'
                step={1}
                label='Total supply'
                error={errors.tokenTotalSupply}
                touched={touched.tokenTotalSupply}
              />

              {/* TODO: Add error paragraph when submited with errors */}

              <PrimaryButton className='mt-20' disabled={!isValid} onClick={() => submitForm()}>
                Next
              </PrimaryButton>
            </>
          )
        }}
      </Formik>
    </>
  )
}
