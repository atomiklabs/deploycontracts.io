import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className='font-montserrat font-default text-base min-h-screen body-gradient'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
