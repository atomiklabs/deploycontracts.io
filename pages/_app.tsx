import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import '../styles/index.scss'
import { TokenProvider } from '@/utils/token'
import Head from 'next/head'

export default ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <TokenProvider>
      <Head>
        <title>deploycontracts.io</title>
      </Head>
      <Component {...pageProps} />
    </TokenProvider>
  )
}
