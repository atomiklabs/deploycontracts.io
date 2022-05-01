import dynamic from 'next/dynamic'
import { useState } from 'react'
import Container from '@/components/Container'
import AllocationCard from '@/components/AllocationCard'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import ProgressBar from '@/components/ProgressBar'
import PrimaryButton from '@/components/buttons/PrimaryButton'

const freeSpace = 100

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
})

export default function tokenAllocation() {
  const [allocations, setAllocations] = useState([0])
  const [counter, setCounter] = useState(0)
  const [disabledLink, setDisabledLink] = useState(false)
  console.log(disabledLink)

  function addAllocation() {
    setCounter((prev) => (prev === 14 ? 0 : prev + 1))
    let lastItem = allocations.slice(-1).toString()
    setAllocations([...allocations, parseInt(lastItem) + 1])
  }

  function deleteAllocation(index: number) {
    const newAllocations = allocations.filter((x) => x !== index || index === 0)
    setAllocations([...newAllocations])
  }

  function checkFreeSpace() {
    if (freeSpace > 100) {
      setDisabledLink(true)
    } else {
      setDisabledLink(false)
    }
    console.log('clicked')
  }

  return (
    <section className='mt-10 mb-20'>
      <Container>
        <div className='flex flex-col gap-y-[34px]'>
          <h1 className='font-space-grotesk font-bold text-xl text-white'>Token allocation</h1>
          <p className='text-gray-100'>
            Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
            convallis tortor.
          </p>
        </div>
        <div className='mt-[41px] flex flex-col gap-y-9'>
          {allocations.map((x, i) => (
            <AllocationCard key={i} myKey={x} counter={counter} deleteAllocation={deleteAllocation} />
          ))}
          <ProgressBar />
          <SecondaryButton onClick={() => addAllocation()}>
            <div className='px-12 py-4'>Add new</div>
          </SecondaryButton>
        </div>
        <div className='relative mt-32 flex flex-col gap-y-6'>
          <div className='relative z-20 py-4 px-6 text-base text-gray-100 flex flex-row gap-x-6 bg-[#341035] items-center justify-between rounded-3xl'>
            <img src='/assets/error.svg' alt='error icon' className='w-[24px] h-[24px]' />
            To go next step should use all off space.... Proin elementum nunc faucibus lacinia sollicitudin.
            <div className='absolute bottom-[-5px] -z-10 right-[calc(50%-100px)] w-10 h-10 bg-[#341035] rotate-45'></div>
          </div>
          <div className='flex flex-row justify-between gap-x-16 md:gap-x-[144px]'>
            <div></div>
            <div className='flex-1'>
              <PrimaryButton onClick={() => checkFreeSpace()}>
                <div className='px-12 py-4 inline-block w-full h-full'>Next</div>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
