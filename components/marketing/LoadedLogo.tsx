type Props = {
  files: object[]
  deleteLogo: () => void
}

export default function LoadedLogo({ files, deleteLogo }: Props) {
  return (
    <>
      {files.map((file: any, idx) => {
        return (
          <div key={idx} className='px-6 py-9 flex flex-row justify-between items-center bg-[#0F204D] rounded-2xl'>
            <div className='flex flex-row items-center gap-x-5 font-normal'>
              <img
                src={file.preview}
                alt='icon'
                className=' w-14 h-14'
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
              />
              <div className='text-base text-gray-100 leading-5'>{file.name}</div>
            </div>
            <img
              src='/assets/delete-default.svg'
              alt='delete icon'
              className=' w-[22px] h-full cursor-pointer'
              onClick={() => deleteLogo()}
            />
          </div>
        )
      })}
    </>
  )
}
