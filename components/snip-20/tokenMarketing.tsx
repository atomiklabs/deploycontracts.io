import { useState } from 'react'
import Input from '@/components/Input'
import UploadLogo from '@/components/snip-20/UploadLogo'
import { Form, Formik } from 'formik'

import StepsNavigation from '@/components/snip-20/StepsNavigation'
import { LOCAL_DEV_API_KEY, WORKERS_URL } from 'consts'
import { MarketingInfoEntity } from '@/lib/snip20-token-creator/entity/marketing-info'

interface TokenMarketingProps {
  prevStepPath: string
  formData: MarketingInfoEntity
  validationSchema: any
  onSubmit: (formData: MarketingInfoEntity) => void
}

export default function TokenMarketing({ prevStepPath, formData, validationSchema, onSubmit }: TokenMarketingProps) {
  const [isUploading, setIsUploading] = useState(false)

  async function onDrop(setFieldValue: (field: string, value: any) => void, files: File[]) {
    setIsUploading(true)
    const file = files[0]

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(WORKERS_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'x-local-dev-api-key': LOCAL_DEV_API_KEY || '',
        },
      })
      const result = await response.json()

      if (result.error) {
        return onUploadError(result.error)
      }

      setFieldValue('projectLogoCID', result.value.cid)
      setIsUploading(false)
    } catch (err) {
      onUploadError(err)
    }
  }

  function onUploadError(err: any) {
    setIsUploading(false)

    // TODO: Improve error handling
    alert('Ups... something went wrong and upload was not completed. Try again.')
    console.error('--- catch: ', err)
  }

  function onDelete(setFieldValue: (field: string, value: any) => void) {
    setFieldValue('projectLogoCID', '')
  }

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(formValues) => {
        !isUploading && onSubmit(formValues)
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className='flex flex-col gap-y-[34px]'>
            <h1 className='font-space-grotesk font-bold text-xl text-white'>Marketing details</h1>

            <p className='text-gray-100'>
              This is an optional step. Marketing details would be stored on the smart contract directly. Logo is
              uploaded to IPFS via{' '}
              <a href='https://nft.storage' target='_blank'>
                https://nft.storage
              </a>
            </p>
          </div>

          <div className='mt-8 flex flex-col gap-y-8'>
            <Input
              name='projectName'
              label='Name of the project'
              placeholder='Project name'
              autoFocus
              autoComplete='off'
            />

            {/* TODO: Change to textarea */}
            <Input name='projectDescription' label='Short description' placeholder='Description' autoComplete='off' />

            <div className='flex flex-col gap-y-3'>
              <div className='text-white font-medium'>Logo</div>
              <UploadLogo
                imageCID={values.projectLogoCID}
                isUploading={isUploading}
                onDrop={(files) => onDrop(setFieldValue, files)}
                onDelete={(e) => {
                  e.preventDefault(), onDelete(setFieldValue)
                }}
              />
            </div>
          </div>

          <StepsNavigation className='mt-20' prevStepPath={prevStepPath} />
        </Form>
      )}
    </Formik>
  )
}
