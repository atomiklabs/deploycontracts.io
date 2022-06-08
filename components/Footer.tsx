import GridContainer from '@/components/GridContainer'

export default function Footer() {
  return (
    <section className='mt-16 md:mt-28 lg:mt-52'>
      <GridContainer>
        <div className='col-span-full flex flex-col items-center md:justify-between md:flex-row gap-y-6 py-14 md:py-6 md:border-t md:border-[#455378]'>
          <div className='flex flex-col md:flex-row gap-y-1 md:gap-x-2 items-center  text-gray-200'>
            Created by:
            <span>
              <img src='/assets/atomik-labs.svg' alt='atomik labs logo' />
            </span>
          </div>
          <div className='cursor-pointer'>
            <img src='/assets/github.svg' alt='github icon' width={31} height={37} />
          </div>
        </div>
      </GridContainer>
    </section>
  )
}
