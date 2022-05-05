import Container from '@/components/Container'
import AllocationCard from '@/components/AllocationCard'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import { useToken } from '@/utils/token'

export default function tokenAllocation() {
  const { allocations, addAllocation } = useToken()

  return (
    <section className='my-10'>
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
            <AllocationCard key={i} index={i} allocation={x} colour={colourPallete[i]} />
          ))}

          <SecondaryButton onClick={() => addAllocation()}>
            <div className='px-12 py-4'>Add new</div>
          </SecondaryButton>
        </div>
      </Container>
    </section>
  )
}

const colourPallete = [
  '#FD0F9E',
  '#671BC9',
  '#FD810F',
  '#00D0FE',
  '#FD3A0F',
  '#BCFE00',
  '#FDBA0F',
  '#0CE2AF',
  '#FE6B00',
  '#BD01DC',
  '#0084FE',
  '#7EE42D',
  '#4F14F9',
  '#0DB427',
  '#0EADAD',
]
