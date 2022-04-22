export default function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className='flex flex-col gap-y-2'>
      <label className='text-white font-medium'>{label}</label>
      <input
        className='py-4 px-5 bg-[#000B28] border-2 border-[#455378] outline-none focus:ring-0 rounded-2xl text-gray-100 placeholder:text-gray-300 input focus:input visited:border-[#6075AA]'
        type='text'
        placeholder={placeholder}
      />
    </div>
  )
}
