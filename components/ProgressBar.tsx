import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

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
  const [freeSpace, setFreeSpace] = useState<number>(100)

  useEffect(() => {
    let usedSpace = data.reduce((prev, x) => prev + x.percentage, 0)
    setFreeSpace(freeSpace - usedSpace)
  }, [])

  return (
    <section className='mt-8 flex flex-col gap-y-1'>
      <div className='w-full bg-[#455378] rounded-full h-2.5 flex flex-row'>
        {data.map((x, i) => (
          <div
            key={x.id}
            className={`h-2.5 cursor-pointer ${
              i == 0 ? ' rounded-l-[4px]' : i === data.length - 1 ? 'rounded-r-[4px]' : 'rounded-none'
            }`}
            data-for='custom-class'
            data-tip={x.name}
            style={{
              backgroundColor: x.colour,
              width: `${x.percentage}%`,
            }}
          ></div>
        ))}
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
        <div className='font-medium'>Free: {freeSpace}%</div>
      </div>
    </section>
  )
}
