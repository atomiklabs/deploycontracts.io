import { createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'
import * as Yup from 'yup'

const LocalContext = createContext({} as TSnip20Provider)

interface TSnip20Provider {
  step1: { tokenName: string; tokenTotalSupply: number }
  step1ValidationSchema: typeof step1ValidationSchema
  onNextStep: (data: {}) => void
}

const step1ValidationSchema = Yup.object().shape({
  tokenName: Yup.string().email().required(),
  tokenTotalSupply: Yup.number().min(1).required(),
})

export function Snip20Provider({ children }: any) {
  const [step1, setStep1] = useLocalStorage<TSnip20Provider['step1']>(`snip20-step1`, {
    tokenName: '',
    tokenTotalSupply: 1_000_000,
  })

  function onNextStep(data: {}) {
    console.log('--- onNextStep: ', data)
  }

  return <LocalContext.Provider value={{ step1, step1ValidationSchema, onNextStep }}>{children}</LocalContext.Provider>
}

export function useSnip20() {
  return useContext(LocalContext)
}
