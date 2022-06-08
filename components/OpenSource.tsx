import GridContainer from '@/components/GridContainer'
import GithubButton from '@/components/buttons/GithubButton'
import H2 from '@/components/headings/H2'

export default function OpenSource() {
  return (
    <section className='mt-20 lg:mt-60'>
      <GridContainer className='relative z-0'>
        <div className='absolute hidden md:inline-block -z-10 md:top-[-5%] lg:top-[-20%] col-span-full'>
          <div className='h-full w-full'>
            <img src='/assets/open-source-title.svg' alt='open source title image' />
          </div>
        </div>
        <div className='col-span-full lg:col-start-7 lg:col-span-6 flex justify-center lg:order-2'>
          <div className='h-full w-[270px] md:w-[410px] lg:w-[487px] flex shrink-0'>
            <img src='/assets/open-source.svg' alt='open-source image' />
          </div>
        </div>
        <div className='col-span-full lg:col-start-1 lg:col-span-6 flex flex-col gap-y-6 md:items-center lg:items-start lg:order-1'>
          <H2>
            <h2 className='text-center'>Open source</h2>
          </H2>
          <div className='text-gray-100 tracking-[-0.002rem]'>
            All code at deploycontract.io is open source. mattis ligula aliquet et. Morbi non porta lorem, aliquam
            suscipit leo. Maecenas blandit non sem vel blandit.
          </div>
          <GithubButton className='py-4 px-8' />
        </div>
      </GridContainer>
    </section>
  )
}
