import { ComponentProps } from 'react'
import { useField } from 'formik'
import { defaultColors } from '../consts'

interface InputProps extends ComponentProps<'input'> {
  name: string
  label: string
}

export default function Input({ label, className, ...props }: { label: string; className?: string } & InputProps) {
  const [field, meta] = useField(props)
  const hasError = meta.touched && !!meta.error

  return (
    <div className={`${className} flex flex-col gap-y-2`}>
      <label htmlFor={props.name} className='text-white font-medium'>
        {label}
      </label>

      <input
        className='input py-4 px-5 bg-[#000B28] text-base border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
        style={{ borderColor: hasError ? `${defaultColors.error}` : '' }}
        id={props.name}
        {...field}
        {...props}
        // @ts-ignore
        onClick={(e) => e.target.select()}
      />

      {hasError && (
        <div className='flex flex-row gap-x-2 items-center'>
          <img src='/assets/error.svg' width={14} height={16} />
          <span className='text-xs font-medium text-[#FC0E47]'>{meta.error}</span>
        </div>
      )}
    </div>
  )
}
