import { getImageFromCID } from '@/utils/ipfs'

type Props = {
  title: string
  data?: any
  index?: number
  projectLogoCID?: string
}

export default function OutputDataRow({ title, data, index, projectLogoCID }: Props) {
  const dataFormatted = data || <span className='font-normal text-sm opacity-80'>Not provided</span>

  return (
    <div className='flex flex-col break-words'>
      <div className='text-gray-100'>{title}</div>

      {index ? (
        <div className='flex flex-row items-center gap-x-2 text-white font-bold'>
          <div className={`w-4 h-4 rounded-full bg-progress-bar-${index}`} />
          {dataFormatted}
        </div>
      ) : projectLogoCID ? (
        <div className='max-w-xs flex items-center'>
          <img src={getImageFromCID(projectLogoCID)} alt='logo image' />
        </div>
      ) : (
        <div className='text-white font-bold'>{dataFormatted}</div>
      )}
    </div>
  )
}
