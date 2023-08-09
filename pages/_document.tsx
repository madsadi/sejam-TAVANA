import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full" dir="rtl" lang='fa'>
      <Head>
        <meta name="color-scheme" content="light only" />
        <script src="/static/assets/js/env-config.js"></script>

        <link rel='shortcut icon' href='/logo-black.svg' />
      </Head>
      <body className={"h-screen bg-black text-black flex flex-col"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
