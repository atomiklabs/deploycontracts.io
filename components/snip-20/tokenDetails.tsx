import { useEffect, useRef } from 'react'
import { Form, Formik } from 'formik'
import type { FormikProps } from 'formik'

import SecondaryButton from '@/components/buttons/SecondaryButton'
import Input from '@/components/Input'
import StepsNavigation from '@/components/snip-20/StepsNavigation'

import { BasicTokenInfoEntity } from '@/lib/snip20-token-creator/entity/basic-token-info'

interface TokenDetailsProps {
  minterAddress: string | undefined
  prevStepPath: string
  formData: BasicTokenInfoEntity
  validationSchema: any
  onConnectWallet: () => Promise<string>
  onSubmit: (formData: BasicTokenInfoEntity) => void
}

export default function TokenDetails({
  minterAddress,
  prevStepPath,
  formData,
  validationSchema,
  onConnectWallet,
  onSubmit,
}: TokenDetailsProps) {
  const formikRef = useRef<FormikProps<typeof formData>>()

  useEffect(() => {
    if (typeof formikRef.current === 'undefined') {
      return
    }

    formikRef.current.setFieldValue('minterAddress', minterAddress)
  })

  return (
    <>
      <div className='flex flex-col gap-y-[34px]'>
        <h1 className='font-space-grotesk font-bold text-xl text-white'>SNIP-20 Token details</h1>

        <p className='text-gray-100'>
          Fill up the form to create and deploy new <span className='whitespace-nowrap'>SNIP-20</span> smart contract.
          This would take only few minutes and it's completely free.
        </p>
      </div>

      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        // @ts-ignore
        innerRef={formikRef}
      >
        <Form>
          <Input className='mt-9' label='Minter address' type='hidden' name='minterAddress'>
            {minterAddress ? (
              // TODO: allow refreshing token by pulling currently selected account in Keplr
              <div className='text-gray-200'>{minterAddress}</div>
            ) : (
              <SecondaryButton onClick={onConnectWallet} type='button'>
                Connect your wallet
              </SecondaryButton>
            )}
          </Input>

          <Input
            className='mt-14'
            name='tokenSymbol'
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

          <StepsNavigation className='mt-20' prevStepPath={prevStepPath} />
        </Form>
      </Formik>
    </>
  )
}
