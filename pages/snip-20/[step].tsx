import { Snip20StepsProvider } from '@/utils/snip20StepsProvider'
import Snip20 from '@/components/snip-20'
import Head from 'next/head'

export default function Step() {
  return (
    <Snip20StepsProvider>
      <Head>
        <title>Deploy SNIP-20 smart contract for free</title>
        <meta
          name='description'
          content={`Fill up the form to create and deploy new SNIP-20 smart contract. This would take only few minutes and it's completely free.`}
        />
      </Head>

      <Snip20 />
    </Snip20StepsProvider>
  )
}

export async function getStaticPaths() {
  const paths = [...Array(4)].map((x, i) => `/snip-20/step-${i + 1}`)
  return { paths, fallback: false }
}

export async function getStaticProps() {
  return { props: {} }
}
