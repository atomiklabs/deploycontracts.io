import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Input from '@/components/Input'
import LoadedLogo from '@/components/snip-20/LoadedLogo'
import UploadLogo from '@/components/snip-20/UploadLogo'
import { Form, Formik } from 'formik'
import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import StepsNavigation from './StepsNavigation'

export default function tokenMarketing() {
  const { onNextStep, getFormData } = useSnip20Steps()
  const stepIndex = 3
  const { initialValues, validationSchema } = getFormData(stepIndex)

  const [files, setFiles] = useState<object[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      // TODO: Link it with Formik data
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
    multiple: false,
  })

  function onDelete() {
    setFiles([])
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onNextStep}>
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
            {files.length ? (
              <LoadedLogo files={files} onDelete={onDelete} />
            ) : (
              <UploadLogo getRootProps={getRootProps} getInputProps={getInputProps} />
            )}
          </div>
        </div>

        <StepsNavigation className='mt-20' />
      </Form>
    </Formik>
  )
}
