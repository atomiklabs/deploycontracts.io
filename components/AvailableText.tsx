export default function AvailableText() {
  return (
    <div className='flex flex-row items-center gap-x-4 text-sm text-[#0CE2AF] font-space-grotesk font-medium uppercase tracking-[0.4rem] whitespace-nowrap'>
      <div className='w-6 h-6'>
        <img src={'/assets/check.svg'} alt='check icon' />
      </div>
      Available
    </div>
  )
}
