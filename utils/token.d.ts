export interface IToken {
  allocations: number[]
  counter: number
  addAllocation: () => void
  deleteAllocation: (number) => void
}