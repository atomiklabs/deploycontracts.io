import { ComponentProps } from 'react'

export default function LinkButton({
  className,
  children,
  ...props
}: { className?: string } & ComponentProps<'button'>) {
  return (
    <button
      className='link-button relative leading-6 font-space-grotesk bg-clip-text text-transparent bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)] hover:bg-[linear-gradient(98.98deg,#671BC9_-83.86%,#FD0F9E_85.88%)] active:bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)] tracking-widest'
      {...props}
    >
      {children}
    </button>
  )
}
