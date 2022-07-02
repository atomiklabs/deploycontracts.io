import type { ButtonHTMLAttributes, FormHTMLAttributes, PropsWithChildren } from 'react'

interface FormWithSingerProps extends FormHTMLAttributes<HTMLFormElement> {
  disabled?: boolean
}

export function FormWithSinger({ children, className, disabled, ...props }: FormWithSingerProps) {
  return (
    <form className={`my-4 flex flex-col sm:flex-row gap-4 sm:items-center ${className}`} {...props}>
      <fieldset disabled={disabled} title={disabled ? 'Connect your wallet to activate button' : ''}>
        {children}
      </fieldset>
    </form>
  )
}

interface FormButtonProps extends PropsWithChildren<unknown>, ButtonHTMLAttributes<HTMLButtonElement> {}

export function FormButton({ className, ...props }: FormButtonProps) {
  return (
    <button
      className={`block px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 ${className}`}
      {...props}
    />
  )
}
