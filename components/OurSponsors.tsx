import GridContainer from '@/components/GridContainer'
import LinkButton from '@/components/buttons/LinkButton'
import H2 from '@/components/headings/H2'

export default function OurSponsors() {
  return (
    <section className=' mt-20'>
      <GridContainer>
        <div className='col-span-full lg:col-span-6 flex flex-col gap-y-4 items-center lg:items-start lg:justify-center'>
          <H2>
            <h2 className='text-center'>Our sponsors</h2>
          </H2>
          <div className='text-gray-100 tracking-[-0.002rem]'>This project is founded by multiple grant programs.</div>
        </div>
        <div className='col-span-full lg:col-span-6 lg:col-start-7 flex flex-col gap-y-6 md:flex-row lg:flex-col md:mt-9 lg:pl-14 lg:py-6 lg:mt-0 lg:border-l-[1px] lg:border-[#455378]'>
          <div className='flex mt-11 md:mt-0 md:items-center justify-center lg:justify-start order-1 md:w-[40%] lg:w-full'>
            <div>
              <img src='/assets/secret-network.svg' alt='secret network logo' />
            </div>
          </div>
          <div className='flex flex-col gap-y-5 items-start order-2 md:w-[60%] lg:w-full md:pl-14 md:py-6 lg:p-0 md:border-0 md:border-l-[1px] md:border-[#455378] lg:border-0'>
            <div className='text-lg text-white font-space-grotesk font-bold'>Secret Network Grant Program</div>
            <div className='text-gray-100 tracking-[-0.002rem]'>
              Founding for Applications, Ecosystem, Tooling and Network Imorovements.
            </div>
            <LinkButton href='#'>Visit webpage</LinkButton>
          </div>
        </div>
      </GridContainer>
    </section>
  )
}
