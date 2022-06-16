import { ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadedLogo from './UploadedLogo'

export default function UploadLogo({
  isUploading,
  imageCID,
  onDrop,
  onDelete,
}: {
  imageCID?: string
  onDrop: (files: File[]) => void
  onDelete: (e: any) => void
  isUploading: boolean
}) {
  const { getRootProps, getInputProps } = useDropzone({ accept: { 'image/*': [] }, onDrop, multiple: false })

  if (isUploading) {
    return <DropBox className='p-7'>Uploading to IPFS...</DropBox>
  }

  return (
    <>
      {imageCID ? (
        <UploadedLogo imageCID={imageCID} onDelete={onDelete} />
      ) : (
        <DropBox>
          <label
            {...getRootProps()}
            onClick={(e) => e.stopPropagation()}
            className='p-7 flex flex-col gap-y-2 items-center cursor-pointer'
          >
            <input {...getInputProps()} />

            <div className='bg-[rgba(96,117,170,0.2)] h-16 w-16 rounded-full flex items-center justify-center'>
              <img className='w-8 h-8' src='/assets/folder.svg' alt='folder logo' />
            </div>

            <div className='mt-6 font-medium text-base text-gray-100'>
              <span className='gradient-underline drag-drop-gradient relative bg-clip-text text-transparent bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)]'>
                Select logo
              </span>{' '}
              or drag and dorp here
            </div>

            <div className='text-xs text-gray-300'>jpg, gif, jpeg, png, pdf (max. 5 MB)</div>
          </label>
        </DropBox>
      )}
    </>
  )
}

function DropBox({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`${className} text-center text-white border-2 border-dashed border-[#455378] rounded-2xl bg-[#000B28]`}
    >
      {children}
    </div>
  )
}
