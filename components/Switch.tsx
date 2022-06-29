import React from 'react'
import type { PropsWithChildren } from 'react'

interface SwitchProps<T> extends PropsWithChildren<unknown> {
  value: T
}

export default function Switch<T>({ children, value }: SwitchProps<T>) {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child
        }

        const variant = (child.props as CaseProps<T>).variant
        const variantNormalised = Array.isArray(variant) ? variant : [variant]

        return variantNormalised.includes(value) ? child : null
      })}
    </>
  )
}

interface CaseProps<T> extends PropsWithChildren<unknown> {
  variant: T | Array<T>
}

Switch.Case = function Case<T>({ children }: CaseProps<T>) {
  return <>{children}</>
}
