import { useState } from 'react'
import Container from '@/components/Container'
import AllocationCard from '@/components/AllocationCard'
import SecondaryButton from '@/components/buttons/SecondaryButton'

export default function tokenAllocation() {
  const [allocations, setAllocations] = useState([0])
  const [counter, setCounter] = useState(0)

  function addAllocation() {
    setCounter((prev) => (prev === 14 ? 0 : prev + 1))
    let lastItem = allocations.slice(-1).toString()
    setAllocations([...allocations, parseInt(lastItem) + 1])
  }

  function deleteAllocation(index: number) {
    const newAllocations = allocations.filter((x) => x !== index || index === 0)
    setAllocations([...newAllocations])
  }

  return (
    <section className='py-20'>
      <Container>
        <div className='mt-[38px]flex flex-col gap-y-[34px]'>
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
          <SecondaryButton onClick={() => addAllocation()}>
            <div className='px-12 py-4'>Add new</div>
          </SecondaryButton>
        </div>
      </Container>
    </section>
  )
}
