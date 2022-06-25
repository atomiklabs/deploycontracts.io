import ProgressBar from '@/components/ProgressBar'

import OutputDataRow from '@/components/snip-20/OutputDataRow'
import SummaryCardWrapper from '@/components/snip-20/SummaryCardWrapper'
import StepsNavigation from '@/components/snip-20/StepsNavigation'

import { TokenSummaryEntity } from '@/lib/snip20-token-creator/entity/token-summary'
import { TokenCreatorStep } from '@/pages/snip-20/[step]'
import { stepTitles } from './StepsBreadcrumb'

interface TokenSummaryProps {
  prevStepPath: string
  formData: TokenSummaryEntity
  stepPath: (step: TokenCreatorStep) => string
  onSubmit: (formData: TokenSummaryEntity) => void
}

export default function TokenSummary({ prevStepPath, formData, stepPath, onSubmit }: TokenSummaryProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(formData)
      }}
    >
      <div className='flex flex-col gap-y-8'>
        <h1 className='font-space-grotesk font-bold text-xl text-white'>Summary</h1>

        <p className='text-gray-100'>
          Final confirmation, please check all the details below. Once token contract is deployed this coudn't be
          changed.
        </p>

        <SummaryCardWrapper
          linkUrl={stepPath(TokenCreatorStep.BasicInfo)}
          img='/assets/step1-visited.svg'
          title={stepTitles[0]}
        >
          <OutputDataRow title='Minter address' data={formData.basicTokenInfo.minterAddress} />
          <OutputDataRow title='Token name' data={formData.basicTokenInfo.tokenSymbol} />
          <OutputDataRow title='Total supply' data={formData.basicTokenInfo.tokenTotalSupply} />
        </SummaryCardWrapper>

        <SummaryCardWrapper
          linkUrl={stepPath(TokenCreatorStep.AllocationInfo)}
          img='/assets/step2-visited.svg'
          title={stepTitles[1]}
        >
          {formData.allocationInfo.allocations.map((allocation, i) => (
            <div key={i} className='flex flex-col gap-y-6 pb-4 border-b border-[#31437B]'>
              <OutputDataRow index={i} title='Name' data={allocation.name} />
              <OutputDataRow title='Value' data={`${allocation.value} %`} />
              <OutputDataRow title='Address' data={allocation.address} />
            </div>
          ))}

          <ProgressBar allocations={formData.allocationInfo.allocations || []} hideAllocationInfo={true} />
        </SummaryCardWrapper>

        <SummaryCardWrapper
          linkUrl={stepPath(TokenCreatorStep.MarketingInfo)}
          img='/assets/step3-visited.svg'
          title={stepTitles[2]}
        >
          <OutputDataRow title='Project name' data={formData.marketingInfo.projectName} />
          <OutputDataRow title='Description' data={formData.marketingInfo.projectDescription} />
          <OutputDataRow title='Logo' projectLogoCID={formData.marketingInfo.projectLogoCID} />
        </SummaryCardWrapper>
      </div>

      <StepsNavigation className='mt-20' submitText='Create token' prevStepPath={prevStepPath} />
    </form>
  )
}
