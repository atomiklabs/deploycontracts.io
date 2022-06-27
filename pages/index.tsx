import Navigation from '@/components/Navigation'
import Masthead from '@/components/Masthead'
import Contracts from '@/components/Contracts'
import OpenSource from '@/components/OpenSource'
import OurSponsors from '@/components/OurSponsors'
import OurTeam from '@/components/OurTeam'
import Footer from '@/components/Footer'
import Head from 'next/head'

export default function Homepage() {
  return (
    <>
      <Head>
        <title>Create and deploy smart contracts to Secret Network</title>
        <meta
          name='description'
          content='Deploy smart contracts to Secret Network within minutes. No developers required, just fill up the form and submit'
        />
      </Head>

      <Navigation />

      <main>
        <Masthead />
        <Contracts />
        <OpenSource />
        <OurSponsors />
        <OurTeam />
        <Footer />
      </main>
    </>
  )
}
