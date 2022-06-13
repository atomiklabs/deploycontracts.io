import LinkButton from '@/components/buttons/LinkButton'

type Props = {
  children: any
  img: string
  title: string
}

export default function SummaryCardWrapper({ children, img, title }: Props) {
  return (
    <div className='flex flex-col gap-y-6 bg-[#0F204D] p-8 rounded-3xl'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-x-4'>
          <div>
            <img src={img} alt='step 1 icon' />
          </div>
          <div className='text-lg text-white font-space-grotesk font-bold'>{title}</div>
        </div>
        <LinkButton>Edit</LinkButton>
      </div>
      {children}
    </div>
  )
}
