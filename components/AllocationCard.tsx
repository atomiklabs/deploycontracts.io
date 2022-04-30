import { useEffect, useState } from 'react'
import { useToken } from '@/utils/token'
import Input from '@/components/Input'

export default function AllocationCar({ colour, cardId }: { colour: string; cardId: number }) {
  const { setAllocationColour, deleteAllocation } = useToken()
  const [deleteImage, setDeleteImage] = useState('/assets/delete-default.svg')

  useEffect(() => {
    setAllocationColour()
  }, [])

  return (
    <div className='relative flex flex-col gap-y-9 bg-[#0F204D] rounded-3xl p-8'>
      <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-5 lg:gap-x-[26px]'>
        <div className='sm:w-[80%] xl:w-[85%] whitespace-nowrap'>
          <Input label='Name of your allocation' placeholder='eg. Team' />
        </div>
        <div className='sm:w-[20%] xl:w-[15%]'>
          <Input label='Value' placeholder='15%' />
        </div>
      </div>
      <Input label='Address' placeholder='hv423jl5v3h52v123klbn41klb14' />
      {colour && (
        <div
          className='absolute top-0 bottom-0 m-auto left-[-8px] w-[16px] h-[16px] rounded-full'
          style={{ backgroundColor: colour }}
        ></div>
      )}
      {cardId === 0 ? null : (
        <button
          className='md:absolute md:top-0 md:bottom-0 m-auto md:right-[-70px] w-[64px] h-[64px] hover:bg-[#0F204C] rounded-full flex items-center justify-center'
          onClick={() => deleteAllocation(cardId)}
          onMouseEnter={() => setDeleteImage('/assets/delete-active.svg')}
          onMouseLeave={() => setDeleteImage('/assets/delete-default.svg')}
        >
          <img src={deleteImage} className='w-6 h-6 cursor-pointer' alt='delete button icon' />
        </button>
      )}
    </div>
  )
}
