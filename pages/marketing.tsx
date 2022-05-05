import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Container from '@/components/Container'
import Input from '@/components/Input'
import LoadedLogo from '@/components/marketing/LoadedLogo'
import UploadLogo from '@/components/marketing/UploadLogo'

export default function marketing() {
  const [files, setFiles] = useState<object[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
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

  function deleteLogo() {
    setFiles([])
  }

  useEffect(() => {
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <section className='mt-20'>
      <Container>
        <div className='flex flex-col gap-y-[34px]'>
          <h1 className='font-space-grotesk font-bold text-xl text-white'>Marketing details</h1>
          <p className='text-gray-100'>
            Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
            convallis tortor.
          </p>
        </div>
        <div className='mt-8 flex flex-col gap-y-8'>
          <Input label='Name of the project' placeholder='Project name' />
          <Input label='Description' placeholder='Short description...' textarea />
          <div className='flex flex-col gap-y-3'>
            <div className='text-white font-medium'>Logo</div>
            {files.length ? (
              <LoadedLogo files={files} deleteLogo={deleteLogo} />
            ) : (
              <UploadLogo getRootProps={getRootProps} getInputProps={getInputProps} />
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
