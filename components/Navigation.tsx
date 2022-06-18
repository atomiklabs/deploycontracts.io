import { Fragment } from 'react'
import GridContainer from '@/components/GridContainer'
import GithubLink from '@/components/buttons/GithubLink'
import { DeployconttractsLogo } from '@/components/DeployconttractsLogo'
import { Popover, Transition } from '@headlessui/react'
import { landingPageUrl } from 'consts'

const navigation = [
  { name: 'Contracts', href: landingPageUrl.contracts },
  { name: 'Open Source', href: landingPageUrl.openSource },
  { name: 'Sponsors', href: landingPageUrl.sponsors },
  { name: 'Team', href: landingPageUrl.team },
]

export default function Navigation() {
  return (
    <aside className='sticky top-0 z-50 backdrop-blur'>
      <Popover>
        <nav className='relative py-5'>
          <GridContainer>
            <div className='z-50 col-span-3 md:col-start-2 md:order-2 xl:col-start-1 flex items-center'>
              <a href={landingPageUrl.navbarLogo}>
                <DeployconttractsLogo className='w-56 h-full md:w-72 md:h-9 cursor-pointer shrink-0' />
              </a>
            </div>

            <div className='col-span-1 md:col-start-1 md:order-1 xl:hidden flex justify-end md:justify-start'>
              <Popover.Button>
                <img src='/assets/menu.svg' alt='menu icon' />
              </Popover.Button>
            </div>

            <ul className='md:col-start-8 md:order-3 lg:col-start-5 lg:col-span-8 lg:gap-x-12 flex flex-row text-gray-100 lg:order-2 justify-end items-center'>
              {navigation.map((x: any, i: number) => {
                return (
                  <li key={i} className='hidden xl:block leading-6'>
                    <a
                      href={x.href}
                      className='bg-clip-text hover:text-transparent hover:bg-[linear-gradient(98.98deg,#671BC9_-83.86%,#FD0F9E_85.88%)]'
                    >
                      {x.name}
                    </a>
                  </li>
                )
              })}

              <li className='hidden md:block'>
                <GithubLink className='md:py-3 md:px-8 lg:px-12' />
              </li>
            </ul>

            <Transition
              as={Fragment}
              enter='duration-150 ease-out'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Popover.Panel className='absolute z-10 top-0 inset-x-0 transition transform origin-top-right bg-[#071741] border-b-2 xl:hidden'>
                <GridContainer className='py-5 md:pt-9'>
                  <div className='col-span-1 col-start-4 md:col-start-1 xl:hidden flex justify-end md:justify-start'>
                    <Popover.Button>
                      <div className='w-8 h-full cursor-pointer flex items-center shrink-0'>
                        <img src='/assets/menu.svg' alt='menu icon' />
                      </div>
                    </Popover.Button>
                  </div>

                  <ul className='col-span-full flex flex-col items-center gap-y-4 mt-5'>
                    {navigation.map((x: any, i: number) => {
                      return (
                        <li key={i} className='xl:hidden leading-6 text-gray-100'>
                          <a
                            href={x.href}
                            className='bg-clip-text hover:text-transparent hover:bg-[linear-gradient(98.98deg,#671BC9_-83.86%,#FD0F9E_85.88%)]'
                          >
                            {x.name}
                          </a>
                        </li>
                      )
                    })}

                    <li className='block md:hidden'>
                      <GithubLink className='px-4 py-2 md:py-3 md:px-8 lg:px-12' />
                    </li>
                  </ul>
                </GridContainer>
              </Popover.Panel>
            </Transition>
          </GridContainer>
        </nav>
      </Popover>
    </aside>
  )
}
