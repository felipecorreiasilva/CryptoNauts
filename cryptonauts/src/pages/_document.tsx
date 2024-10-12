import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='scroll-smooth' lang="en">
      <Head />
      <body className={`container mx-auto bg-primary-950`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
