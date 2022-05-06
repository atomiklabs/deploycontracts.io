import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Container from '@/components/Container'
import Input from '@/components/Input'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import LinkButton from '@/components/buttons/LinkButton'

export default function marketing() {
  const [logo, setLogo] = useState(false)
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
          <div className='my-20 flex flex-row justify-between items-center gap-x-16 md:gap-x-[144px]'>
            <div>
              <LinkButton href='/tokenAllocation'>Back</LinkButton>
            </div>
            <div className='flex-1'>
              <PrimaryButton>
                <a href='/' className='px-12 py-4 inline-block w-full h-full'>
                  Next
                </a>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
