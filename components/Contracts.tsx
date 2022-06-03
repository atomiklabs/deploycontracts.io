import Grid from '@/components/Grid'
import H2 from '@/components/headings/H2'

const data = [
  { id: 1, text: 'No smart contract developers required', icon: '/assets/hand.svg', iconName: 'hand' },
  { id: 2, text: "Fill up the form and submit, that's it", icon: '/assets/form.svg', iconName: 'form' },
]

export default function Contracts() {
  return (
    <section>
      <Grid>
        <div className='col-span-full text-center'>
          <H2>
            <h2>Available contracts</h2>
          </H2>
        </div>
        <div className='col-span-full flex flex-col md:flex-row gap-y-8 md:gap-y-0 md:gap-x-20 mt-10 md:mt-14 lg:mt-16 justify-center items-center'>
          {data.map((x) => {
            return (
              <div className='flex flex-row max-w-xs md:text-lg text-white leading-[23px] gap-x-8 font-space-grotesk font-bold'>
                <img src={x.icon} alt={`${x.iconName} icon`} />
                <span>{x.text}</span>
              </div>
            )
          })}
        </div>
      </Grid>
    </section>
  )
}
