import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Pacifico&family=Poppins:wght@300;500&family=Rubik:wght@300;400;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/images/icon.png" type="image/x-icon"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
