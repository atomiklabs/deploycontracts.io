import Navigation from '@/components/Navigation'
import Masthead from '@/components/Masthead'
import Contracts from '@/components/Contracts'
import OpenSource from '@/components/OpenSource'
import OurTeam from '@/components/OurTeam'

export default function LandingPage() {
  return (
    <>
      <main>
        <Navigation />
        <header>
          <Masthead />
        </header>
        <Contracts />
        <OpenSource />
        <OurTeam />
      </main>
    </>
  )
}
