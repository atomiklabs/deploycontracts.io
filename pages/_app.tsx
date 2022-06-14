import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/index.scss'

export default ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <Head>
        <title>deploycontracts.io</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}
