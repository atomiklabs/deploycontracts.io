type Props = {
  children: any
  onClick?: () => void
}

export default function PrimaryButton({ children, ...props }: Props) {
  return (
    <button
      className={
        'font-space-grotesk font-bold text-white rounded-2xl bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)] hover:bg-[linear-gradient(122.48deg,#671BC9_-52.99%,#FD0F9E_97.26%)] hover:shadow-[0px_2px_40px_rgba(253,15,158,0.7)] active:bg-[linear-gradient(122.48deg,#671BC9_-52.99%,#FD0F9E_97.26%)] transition-all duration-100 ease-out tracking-widest w-full'
      }
      {...props}
    >
      {children}
    </button>
  )
}
