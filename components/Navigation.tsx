import GridContainer from '@/components/GridContainer'
import GithubButton from '@/components/buttons/GithubButton'
import { DeployconttractsLogo } from '@/components/DeployconttractsLogo'

const navigation = [
  { name: 'About', href: '#' },
  { name: 'Contracts', href: '#' },
  { name: 'Sponsors', href: '#' },
  { name: 'Team', href: '#' },
]

export default function Navigation() {
  return (
    <nav className='py-5'>
      <GridContainer>
        <div className='col-span-3 md:col-start-2 md:order-2 lg:col-start-1 flex items-center'>
          <DeployconttractsLogo className='w-56 h-full md:w-72 md:h-9 cursor-pointer shrink-0' />
        </div>
        <div className='col-span-1 md:col-start-1 md:order-1 lg:hidden flex justify-end md:justify-start'>
          <div className='w-8 h-full cursor-pointer flex items-center shrink-0'>
            <img src='/assets/menu.svg' alt='menu icon' />
          </div>
        </div>
        <ul className='md:col-start-8 md:order-3 lg:col-start-5 lg:col-span-8 lg:gap-x-12 flex flex-row text-gray-100 lg:order-2 justify-end items-center'>
          {navigation.map((x: any, i: number) => {
            return (
              <li key={i} className='hidden lg:block leading-6'>
                <a href={x.href}>{x.name}</a>
              </li>
            )
          })}
          <li className='hidden md:block'>
            <GithubButton className='md:py-3 md:px-8 lg:px-12' />
          </li>
        </ul>
      </GridContainer>
    </nav>
  )
}
