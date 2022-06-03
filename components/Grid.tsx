export default function Container({ children }: { children: any }) {
  return (
    <div className='max-w-[1200px] mx-auto grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-5 lg:gap-x-6 px-6'>
      {children}
    </div>
  )
}
