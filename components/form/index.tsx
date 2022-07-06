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
      className={`inline-block w-full h-full px-6 py-2 cursor-pointer font-space-grotesk font-bold text-white tracking-widest rounded-2xl
      bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)] hover:bg-[linear-gradient(122.48deg,#671BC9_-52.99%,#FD0F9E_97.26%)] hover:shadow-[0px_2px_40px_rgba(253,15,158,0.7)] active:bg-[linear-gradient(122.48deg,#671BC9_-52.99%,#FD0F9E_97.26%)] transition-all duration-100 ease-out
      disabled:opacity-70 ${className}`}
      {...props}
    />
  )
}
