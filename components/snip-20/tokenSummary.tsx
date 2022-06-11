import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import StepsNavigation from './StepsNavigation'

export default function tokenSummary() {
  const { snip20FormData } = useSnip20Steps()
  console.log({ snip20FormData })

  return (
    <>
      <div className='flex flex-col gap-y-[34px]'>
        <h1 className='font-space-grotesk font-bold text-xl text-white'>Token summary</h1>
        <p className='text-gray-100'>
          Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
          convallis tortor.
        </p>

        <div className='text-white flex flex-col gap-y-5'>
          <div>
            <div>tokenName: {snip20FormData[0].tokenName}</div>
            <div>tokenTotalSupply: {snip20FormData[0].tokenTotalSupply}</div>
          </div>

          <div>
            <div>allocations</div>
            {snip20FormData[1].allocations?.map((allocation, i) => (
              <div key={i} className='border-2'>
                <div>name: {allocation.name}</div>
                <div>value: {allocation.value}</div>
                <div>address: {allocation.address}</div>
              </div>
            ))}
          </div>

          <div>
            <div>projectName: {snip20FormData[2].projectName}</div>
            <div>projectDescription: {snip20FormData[2].projectDescription}</div>
            <div>imageUrl: {snip20FormData[2].imageUrl}</div>
          </div>
        </div>
      </div>

      <StepsNavigation className='mt-20' />
    </>
  )
}
