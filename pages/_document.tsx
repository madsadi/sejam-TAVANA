import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full" >
      <Head>
            <meta name="color-scheme" content="light only"/>
            <link rel='shortcut icon' href='/img.png' />
      </Head>
      <body className={"h-screen bg-gray-100 text-black flex flex-col bg-[url(/icons/logo-raw.svg)] bg-no-repeat bg-center bg-contain"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
