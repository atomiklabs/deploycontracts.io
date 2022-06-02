import hourglass from '../public/assets/hourglass.svg'
import { NonOptimizedImage } from './NonOptimizedImage'

export default function ComingSoon() {
  return (
    <div className='flex flex-row items-center gap-x-4 text-sm text-[#FDBA0F] font-space-grotesk font-medium uppercase tracking-[0.4rem] whitespace-nowrap'>
      <NonOptimizedImage src={hourglass} alt='hourglass icon' height={24} width={24} layout='fixed' />
      Coming Soon
    </div>
  )
}
