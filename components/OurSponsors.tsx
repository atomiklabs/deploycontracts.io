import GridContainer from '@/components/GridContainer'
import LinkButton from './buttons/LinkButton'
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
        <div className='col-span-full flex flex-col gap-y-6 mt-11 items-start'>
          <div>
            <img src='/assets/secret-network.svg' alt='secret network logo' />
          </div>
          <div className='text-lg text-white font-space-grotesk font-bold'>Secret Network Grant Program</div>
          <div className='text-gray-100 tracking-[-0.002rem]'>
            Founding for Applications, Ecosystem, Tooling and Network Imorovements.
          </div>
          <LinkButton href='#'>Visit webpage</LinkButton>
        </div>
      </GridContainer>
    </section>
  )
}
