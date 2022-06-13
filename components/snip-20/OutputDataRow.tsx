type Props = {
  title: string
  data?: any
  colour?: string
  imageUrl?: string
}

export default function OutputDataRow({ title, data, colour, imageUrl }: Props) {
  return (
    <div className='flex flex-col break-words'>
      <div className='text-gray-100'>{title}</div>

      {colour ? (
        <div className='flex flex-row items-center gap-x-2 text-white font-bold'>
          <div className=' w-4 h-4 rounded-full' style={{ backgroundColor: colour }} />
          {data}
        </div>
      ) : (
        <div className='text-white font-bold'>{data}</div>
      )}

      {imageUrl && (
        <div className='flex items-center'>
          <img src='/assets/github.svg' alt='logo image' />
        </div>
      )}
    </div>
  )
}
