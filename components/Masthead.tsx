import GridContainer from '@/components/GridContainer'
import H1 from '@/components/headings/H1'

export default function Masthead({ id }: { id: string }) {
  return (
    <section id={id} className='mt-11 md:mt-16 lg:mt-40'>
      <GridContainer>
        <div className='col-span-full lg:col-start-7 lg:col-span-6 lg:order-2 flex justify-center'>
          <div className='h-full w-[270px] md:w-[410px] lg:w-[487px] flex shrink-0'>
            <img src='/assets/masthead.svg' alt='masthead image' />
          </div>
        </div>
        <div className='col-span-full lg:col-start-1 lg:col-span-6 lg:order-1 mt-9 text-white text-center lg:text-left '>
          <H1>
            <h1>
              Customize & Deploy your smarts contract within minutes{' '}
              <span className='relative z-10 whitespace-nowrap'>
                <span className='bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)] w-full h-[30%] bottom-[5%] absolute -z-10'></span>
                for free
              </span>
            </h1>
          </H1>
        </div>
        <div className='col-span-full hidden lg:flex order-3 mt-14 justify-center'>
          <img src='/assets/ellipse.svg' alt='ellipse icon' />
        </div>
      </GridContainer>
    </section>
  )
}