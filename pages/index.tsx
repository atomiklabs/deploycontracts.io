import Navigation from '@/components/Navigation'
import Masthead from '@/components/Masthead'
import Contracts from '@/components/Contracts'
import OurSponsors from '@/components/OurSponsors'

export default function LandingPage() {
  return (
    <>
      <main>
        <Navigation />
        <header>
          <Masthead />
        </header>
        <Contracts />
        <OurSponsors />
      </main>
    </>
  )
}
