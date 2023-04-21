import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './components/Layout'
import Head from 'next/head'
import Script from 'next/script'
import {Fira_Code } from '@next/font/google'
import {SessionProvider} from 'next-auth/react'

// pages/_app.js
import { NextFont } from '@next/font'

// Font files can be colocated inside of `pages`
const FiraCode : NextFont = Fira_Code({ subsets: ['latin'] })

export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return(
      <>
          <Head >
              <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
              <title>Portfolio</title>
          </Head>
          <style jsx global>
              {`
                html {
                  font-family: ${FiraCode.style.fontFamily};
                }
          `}
          </style>
          <SessionProvider>
              <Layout><Component {...pageProps} /></Layout>
          </SessionProvider>
      </>
  )
}
