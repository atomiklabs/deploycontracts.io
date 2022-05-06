import { useState } from 'react'
import { defaultColors } from '../consts'

export default function Input({
  label,
  placeholder,
  textarea,
}: {
  label: string
  placeholder: string
  textarea?: boolean
}) {
  const [error, setError] = useState(false)
  return (
    <div className='flex flex-col gap-y-2'>
      <label className='text-white font-medium'>{label}</label>
      {textarea ? (
        <textarea
          className='input min-h-[140px] resize-none py-4 px-5 bg-[#000B28] border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
          style={{ borderColor: error ? `${defaultColors.error}` : 'none' }}
          placeholder={placeholder}
          required
        ></textarea>
      ) : (
        <input
          className='input py-4 px-5 bg-[#000B28] border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
          style={{ borderColor: error ? `${defaultColors.error}` : 'none' }}
          type='text'
          placeholder={placeholder}
          required
        />
      )}
      {error && (
        <div className='flex flex-row gap-x-2 items-center'>
          <img src='/assets/error.svg' width={14} height={16} />
          <span className='text-xs font-medium text-[#FC0E47]'>Error</span>
        </div>
      )}
    </div>
  )
}
