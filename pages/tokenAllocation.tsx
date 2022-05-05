import Container from '@/components/Container'
import AllocationCard from '@/components/AllocationCard'
import SecondaryButton from '@/components/buttons/SecondaryButton'
import { useToken } from '@/utils/token'

export default function tokenAllocation() {
  const { allocations, addAllocation, colourPallete, isAllocationMaxItems } = useToken()

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

          {!isAllocationMaxItems && (
            <SecondaryButton onClick={() => addAllocation()}>
              <div className='px-12 py-4'>Add new</div>
            </SecondaryButton>
          )}
        </div>
      </Container>
    </section>
  )
}
