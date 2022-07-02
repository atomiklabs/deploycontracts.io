import GridContainer from '@/components/GridContainer'
import { landingPageUrl } from 'consts'
import { AtomikLabsLogo } from './AtomikLabsLogo'

export default function Footer() {
  return (
    <footer className='mt-16 md:mt-28'>
      <GridContainer className='px-6'>
        <div className='col-span-full flex flex-col items-center md:justify-between md:flex-row gap-y-6 py-14 md:py-6 md:border-t md:border-[#455378]'>
          <div className='flex flex-col md:flex-row gap-y-1 md:gap-x-2 items-center  text-gray-200'>
            Created by:
            <a href={landingPageUrl.atomikLabs} target='_blank' className='flex flex-row items-center gap-x-2'>
              <AtomikLabsLogo className='fill-gray-200 w-6 h-8' />
              <span className='text-gray-200 font-bold'>Atomik Labs</span>
            </a>
          </div>
          <a href={landingPageUrl.github} target='_blank'>
            <img src='/assets/github.svg' alt='github icon' width={31} height={37} />
          </a>
        </div>
      </GridContainer>
    </footer>
  )
}
