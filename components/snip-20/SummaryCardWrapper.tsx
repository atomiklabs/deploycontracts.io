import LinkButton from '@/components/buttons/LinkButton'
import { useRouter } from 'next/router'

type Props = {
  children: any
  img: string
  title: string
  linkUrl: string
}

export default function SummaryCardWrapper({ children, img, title, linkUrl }: Props) {
  const router = useRouter()

  return (
    <div className='flex flex-col gap-y-6 bg-[#0F204D] p-8 rounded-3xl'>
      <div className='sm:flex items-center justify-between'>
        <div className='flex flex-row items-center gap-x-4'>
          <div>
            <img src={img} alt='step 1 icon' />
          </div>
          <div className='text-lg text-white font-space-grotesk font-bold'>{title}</div>
        </div>

        <LinkButton className='mt-5 sm:mt-0' onClick={() => router.push(linkUrl)}>
          Edit
        </LinkButton>
      </div>

      {children}
    </div>
  )
}
