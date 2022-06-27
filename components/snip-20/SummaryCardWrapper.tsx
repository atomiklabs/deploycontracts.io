import GradientText from '@/components/buttons/GradientText'
import Link from 'next/link'

type Props = {
  children: any
  img: string
  title: string
  linkUrl: string
}

export default function SummaryCardWrapper({ children, img, title, linkUrl }: Props) {
  return (
    <div className='flex flex-col gap-y-6 bg-[#0F204D] p-8 rounded-3xl'>
      <div className='sm:flex items-center justify-between'>
        <div className='flex flex-row items-center gap-x-4'>
          <div className='shrink-0'>
            <img src={img} alt={title + ' icon'} />
          </div>
          <div className='text-lg text-white font-space-grotesk font-bold'>{title}</div>
        </div>

        <Link href={linkUrl}>
          <GradientText className='mt-5 sm:mt-0'>Edit</GradientText>
        </Link>
      </div>

      {children}
    </div>
  )
}
