import "../styles/globals.css"
import React from "react"
import Head from "next/head"

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=News+Cycle&family=Prata&display=swap" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
        </>

    )
}