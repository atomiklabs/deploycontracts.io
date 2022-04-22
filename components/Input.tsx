export default function Input() {
  return (
    <div className='flex flex-col gap-y-2'>
      <label className='text-white'>Label</label>
      <input
        className='py-4 px-5 bg-[#000B28] border-2 border-[#455378] outline-none focus:ring-0 rounded-2xl text-gray-100 placeholder:text-gray-300 focus:input-gradient '
        type='text'
        placeholder='test'
      />
    </div>
  )
}
