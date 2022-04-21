const primaryGradient = 'linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)'
const secondaryGradient = 'linear-gradient(122.48deg,#671BC9_-52.99%,#FD0F9E_97.26%)'
export default function PrimaryButton({ title }: { title: string }) {
  return (
    <button
      className={`py-4 px-12 font-space-grotesk font-bold text-white rounded-2xl bg-[${primaryGradient}] hover:bg-[${secondaryGradient}] hover:shadow-[0px_2px_40px_rgba(253,15,158,0.7)] focus:bg-[${secondaryGradient}] transition-all duration-100 ease-out`}
    >
      {title}
    </button>
  )
}
