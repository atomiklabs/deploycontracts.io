import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { AllocationCard, IToken } from '@/utils/token.d'
import { colourPallete } from '@/utils/colourPallete'

const TokenContext = createContext({} as IToken)

export function TokenProvider({ children }: any) {
  const [colour, setColour] = useState(colourPallete[0])
  const [counter, setCounter] = useState(1)
  const [allocations, setAllocations] = useState([
    {
      id: 0,
      colour: colourPallete[0],
      percentageValue: 0,
    },
  ])

  function setAllocationColour() {
    setColour(colourPallete.slice(counter, counter + 1).toString())
  }

  function addAllocation() {
    setCounter((prev) => (prev === colourPallete.length - 1 ? 0 : prev + 1))

    let newId = parseInt(
      allocations
        .slice(-1)
        .map((x) => x.id + 1)
        .toString(),
    )

    setAllocations([
      ...allocations,
      {
        id: newId,
        colour: colour,
        percentageValue: 0,
      },
    ])
  }

  function deleteAllocation(index: number) {
    const newAllocations = allocations.filter((x) => x.id !== index || index === 0)
    setAllocations([...newAllocations])
  }

  return (
    <TokenContext.Provider value={{ allocations, counter, addAllocation, setAllocationColour, deleteAllocation }}>
      {children}
    </TokenContext.Provider>
  )
}

export function useToken() {
  return useContext(TokenContext)
}
