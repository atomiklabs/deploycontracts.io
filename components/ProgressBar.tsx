type Props = {
  progressBarItems: object
}

export default function ProgressBar({ progressBarItems }: Props) {
  return (
    <section className='flex flex-col gap-y-1'>
      <div className='w-full bg-[#455378] rounded-full h-2.5'>
        <div className='bg-[#FD0F9E] h-2.5 rounded-full w-[45%]'></div>
      </div>
      <div className='flex flex-row justify-between text-gray-100 text-sm'>
        <div>You should use all space</div>
        <div className='font-medium'>Free: 100%</div>
      </div>
    </section>
  )
}
