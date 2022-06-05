import GridContainer from '@/components/GridContainer'
import H2 from '@/components/headings/H2'
import SecondaryButton from '@/components/buttons/SecondaryButton'

export default function OpenSource() {
  return (
    <section className=' mt-20'>
      <GridContainer>
        <div className='col-span-full flex justify-center'>
          <div className='h-full w-[270px] md:w-[410px] lg:w-[487px] flex shrink-0'>
            <img src='/assets/open-source.svg' alt='open-source image' />
          </div>
        </div>
        <div className='col-span-full flex flex-col gap-y-6 md:items-center'>
          <H2>
            <h2 className='text-center'>Open source</h2>
          </H2>
          <div className='text-gray-100 tracking-[-0.002rem]'>
            All code at deploycontract.io is open source. mattis ligula aliquet et. Morbi non porta lorem, aliquam
            suscipit leo. Maecenas blandit non sem vel blandit.
          </div>
          <SecondaryButton>
            <a href='#' className='py-4 px-8 flex flex-row justify-center items-center gap-x-[10px]'>
              <div className='w-6 h-7 flex justify-center'>
                <img src='/assets/github.svg' alt='github logo' />
              </div>
              Github
            </a>
          </SecondaryButton>
        </div>
      </GridContainer>
    </section>
  )
}
