import GridContainer from '@/components/GridContainer'
import H2 from './headings/H2'

export default function OurSponsors() {
  return (
    <section className=' mt-20'>
      <GridContainer>
        <div className='col-span-full flex flex-col gap-y-4'>
          <H2>
            <h2 className='text-center'>Our sponsors</h2>
          </H2>
          <div className='text-gray-100 tracking-[-0.002rem]'>This project is founded by multiple grant programs.</div>
        </div>
      </GridContainer>
    </section>
  )
}
