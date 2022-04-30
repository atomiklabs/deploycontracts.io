import { useEffect, useState } from 'react'
import Input from '@/components/Input'
import Delete from '@/components/Delete'
import { colourPallete } from '@/utils/colourPallete'

export default function AllocationCart({
  hideDeleteButton,
  counter,
  deleteAllocation,
}: {
  hideDeleteButton: boolean
  counter: number
  deleteAllocation: any
}) {
  const [count, setCount] = useState<number>(counter)
  const [colour, setColour] = useState(colourPallete[0])

  useEffect(() => {
    setColour(colourPallete.slice(count, count + 1).toString())
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
      {hideDeleteButton ? (
        <div className='md:absolute md:top-0 md:bottom-0 m-auto md:right-[-70px] w-[64px] h-[64px] hover:bg-[#242b3c] rounded-full'>
          <Delete className='cursor-pointer' height={64} width={64} onClick={() => deleteAllocation()} />
        </div>
      ) : null}
    </div>
  )
}
