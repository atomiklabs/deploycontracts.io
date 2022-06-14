import { useState } from 'react'
import Input from '@/components/Input'
import UploadLogo from '@/components/snip-20/UploadLogo'
import { Form, Formik } from 'formik'
import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import StepsNavigation from './StepsNavigation'
import { initialStepsFormData } from '@/utils/snip20Form'
import axios from 'axios'

export default function tokenMarketing() {
  const { onNextStep, getFormData } = useSnip20Steps()
  const stepIndex = 3
  const { initialValues, validationSchema } = getFormData(stepIndex)
  const [isUploading, setIsUploading] = useState(false)

  async function onDrop(setFieldValue: (field: string, value: any) => void, files: File[]) {
    setIsUploading(true)
    const file = files[0]

    const formData = new FormData()
    formData.append('image', file)

    const response = await axios.post('http://127.0.0.1:8787', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log({ response })

    // TODO: replace with CID
    setTimeout(() => {
      setFieldValue('projectLogo', {
        name: file.name,
        preview: URL.createObjectURL(file),
        ipfsUrl: 'ipfs_url',
      })
      setIsUploading(false)
    }, 1000)
  }

  function onDelete(setFieldValue: (field: string, value: any) => void) {
    setFieldValue('projectLogo', initialStepsFormData[2].projectLogo)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onNextStep}>
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
                fileData={values.projectLogo}
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
