import Navigation from '@/components/Navigation'
import Masthead from '@/components/Masthead'
import Contracts from '@/components/Contracts'
import OpenSource from '@/components/OpenSource'

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
      </main>
    </>
  )
}
