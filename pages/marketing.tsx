import Container from '@/components/Container'

export default function marketing() {
  return (
    <section className='mt-20'>
      <Container>
        <div className='flex flex-col gap-y-[34px]'>
          <h1 className='font-space-grotesk font-bold text-xl text-white'>Marketing details</h1>
          <p className='text-gray-100'>
            Token generations is.... consectetur adipiscing elit. Etiam pulvinar leo vitae massa congue euismod eget
            convallis tortor.
          </p>
        </div>
      </Container>
    </section>
  )
}
