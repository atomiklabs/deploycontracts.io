import { allocationColors } from '@/utils/snip20Form'
import { defaultColors } from 'consts'
import TooltipText from '@/components/TooltipText'

export default function ProgressBar({
  allocations,
  hideAllocationInfo,
}: {
  allocations: { name: string; value: number }[]
  hideAllocationInfo?: boolean
}) {
  const totalAllocation = allocations.reduce((prev, acc) => prev + acc.value, 0)

  return (
    <section className='sm:mt-8 flex flex-col gap-y-1'>
      <div className='w-full bg-[#455378] rounded-full h-2 flex flex-row'>
        {allocations.map((x, i) => {
          const firstItem = i === 0
          const lastItem = i === allocations.length - 1

          return (
            <div key={i} className='relative' style={{ width: `${x.value}%` }}>
              <div
                className='h-full'
                style={{
                  backgroundColor: allocationColors[i],
                  borderTopLeftRadius: firstItem ? '4px' : '0',
                  borderBottomLeftRadius: firstItem ? '4px' : '0',
                  borderTopRightRadius: lastItem && totalAllocation >= 100 ? '4px' : '0',
                  borderBottomRightRadius: lastItem && totalAllocation >= 100 ? '4px' : '0',
                }}
              />

              <TooltipText className='hidden sm:block'>{x.name}</TooltipText>
            </div>
          )
        })}
      </div>

      {!hideAllocationInfo && (
        <div className='flex flex-col sm:flex-row justify-between text-gray-100 text-sm'>
          <div>You must use 100% allocation space</div>

          <div className='font-medium' style={{ color: totalAllocation !== 100 ? defaultColors.error : 'inherit' }}>
            Your allocation: {totalAllocation}%
          </div>
        </div>
      )}
    </section>
  )
}
