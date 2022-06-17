import GridContainer from '@/components/GridContainer'
import GithubLink from '@/components/buttons/GithubLink'
import H2 from '@/components/headings/H2'
import { landingPageUrl } from 'consts'

export default function OpenSource() {
  return (
    <section className='mt-20 lg:mt-60'>
      <GridContainer className='relative z-0'>
        <div className='absolute hidden md:inline-block -z-10 md:top-[-5%] lg:top-[-20%] col-span-full'>
          <div id='open-source' className='absolute -top-24' />

          <div className='h-full w-full'>
            <img src='/assets/open-source-title.svg' alt='open source title image' />
          </div>
        </div>

        <div className='col-span-full lg:col-start-7 lg:col-span-6 flex justify-center lg:order-2'>
          <div className='h-full w-[270px] md:w-[410px] lg:w-[487px] flex shrink-0'>
            <img src='/assets/open-source.png' alt='open-source image' />
          </div>
        </div>

        <div className='col-span-full lg:col-start-1 lg:col-span-6 flex flex-col gap-y-6 md:items-center lg:items-start lg:order-1'>
          <H2>
            <span className='text-center'>Open source</span>
          </H2>

          <div className='text-gray-100 tracking-[-0.002rem]'>
            All code related to this project is open source. Check out our smart contracts and web integration guides
          </div>

          <GithubLink className='py-4 px-8' />
        </div>
      </GridContainer>
    </section>
  )
}
