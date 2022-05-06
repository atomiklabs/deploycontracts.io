import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import '../styles/index.scss'
import { TokenProvider } from '@/utils/token'

export default ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <TokenProvider>
      <Component {...pageProps} />
    </TokenProvider>
  )
}
