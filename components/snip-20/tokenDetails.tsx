import SecondaryButton from '@/components/buttons/SecondaryButton'
import Input from '@/components/Input'
import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import { Form, Formik } from 'formik'
import StepsNavigation from './StepsNavigation'

export default function tokenDetails() {
  const { onNextStep, getFormData } = useSnip20Steps()
  const stepIndex = 1
  const { initialValues, validationSchema } = getFormData(stepIndex)

  return (
    <>
      <div className='flex flex-col gap-y-[34px]'>
        <h1 className='font-space-grotesk font-bold text-xl text-white'>SNIP-20 Token details</h1>

        <p className='text-gray-100'>
          Fill up the form to create and deploy new <span className='whitespace-nowrap'>SNIP-20</span> smart contract.
          This would take only few minutes and it's completely free.
        </p>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onNextStep}>
        {({ setFieldValue, values }) => (
          <Form>
            <Input className='mt-9' label='Minter address' type='hidden' name='minterAddress'>
              {values.minterAddress ? (
                <div className='text-gray-200'>{values.minterAddress}</div>
              ) : (
                <SecondaryButton
                  onClick={(e) => {
                    e.preventDefault()
                    console.log('--- Connect your wallet')
                    setFieldValue('minterAddress', 'secret1djskfhjsekf_example_address')
                  }}
                >
                  Connect your wallet
                </SecondaryButton>
              )}
            </Input>

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
              placeholder='1 000 000'
              required
              autoComplete='off'
            />

            <StepsNavigation className='mt-20' />
          </Form>
        )}
      </Formik>
    </>
  )
}
