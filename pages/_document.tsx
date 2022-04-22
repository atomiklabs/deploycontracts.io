import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Space+Grotesk:wght@700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body className='font-montserrat font-default text-base h-screen body-gradient'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
