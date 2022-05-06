import { InputHTMLAttributes } from 'react'
type Props = {
  getRootProps: () => void
  getInputProps: () => React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}
export default function UploadLogo({ getRootProps, getInputProps }: Props) {
  return (
    <label
      {...getRootProps()}
      onClick={(e) => e.stopPropagation()}
      className='cursor-pointer flex flex-col gap-y-2 items-center p-7 border-2 border-dashed border-[#455378] rounded-2xl bg-[#000B28]'
    >
      <input {...getInputProps()} />
      <div className='bg-[rgba(96,117,170,0.2)] h-16 w-16 rounded-full flex items-center justify-center'>
        <img className='w-8 h-8' src='/assets/folder.svg' alt='folder logo' />
      </div>
      <div className='mt-6 font-medium text-base text-gray-100'>
        <span className='drag-drop-gradient relative bg-clip-text text-transparent bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)]'>
          Select logo
        </span>{' '}
        or drag and dorp here
      </div>
      <div className='text-xs text-gray-300'>jpg, gif, jpeg, png, pdf (max. 5 MB)</div>
    </label>
  )
}
