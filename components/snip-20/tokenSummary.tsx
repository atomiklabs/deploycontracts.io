import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import StepsNavigation from '@/components/snip-20/StepsNavigation'
import SummaryCardWrapper from '@/components/snip-20/SummaryCardWrapper'
import OutputDataRow from '@/components/snip-20/OutputDataRow'
import { allocationColors } from '@/utils/snip20Form'
import ProgressBar from '../ProgressBar'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

export default function tokenSummary() {
  const router = useRouter()
  const { snip20FormData, instantiateSnip20Contract } = useSnip20Steps()
  const onCreateToken = useCallback(
    () =>
      instantiateSnip20Contract(snip20FormData)
        .then((contractAddress) => {
          console.log('Congrats, token created!', contractAddress)
          router.replace('/')
        })
        .catch((error) => {
          console.error('something went wrong, try again')
          console.error(error)
        }),
    [snip20FormData],
  )

  return (
    <>
      <div className='flex flex-col gap-y-8'>
        <h1 className='font-space-grotesk font-bold text-xl text-white'>Summary</h1>

        <p className='text-gray-100'>
          Final confirmation, please check all the details below. Once token contract is deployed this coudn't be
          changed.
        </p>

        <SummaryCardWrapper linkUrl='step-1' img='/assets/step1-visited.svg' title='Token details'>
          <OutputDataRow title='Minter address' data={snip20FormData[0].minterAddress} />
          <OutputDataRow title='Token name' data={snip20FormData[0].tokenName} />
          <OutputDataRow title='Total supply' data={snip20FormData[0].tokenTotalSupply} />
        </SummaryCardWrapper>

        <SummaryCardWrapper linkUrl='step-2' img='/assets/step2-visited.svg' title='Token allocation'>
          {snip20FormData[1].allocations?.map((allocation, i) => (
            <div key={i} className='flex flex-col gap-y-6 pb-4 border-b border-[#31437B]'>
              <OutputDataRow colour={allocationColors[i]} title='Name' data={allocation.name} />
              <OutputDataRow title='Value' data={`${allocation.value} %`} />
              <OutputDataRow title='Address' data={allocation.address} />
            </div>
          ))}

          <ProgressBar allocations={snip20FormData[1].allocations || []} hideAllocationInfo={true} />
        </SummaryCardWrapper>

        <SummaryCardWrapper linkUrl='step-3' img='/assets/step3-visited.svg' title='Marketing details'>
          <OutputDataRow title='Project name' data={snip20FormData[2].projectName} />
          <OutputDataRow title='Description' data={snip20FormData[2].projectDescription} />
          <OutputDataRow title='Logo' projectLogoCID={snip20FormData[2].projectLogoCID} />
        </SummaryCardWrapper>
      </div>

      <StepsNavigation className='mt-20' submitText='Create token' onClick={onCreateToken} />
    </>
  )
}
