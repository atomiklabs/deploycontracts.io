export interface IToken {
  allocations: AllocationCard[]
  freeAllocationValue: number
  colourPallete: string[]
  isAllocationMaxItems: boolean
  addAllocation: () => void
  deleteAllocation: (index: number) => void
}

export interface AllocationCard {
  name: string
  address: string
  percentageValue: number
}
