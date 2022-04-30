export interface IToken {
  allocations: AllocationCard[]
  counter: number
  addAllocation: () => void
  deleteAllocation: (number) => void
  setAllocationColour: () => void
}

export interface AllocationCard {  
    id: number,
    colour: string,
    percentageValue: number
  }[]