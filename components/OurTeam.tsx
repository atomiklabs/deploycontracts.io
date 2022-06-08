import GirdContainer from '@/components/GridContainer'
import H2 from '@/components/headings/H2'

const team = [
  { name: 'Lincoln Donin', img: '', linkedInIcon: '/assets/linkedIn.svg' },
  { name: 'Alfredo Press', img: '', linkedInIcon: '/assets/linkedIn.svg' },
  { name: 'Jaylon Vaccaro', img: '', linkedInIcon: '/assets/linkedIn.svg' },
]

export default function OurTeam() {
  return (
    <section className='mt-24'>
      <GirdContainer>
        <div className='col-span-full flex flex-col gap-y-4'>
          <H2>
            <h2 className='text-center'>
              Team <span className='gradient-text'> atomiklabs.io</span>
            </h2>
          </H2>
          <div className='text-gray-100 tracking-[-0.002rem]'>
            All code at deploycontract.io is open source. mattis ligula aliquet et. Morbi non porta lorem, aliquam
            suscipit leo. Maecenas blandit non sem vel blandit.
          </div>
        </div>
        <div className='col-span-full'>ss</div>
      </GirdContainer>
    </section>
  )
}
