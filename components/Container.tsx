export default function Container({ children }: { children: any }) {
  return <div className='grid grid-cols-4 gap-x-6 sm:grid-cols-12 sm:gap-x-8 px-6'>{children}</div>
}
