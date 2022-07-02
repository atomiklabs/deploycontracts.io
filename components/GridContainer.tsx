export default function Container({ children, className }: { children: any; className?: string }) {
  return (
    <div
      className={`max-w-[1200px] mx-auto grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-5 lg:gap-x-6 ${className}`}
    >
      {children}
    </div>
  )
}
