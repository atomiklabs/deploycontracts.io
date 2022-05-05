import { useState } from 'react'
import { useToken } from '@/utils/token'
import Input from '@/components/Input'
import { AllocationCard } from '@/utils/token.d'

export default function AllocationCardComponent({
  colour,
  allocation,
  index,
}: {
  colour: string
  allocation: AllocationCard
  index: number
}) {
  const { deleteAllocation } = useToken()
  const [deleteImage, setDeleteImage] = useState('/assets/delete-default.svg')

  return (
    <div className='relative flex flex-col gap-y-9 bg-[#0F204D] rounded-3xl p-8'>
      <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-5 lg:gap-x-[26px]'>
        <div className='w-full md:w-[80%] xl:w-[85%] whitespace-nowrap'>
          {/* TODO: Add onChange logic */}
          <Input label='Name of your allocation' placeholder='eg. Team' />
        </div>

        <div className='w-full md:w-[20%] xl:w-[15%]'>
          {/* TODO: Add onChange logic */}
          <Input label='Value' placeholder='15%' />
        </div>
      </div>

      {/* TODO: Add onChange logic */}
      <Input label='Address' placeholder='hv423jl5v3h52v123klbn41klb14' />

      {colour && (
        <div
          className='absolute top-0 bottom-0 m-auto left-[-8px] w-[16px] h-[16px] rounded-full'
          style={{ backgroundColor: colour }}
        ></div>
      )}

      {index && (
        <button
          className='md:absolute md:top-0 md:bottom-0 m-auto md:right-[-70px] w-[64px] h-[64px] hover:bg-[#0F204C] rounded-full flex items-center justify-center'
          onClick={() => deleteAllocation(index)}
          onMouseEnter={() => setDeleteImage('/assets/delete-active.svg')}
          onMouseLeave={() => setDeleteImage('/assets/delete-default.svg')}
        >
          <img src={deleteImage} className='w-6 h-6 cursor-pointer' alt='delete button icon' />
        </button>
      )}
    </div>
  )
}
