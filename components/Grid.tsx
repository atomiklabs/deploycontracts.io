export default function Container({ children }: { children: any }) {
  return (
    <div className='max-w-[1200px] mx-auto grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 gap-x-6 md:gap-x-8 px-6 md:px-0'>
      {children}
    </div>
  )
}
