import Image from 'next/image'
import check from '../public/assets/check.svg'

export default function Available() {
  return (
    <div className='flex flex-row items-center gap-x-4 text-sm leading-[20.42px] text-[#0CE2AF] font-space-grotesk font-medium uppercase tracking-[0.4rem] whitespace-nowrap'>
      <Image src={check} alt='check icon' height={24} width={24} layout='fixed' />
      Available
    </div>
  )
}
