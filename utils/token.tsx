import { createContext, useContext, useState } from 'react'
import { IToken } from '@/utils/token.d'

const TokenContext = createContext({} as IToken)

const emptyAllocation = { percentageValue: 0, name: '', address: '' }

export function TokenProvider({ children }: any) {
  const [allocations, setAllocations] = useState([emptyAllocation])
  const [freeAllocationValue, setFreeAllocationValue] = useState(0)

  const isAllocationMaxItems = allocations.length >= colourPallete.length

  function addAllocation() {
    if (isAllocationMaxItems) {
      return
    }

    setAllocations([...allocations, emptyAllocation])
  }

  function deleteAllocation(index: number) {
    allocations.splice(index, 1)

    setAllocations([...allocations])
  }

  return (
    <TokenContext.Provider
      value={{ allocations, freeAllocationValue, addAllocation, deleteAllocation, colourPallete, isAllocationMaxItems }}
    >
      {children}
    </TokenContext.Provider>
  )
}

export function useToken() {
  return useContext(TokenContext)
}

const colourPallete = [
  '#FD0F9E',
  '#671BC9',
  '#FD810F',
  '#00D0FE',
  '#FD3A0F',
  '#BCFE00',
  '#FDBA0F',
  '#0CE2AF',
  '#FE6B00',
  '#BD01DC',
  '#0084FE',
  '#7EE42D',
  '#4F14F9',
  '#0DB427',
  '#0EADAD',
]
