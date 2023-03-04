import {useRef} from 'react'
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App({Component, pageProps}: AppProps) {
    const toast: any = useRef()

    return (
        <>
            <Head>
                <title> ثبت نام در کارگزاری توانا</title>
            </Head>
            <ToastContainer
                ref={toast}
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                toastStyle={{fontFamily: "PelakFA", fontSize: '14px'}}
            />
            <Component {...pageProps} />
        </>
    )
}
