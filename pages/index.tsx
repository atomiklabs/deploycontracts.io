import Navigation from '@/components/Navigation'
import Masthead from '@/components/Masthead'
import Contracts from '@/components/Contracts'
import OpenSource from '@/components/OpenSource'
import OurSponsors from '@/components/OurSponsors'
import OurTeam from '@/components/OurTeam'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <>
      <main>
        <aside className='sticky top-0 z-50 backdrop-blur'>
          <Navigation />
        </aside>
        <header>
          <Masthead id='welcome' />
        </header>
        <Contracts id='available-contracts' />
        <OpenSource id='open-source' />
        <OurSponsors id='our-sponsors' />
        <OurTeam id='our-team' />
        <footer>
          <Footer />
        </footer>
      </main>
    </>
  )
}
