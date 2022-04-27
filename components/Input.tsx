import Image from 'next/image'
import { useState } from 'react'

export default function Input({ label, placeholder }: { label: string; placeholder: string }) {
  const [error, setError] = useState(false)
  return (
    <div className='flex flex-col gap-y-2'>
      <label className='text-white font-medium'>{label}</label>
      <input
        className='py-4 px-5 bg-[#000B28] border-2 border-[#455378] outline-none focus:ring-0 rounded-2xl text-gray-100 placeholder:text-gray-300 input focus:input visited:border-[#6075AA]'
        style={{ borderColor: error ? '#FC0E47' : '' }}
        type='text'
        placeholder={placeholder}
      />
      {error && (
        <div className='flex flex-row gap-x-2 items-center'>
          <Image src='/assets/error.svg' width={14} height={16} />
          <span className='text-xs font-medium text-[#FC0E47]'>Error</span>
        </div>
      )}
    </div>
  )
}
