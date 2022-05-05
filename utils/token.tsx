import { createContext, useContext, useState } from 'react'
import { IToken } from '@/utils/token.d'

const TokenContext = createContext({} as IToken)

const emptyAllocation = { percentageValue: 0, name: '', address: '' }

export function TokenProvider({ children }: any) {
  const [allocations, setAllocations] = useState([emptyAllocation])

  function addAllocation() {
    setAllocations([...allocations, emptyAllocation])
  }

  function deleteAllocation(index: number) {
    allocations.splice(index, 1)

    setAllocations([...allocations])
  }

  return (
    <TokenContext.Provider value={{ allocations, addAllocation, deleteAllocation }}>{children}</TokenContext.Provider>
  )
}

export function useToken() {
  return useContext(TokenContext)
}
