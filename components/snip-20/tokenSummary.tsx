import { useSnip20Steps } from '@/utils/snip20StepsProvider'
import StepsNavigation from '@/components/snip-20/StepsNavigation'
import SummaryCardWrapper from '@/components/snip-20/SummaryCardWrapper'
import OutputDataRow from '@/components/snip-20/OutputDataRow'
import { allocationColors } from '@/utils/snip20Form'
import ProgressBar from '../ProgressBar'

export default function tokenSummary() {
  const { snip20FormData } = useSnip20Steps()

  return (
    <>
      <div className='flex flex-col gap-y-8'>
        <h1 className='font-space-grotesk font-bold text-xl text-white'>Summary</h1>
        <p className='text-gray-100'>
          Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
          convallis tortor.
        </p>

        <SummaryCardWrapper linkUrl='step-1' img='/assets/step1-visited.svg' title='Token details'>
          <OutputDataRow title='Minter address' data='fq412t41g41b2b34n4mn24n323' />
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
          <OutputDataRow title='Logo' imageUrl='/assets/github.svg' />
        </SummaryCardWrapper>
      </div>

      <StepsNavigation className='mt-20' />
    </>
  )
}
