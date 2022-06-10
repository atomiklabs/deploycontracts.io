import { useState } from 'react'
import Input from '@/components/Input'
import { FieldArrayRenderProps } from 'formik'

export default function AllocationCardComponent({
  colour,
  index,
  arrayHelpers,
}: {
  colour: string
  index: number
  arrayHelpers: FieldArrayRenderProps
}) {
  const [deleteImage, setDeleteImage] = useState('/assets/delete-default.svg')

  return (
    <div className='relative flex flex-col gap-y-9 bg-[#0F204D] rounded-3xl p-8'>
      <div className='flex flex-col md:flex-row gap-y-9 md:gap-x-5 lg:gap-x-[26px]'>
        <div className='w-full md:w-[70%] whitespace-nowrap'>
          <Input
            name={`allocations.${index}.name`}
            label='Name of your allocation'
            placeholder='eg. Team'
            autoComplete='off'
            autoFocus
            required
          />
        </div>

        <div className='w-full md:w-[30%]'>
          <Input
            name={`allocations.${index}.value`}
            type='number'
            label='Value (%)'
            placeholder='100%'
            autoComplete='off'
            required
          />
        </div>
      </div>

      <Input name={`allocations.${index}.address`} label='Secret address' placeholder='' required autoComplete='off' />

      {colour && (
        <div
          className='absolute top-0 bottom-0 m-auto left-[-8px] w-[16px] h-[16px] rounded-full'
          style={{ backgroundColor: colour }}
        ></div>
      )}

      {index > 0 && (
        <button
          className='md:absolute md:top-0 md:bottom-0 m-auto md:right-[-70px] w-[64px] h-[64px] hover:bg-[#0F204C] rounded-full flex items-center justify-center'
          onClick={(e) => {
            e.preventDefault()
            arrayHelpers.remove(index)
          }}
          onMouseEnter={() => setDeleteImage('/assets/delete-active.svg')}
          onMouseLeave={() => setDeleteImage('/assets/delete-default.svg')}
        >
          <img src={deleteImage} className='w-6 h-6 cursor-pointer' alt='delete button icon' />
        </button>
      )}
    </div>
  )
}
