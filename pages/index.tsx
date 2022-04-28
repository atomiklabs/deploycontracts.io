import Link from 'next/link'
import BackButton from '@/components/buttons/BackButton'

export default function Example() {
  return (
    <div className='max-w-md mx-auto my-20'>
      <main>
        <BackButton>
          <Link href={'/'}>Back</Link>
        </BackButton>
      </main>
    </div>
  )
}
