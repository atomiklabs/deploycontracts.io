import GirdContainer from '@/components/GridContainer'
import H2 from '@/components/headings/H2'
import { landingPageUrl } from 'consts'

const team = [
  { name: 'Nick Zbiegien', img: '/assets/team-nick.png', href: 'https://www.linkedin.com/in/zbiegien/' },
  {
    name: 'Rafal Korzewski',
    img: '/assets/team-raf.png',
    href: 'https://www.linkedin.com/in/rafal-korzewski-b4a37b99/',
  },
  { name: 'Szymon Gos', img: '/assets/team-szymon.png', href: 'https://www.linkedin.com/in/szymon-gos777' },
  { name: 'Tomasz Kopacki', img: '/assets/team-tko.png', href: 'https://www.linkedin.com/in/tkopacki/' },
]

export default function OurTeam() {
  return (
    <section className='relative mt-24'>
      <div id='our-team' className='absolute -top-24' />

      <GirdContainer>
        <div className='col-span-full lg:col-start-3 lg:col-span-8 flex flex-col text-center gap-y-4 md:gap-y-6'>
          <H2>
            <span className='text-center'>
              Team{' '}
              <a href={landingPageUrl.atomikLabs} target='_blank' className='gradient-text'>
                atomiklabs.io
              </a>
            </span>
          </H2>

          <div className='text-gray-100 tracking-[-0.002rem]'>
            Those people were deeply involved into this project. Let us know what you think?
          </div>
        </div>

        <div className='col-span-full flex flex-col lg:flex-row lg:justify-evenly mt-8'>
          {team.map((x, i) => {
            return (
              <div
                key={i}
                className='flex flex-row lg:flex-col items-center gap-x-4 lg:gap-y-6 py-6 first-of-type:border-t border-b lg:border-0 lg:first-of-type:border-0 border-[#455378]'
              >
                <div className='w-14 h-full md:w-[72px] lg:w-[120px]'>
                  <img src={x.img} alt={`${x.name} img`} />
                </div>

                <div className='flex flex-row lg:flex-col lg:gap-y-6 lg:items-center justify-between w-full text-lg text-white font-space-grotesk font-bold'>
                  {x.name}
                  <a href={x.href} className='justify-self-end' target='_blank'>
                    <img src='/assets/linkedIn.svg' alt='linkedIn icon' />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </GirdContainer>
    </section>
  )
}
