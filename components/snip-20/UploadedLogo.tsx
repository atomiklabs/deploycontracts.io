import { getImageFromCID } from '@/utils/ipfs'
import { useState } from 'react'

export default function UploadedLogo({ imageCID, onDelete }: { imageCID?: string; onDelete: (e: any) => void }) {
  const [deleteImage, setDeleteImage] = useState('/assets/delete-default.svg')
  const ipfsUrl = getImageFromCID(imageCID || '')

  return (
    <div className='px-6 py-9 flex flex-row justify-between items-center bg-[#0F204D] rounded-2xl'>
      <div className='overflow-hidden flex flex-col sm:flex-row items-center gap-5 font-normal'>
        <img src={ipfsUrl} alt='icon' className='w-14 h-14 flex-shrink-0' />

        <div className='w-full p-5 overflow-hidden text-gray-100'>
          <div>IPFS preview</div>
          <a
            href={ipfsUrl}
            target='_blank'
            className='w-full block overflow-hidden text-ellipsis text-base hover:underline underline-offset-1'
            style={{ direction: 'rtl' }}
          >
            {ipfsUrl}
          </a>
        </div>

        <button
          className='shrink-0 flex items-center justify-center rounded-full hover:bg-[#0F204C]'
          onClick={(e) => onDelete(e)}
          onMouseEnter={() => setDeleteImage('/assets/delete-active.svg')}
          onMouseLeave={() => setDeleteImage('/assets/delete-default.svg')}
        >
          <img src={deleteImage} className='w-6 h-6 cursor-pointer' alt='delete button icon' />
        </button>
      </div>
    </div>
  )
}
