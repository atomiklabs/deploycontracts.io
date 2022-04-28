import Container from '@/components/Container'

export default function tokenAllocation() {
  return (
    <section>
      <Container>
        <div className='mt-10 col-span-full sm:col-start-3 sm:col-span-8 xl:col-start-5 xl:col-span-4'></div>
        <div className='mt-[38px] col-start-5 col-span-4 flex flex-col gap-y-[34px]'>
          <h1 className='font-space-grotesk font-bold text-xl text-white'>Token allocation</h1>
          <p className='text-gray-100'>
            Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
            convallis tortor.
          </p>
        </div>
      </Container>
    </section>
  )
}
