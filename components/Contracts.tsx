import GridContainer from '@/components/GridContainer'
import H2 from '@/components/headings/H2'
import H3 from '@/components/headings/H3'
import AvailableText from '@/components/AvailableText'
import ComingSoon from '@/components/ComingSoon'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import React from 'react'

const data = [
  { text: 'No smart contract developers required', icon: '/assets/hand.svg', iconName: 'hand' },
  { text: "Fill up the form and submit, that's it", icon: '/assets/form.svg', iconName: 'form' },
]

const contracts = [
  {
    title: 'SNIP-20 contract',
    text: 'SNIP-20 contract. Cras feugiat rhoncus augue, nec mattis ligula aliquet et. Morbi non porta lorem, aliquam suscipit leo. Maecenas blandit non sem vel blandit.',
    available: true,
    image: '/assets/coins.svg',
  },
  {
    title: 'Vesting contract',
    text: 'Lock your token for investors or individuals. Cras feugiat rhoncus augue, nec mattis ligula aliquet et. Morbi non porta lorem, aliquam suscipit leo. Maecenas blandit non sem vel blandit.',
    available: false,
  },
  {
    title: 'IDO/liquidity pool contract',
    text: 'Add real value for your token, and get ready for the market. Cras feugiat rhoncus augue, nec mattis ligula aliquet et. Morbi non porta lorem, aliquam suscipit leo. Maecenas blandit non sem vel blandit.',
    available: false,
  },
  {
    title: 'Staking contract',
    text: 'Lock your token for investors or individuals. Cras feugiat rhoncus augue, nec mattis ligula aliquet et. Morbi non porta lorem, aliquam suscipit leo. Maecenas blandit non sem vel blandit.',
    available: false,
  },
]

export default function Contracts() {
  return (
    <section className='mt-20 md:mt-32 lg:mt-36'>
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
                <span>{x.text}</span>
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
                        <PrimaryButton>
                          <div className='py-3 px-11 whitespace-nowrap'>Create new token</div>
                        </PrimaryButton>
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
                  Do you need more complex contract? Please contact us and we would see how we can help.
                </div>
              </div>
              <PrimaryButton>
                <a href='/' className='py-3 px-11 w-full h-full inline-block whitespace-nowrap rounded-2xl bg-white'>
                  <span className='gradient-text'>Contact with Us</span>
                </a>
              </PrimaryButton>
            </div>
          </GridContainer>
        </div>
      </GridContainer>
    </section>
  )
}
