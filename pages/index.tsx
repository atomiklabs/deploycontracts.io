import Navigation from '@/components/Navigation'
import Masthead from '@/components/Masthead'
import Contracts from '@/components/Contracts'
import OpenSource from '@/components/OpenSource'
import OurSponsors from '@/components/OurSponsors'
import Footer from '@/components/Footer'

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
        <OurSponsors />
        <footer>
          <Footer />
        </footer>
      </main>
    </>
  )
}
