export interface IToken {
  allocations: AllocationCard[]
  addAllocation: () => void
  deleteAllocation: (index: number) => void
}

export interface AllocationCard {
  name: string
  address: string
  percentageValue: number
}
