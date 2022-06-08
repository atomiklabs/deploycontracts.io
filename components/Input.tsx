import { Field } from 'formik'
import { defaultColors } from '../consts'

interface Props {
  name: string
  type: string
  label: string
  className?: string
  placeholder?: string
  error?: string | false
  touched?: boolean
  step?: number
}

export default function Input({ name, type, label, placeholder, step, className, error, touched }: Props) {
  return (
    <div className={`${className} flex flex-col gap-y-2`}>
      <label htmlFor={name} className='text-white font-medium'>
        {label}
      </label>

      <Field
        className='input py-4 px-5 bg-[#000B28] border-2 border-[#455378] rounded-2xl text-gray-100 placeholder:text-gray-300 visited:border-[#6075AA]'
        style={{ borderColor: error ? `${defaultColors.error}` : '' }}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        step={step}
      />

      {touched && error && (
        <div className='flex flex-row gap-x-2 items-center'>
          <img src='/assets/error.svg' width={14} height={16} />
          <span className='text-xs font-medium text-[#FC0E47]'>{error}</span>
        </div>
      )}
    </div>
  )
}
