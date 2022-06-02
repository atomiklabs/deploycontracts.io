import Image from 'next/image'
import hourglass from '../public/assets/hourglass.svg'

export default function ComingSoon() {
  return (
    <div className='flex flex-row items-center gap-x-4 text-sm text-[#FDBA0F] font-space-grotesk font-medium uppercase tracking-[0.4rem] whitespace-nowrap'>
      <Image src={hourglass} alt='hourglass icon' height={24} width={24} layout='fixed' />
      Coming Soon
    </div>
  )
}
