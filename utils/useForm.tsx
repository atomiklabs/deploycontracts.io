import { useState } from 'react'
import { useToken } from './token'

export default function useForm(initial: any = {}) {
  const [inputs, setInputs] = useState(initial)

  function handleChange(e: any) {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    console.log(inputs)
  }

  return { inputs, handleChange, handleSubmit }
}
