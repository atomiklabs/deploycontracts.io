import Navigation from '@/components/Navigation'

const navigation = [
  { name: 'About', href: '#' },
  { name: 'Contracts', href: '#' },
  { name: 'Sponsors', href: '#' },
  { name: 'Team', href: '#' },
]

export default function LandingPage() {
  return (
    <>
      <main>
        <Navigation navigation={navigation} />
      </main>
    </>
  )
}
