import Grid from '@/components/Grid'
import { NonOptimizedImage } from './NonOptimizedImage'
import masthead from '../public/assets/masthead.svg'

export default function Masthead() {
  return (
    <>
      <Grid>
        <div className='col-span-full lg:col-start-8 lg:col-span-5 lg:order-2 flex justify-center'>
          <NonOptimizedImage src={masthead} alt='masthead image' />
        </div>
        <div className='col-span-full lg:col-start-1 lg:col-span-6 lg:order-1 text-white text-[64px] leading-[81px] text-center mt-9'>
          <h1>
            Customize & Deploy your smarts contract within minutes{' '}
            <span className='relative z-10 whitespace-nowrap'>
              <span className='bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)] w-full h-1/2 bottom-[-10%] absolute -z-10'></span>
              for free
            </span>
          </h1>
        </div>
      </Grid>
    </>
  )
}
