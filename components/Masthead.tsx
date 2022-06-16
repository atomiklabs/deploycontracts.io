import GridContainer from '@/components/GridContainer'
import H1 from '@/components/headings/H1'

export default function Masthead() {
  return (
    <header className='mt-11 md:mt-16 lg:mt-40'>
      <GridContainer className='justify-center items-center'>
        <div className='col-span-full lg:col-start-7 lg:col-span-6 lg:order-2 flex justify-center'>
          <div className='h-full w-[270px] md:w-[410px] lg:w-[487px] flex shrink-0'>
            <img src='/assets/masthead.svg' alt='masthead image' />
          </div>
        </div>

        <div className='col-span-full lg:col-start-1 lg:col-span-6 lg:order-1 mt-9 text-white text-center lg:text-left '>
          <H1>
            <h1>
              Create + deploy smarts contracts on{' '}
              <strong className='relative z-10 sm:whitespace-nowrap'>
                <span className='w-full h-[30%] bottom-[5%] absolute -z-10 sm:bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)]'></span>
                Secret Network
              </strong>
            </h1>
          </H1>
        </div>

        <div className='col-span-full hidden lg:flex order-3 mt-14 justify-center'>
          <img src='/assets/ellipse.svg' alt='ellipse icon' />
        </div>
      </GridContainer>
    </header>
  )
}
