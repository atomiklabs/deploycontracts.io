import { useState } from 'react'
import Container from '@/components/Container'
import Input from '@/components/Input'

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
            {logo ? (
              <div className='px-6 py-9 flex flex-row justify-between items-center bg-[#0F204D] rounded-2xl'>
                <div className='flex flex-row items-center gap-x-5 font-normal'>
                  <img src='/assets/folder.svg' alt='icon' className=' w-14 h-full' />
                  <div className='text-base text-gray-100 leading-5'>Logo.png</div>
                </div>
                <img src='/assets/delete-default.svg' alt='delete icon' className=' w-[22px] h-full cursor-pointer' />
              </div>
            ) : (
              <label className='cursor-pointer flex flex-col gap-y-2 items-center p-7 border-2 border-dashed border-[#455378] rounded-2xl bg-[#000B28]'>
                <div className='bg-[rgba(96,117,170,0.2)] h-16 w-16 rounded-full flex items-center justify-center'>
                  <img className='w-8 h-8' src='/assets/folder.svg' alt='folder logo' />
                </div>
                <div className='mt-6 font-medium text-base text-gray-100'>
                  <span className='drag-drop-gradient relative bg-clip-text text-transparent bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)]'>
                    Select logo
                  </span>{' '}
                  or drag and dorp here
                </div>
                <div className='text-xs text-gray-300'>jpg, gif, jpeg, png, pdf (max. 5 MB)</div>
                <input type='file' name='file_upload' className='hidden' />
              </label>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
