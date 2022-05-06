import dynamic from 'next/dynamic'
import { useToken } from '@/utils/token'

const data = [
  { id: 0, name: 'Marketing1', colour: '#FD0F9E', percentage: 20 },
  { id: 1, name: 'Marketing2', colour: '#671BC9', percentage: 60 },
  { id: 2, name: 'Marketing3', colour: '#FD810F', percentage: 10 },
  { id: 3, name: 'Marketing4', colour: '#00D0FE', percentage: 10 },
]

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
})

export default function ProgressBar() {
  const { freeAllocationValue } = useToken()

  return (
    <section className='mt-8 flex flex-col gap-y-1'>
      <div className='w-full bg-[#455378] rounded-full h-2 flex flex-row overflow-hidden'>
        {data.map((x, i) => {
          const firstItem = i === 0
          const lastItem = i === data.length - 1
          const allocationValue = x.percentage >= 100 ? 100 : x.percentage
          return (
            <div
              key={x.id}
              className='h-2 cursor-pointer'
              data-for='custom-class'
              data-tip={x.name}
              style={{
                backgroundColor: x.colour,
                width: `${allocationValue}%`,
                borderTopLeftRadius: firstItem ? '4px' : '0',
                borderBottomLeftRadius: firstItem ? '4px' : '0',
                borderTopRightRadius: lastItem ? '4px' : '0',
                borderBottomRightRadius: lastItem ? '4px' : '0',
              }}
            ></div>
          )
        })}
        <ReactTooltip
          id='custom-class'
          className='custom-tooltip'
          textColor='#DCE2F2'
          backgroundColor='#0F204C'
          place='top'
          type='dark'
          effect='solid'
        />
      </div>
      <div className='flex flex-row justify-between text-gray-100 text-sm'>
        <div>You should use all space</div>
        <div className='font-medium'>Free: {freeAllocationValue}%</div>
      </div>
    </section>
  )
}
