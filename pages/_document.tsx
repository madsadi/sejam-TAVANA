import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full" dir="rtl" lang='fa'>
      <Head>
            <meta name="color-scheme" content="light only"/>
            <link rel='shortcut icon' href='/logo-white.svg' />
      </Head>
      <body className={"h-screen bg-[#E6E6E6] text-black flex flex-col bg-[url(/leaf-tavana.svg)] bg-no-repeat bg-center bg-cover"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
