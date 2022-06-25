import Head from 'next/head'

import { createNewTokenPath } from '../../consts'

export default function Snip20Index() {
  return (
    <Head>
      <meta httpEquiv='refresh' content={`0; url=${createNewTokenPath}`} />
    </Head>
  )
}
