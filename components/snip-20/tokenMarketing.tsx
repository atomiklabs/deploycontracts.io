import { useState } from 'react'
import Input from '@/components/Input'
import UploadLogo from '@/components/snip-20/UploadLogo'
import { Form, Formik } from 'formik'
import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import StepsNavigation from './StepsNavigation'
import { initialStepsFormData } from '@/utils/snip20Form'
import { WORKERS_URL } from 'consts'

export default function tokenMarketing() {
  const { onNextStep, getFormData } = useSnip20Steps()
  const stepIndex = 3
  const { initialValues, validationSchema } = getFormData(stepIndex)
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
    alert('Ups... something went wrong')
    console.error('--- catch: ', err)
  }

  function onDelete(setFieldValue: (field: string, value: any) => void) {
    setFieldValue('projectLogoCID', initialStepsFormData[2].projectLogoCID)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(formValues) => {
        !isUploading && onNextStep(formValues)
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className='flex flex-col gap-y-[34px]'>
            <h1 className='font-space-grotesk font-bold text-xl text-white'>Marketing details</h1>

            <p className='text-gray-100'>
              Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
              convallis tortor.
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
            <Input name='projectDescription' label='Description' placeholder='Short description' autoComplete='off' />

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

          <StepsNavigation className='mt-20' />
        </Form>
      )}
    </Formik>
  )
}
