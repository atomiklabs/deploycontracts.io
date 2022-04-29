import { createContext, useContext, useState } from 'react'
import { IToken } from '@/utils/token.d'

const TokenContext = createContext({} as IToken)

export function TokenProvider({ children }: any) {
  const [allocations, setAllocations] = useState([20])
  const [counter, setCounter] = useState(0)

  function addAllocation() {
    setCounter((prev) => (prev === 14 ? 0 : prev + 1))
    let lastItem = allocations.slice(-1).toString()
    setAllocations([...allocations, parseInt(lastItem) + 1])
  }

  function deleteAllocation(index: number) {
    const newAllocations = allocations.filter((x) => x !== index || index === 0)
    setAllocations([...newAllocations])
  }

  return (
    <TokenContext.Provider value={{ allocations, counter, addAllocation, deleteAllocation }}>
      {children}
    </TokenContext.Provider>
  )
}

export function useToken() {
  return useContext(TokenContext)
}
