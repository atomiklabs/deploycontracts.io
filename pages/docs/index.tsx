import Head from 'next/head'

export default function DocsPage() {
  let docsPagePath = '/snip-20/docs'

  if (typeof window !== 'undefined') {
    docsPagePath += window.location.search
  }

  return (
    <Head>
      <meta httpEquiv='refresh' content={`0; url=${docsPagePath}`} />{' '}
    </Head>
  )
}
