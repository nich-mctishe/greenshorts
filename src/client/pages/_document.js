import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </html>
    )
  }
}
