import GridContainer from '@/components/GridContainer'
import H2 from '@/components/headings/H2'
import H3 from '@/components/headings/H3'
import AvailableText from '@/components/AvailableText'
import ComingSoon from '@/components/ComingSoon'
import React from 'react'
import PrimaryLink from './buttons/PrimaryLink'
import { landingPageUrl } from 'consts'

const data = [
  { text: 'No smart contract developers required', icon: '/assets/hand.svg', iconName: 'hand' },
  { text: `Fill up the form and submit. That's it!`, icon: '/assets/list.svg', iconName: 'form' },
]

const contracts = [
  {
    title: 'SNIP-20 contract',
    text: 'Creator allows you to deploy token contract to Secret Network within minutes. Assign initial token allocation and provide marketing details if required',
    available: true,
    image: '/assets/coins.svg',
  },
  {
    title: 'Vesting contract',
    text: `This contract allow to distribute tokens based on time schedules for investors or individuals. Assign tokens to your users and decide when they could claim them. It's a common practice to avoid selling pressure, followed by a rapid token price drop right after IDOs`,
    available: false,
  },
  {
    title: 'IDO / liquidity pool contract',
    text: 'Add a real value for your token and get ready for the market. This tool helps to begin community engagement by providing initial liquidity pool for decentralised exchanges',
    available: false,
  },
  {
    title: 'Staking contract',
    text: 'Grow your community and their engagement with staking contract. Incentivizing users by staking mechanisms is a common practice, reward them with extra tokens',
    available: false,
  },
]

export default function Contracts() {
  return (
    <section className='relative mt-20 md:mt-32 lg:mt-36'>
      <div id='available-contracts' className='absolute -top-24' />
      <GridContainer>
        <div className='col-span-full text-center'>
          <H2>
            <h2>Available contracts</h2>
          </H2>
        </div>
        <div className='col-span-full flex flex-col md:flex-row gap-y-8 md:gap-y-0 md:gap-x-20 mt-10 md:mt-14 lg:mt-16 justify-center items-center'>
          {data.map((x, i) => {
            return (
              <div
                key={i}
                className='flex flex-row max-w-xs md:text-lg text-white leading-[23px] gap-x-8 font-space-grotesk font-bold'
              >
                <img src={x.icon} alt={`${x.iconName} icon`} />
                <strong>{x.text}</strong>
              </div>
            )
          })}
        </div>

        <div className='col-span-full mt-20'>
          <GridContainer className='px-0 gap-y-6'>
            {contracts.map((x, i) => {
              return (
                <React.Fragment key={i}>
                  {x.available ? (
                    <div className='col-span-full lg:col-span-full flex flex-col lg:flex-row p-6 md:p-12 lg:p-16 bg-[#0F204C] rounded-2xl'>
                      <div className='flex justify-center lg:w-1/2 lg:order-2'>
                        <img src={x.image} alt={`${x.title} image`} />
                      </div>
                      <div className='flex flex-col gap-y-5 mt-7 lg:w-1/2 lg:order-1'>
                        <AvailableText />
                        <H3>
                          <h3>{x.title}</h3>
                        </H3>
                        <div className='text-gray-100 tracking-[-0.02rem]'>{x.text}</div>
                        <PrimaryLink href={landingPageUrl.createNewToken}>Create new token</PrimaryLink>
                      </div>
                    </div>
                  ) : (
                    <div className='col-span-full lg:col-span-6 flex flex-col p-6 md:p-12 lg:p-16 gap-y-5 bg-[#0F204C] rounded-2xl'>
                      <ComingSoon />
                      <H3>
                        <h3>{x.title}</h3>
                      </H3>
                      <div className='text-gray-100 tracking-[-0.02rem]'>{x.text}</div>
                    </div>
                  )}
                </React.Fragment>
              )
            })}

            <div className='col-span-full lg:col-span-6 flex flex-col justify-between gap-y-5 bg-[linear-gradient(115.82deg,#671BC9_5.15%,#FD0F9E_108.88%)] rounded-2xl p-6 md:p-12 lg:p-16'>
              <div>
                <H3>
                  <h3>Custom contract</h3>
                </H3>
                <div className='text-gray-100 tracking-[-0.02rem]'>
                  Do you need smart contract for your business? We're happy to help
                </div>
              </div>
              <PrimaryLink
                href={landingPageUrl.atomikLabs}
                className='rounded-2xl bg-white !bg-none hover:bg-[#FDBA0F]'
              >
                <span className='gradient-text'>Contact with Us</span>
              </PrimaryLink>
            </div>
          </GridContainer>
        </div>
      </GridContainer>
    </section>
  )
}
