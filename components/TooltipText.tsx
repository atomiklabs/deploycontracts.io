import { ReactNode } from 'react'

export default function TooltipText({ children }: { children: ReactNode }) {
  return (
    <span
      className='
        inline-block absolute -top-10 left-[50%] translate-x-[-50%] px-3
        text-sm text-[#DCE2F2] bg-[#0F204C] rounded-lg
        after:absolute after:left-[50%] after:translate-x-[-50%] after:-bottom-0 after:translate-y-[50%] after:rotate-45 after:w-2 after:h-2 after:bg-[#0F204C]'
    >
      <span className='relative z-10'>{children}</span>
    </span>
  )
}
