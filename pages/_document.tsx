import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full" dir="rtl" lang='fa'>
      <Head>
        <link rel='shortcut icon' href='/img.png' />
      </Head>
      <body className={"h-screen bg-gray-100 text-black flex flex-col"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
