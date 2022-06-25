import { object } from "yup";
import * as basicTokenInfo from './basic-token-info'
import type { BasicTokenInfoEntity } from './basic-token-info'
import * as allocationInfo from './allocation-info'
import type { AllocationInfoEntity } from './allocation-info'
import * as marketingInfo from './marketing-info'
import type { MarketingInfoEntity } from './marketing-info'

export interface TokenSummaryEntity {
  basicTokenInfo: BasicTokenInfoEntity
  allocationInfo: AllocationInfoEntity
  marketingInfo: MarketingInfoEntity
}

export const schema = object({
  basicTokenInfo: basicTokenInfo.schema.required(),
  allocationInfo: allocationInfo.schema.required(),
  marketingInfo: marketingInfo.schema.required(),
})

export function createDefault(): TokenSummaryEntity {
  return {
    basicTokenInfo: basicTokenInfo.createDefault(),
    allocationInfo: allocationInfo.createDefault(),
    marketingInfo: marketingInfo.createDefault(),
  }
}

export function create({ basicTokenInfo, allocationInfo, marketingInfo }: TokenSummaryEntity): TokenSummaryEntity {
  return schema.validateSync({
    basicTokenInfo,
    allocationInfo,
    marketingInfo,
  })
}

interface TokenBalance {
  address: string
  amount: string
}

interface CalculateInitialBalancesProps {
  allocations: AllocationInfoEntity['allocations']
  tokenDecimals: number
  totalTokenSupply: number
}

export function calculateInitialBalances({
  allocations,
  tokenDecimals,
  totalTokenSupply,
}: CalculateInitialBalancesProps): Array<TokenBalance> {
  return allocations.map(({ address, value }) => {
    const balanceCoeficient = BigInt(10 ** tokenDecimals)
    const totalTokenSupplyAdjusted = BigInt(totalTokenSupply) * balanceCoeficient
    const allocationAmountAdjusted = BigInt(value)
      * totalTokenSupplyAdjusted
      / BigInt(100) // offset `value` being a percentage value

    return {
      amount: allocationAmountAdjusted.toString(),
      address,
    }
  })
}