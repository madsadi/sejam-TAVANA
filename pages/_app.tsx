import React,{useRef} from 'react'
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from "react-oidc-context";
import {WebStorageStateStore} from "oidc-client-ts";
import Router from "next/router";
import '../api/axios_interceptor';
import { IDP_URL } from '../api/constants';

export default function App({Component, pageProps}: AppProps) {
    const toast: any = useRef()
    const authorityPath = IDP_URL;
    // const authorityPath = 'http://localhost:3000';
    const clientId = 'sejam-gateway';
    const clientURL = typeof window !== 'undefined' && window.location.origin;

    const oidcConfig = {
        userStore: typeof window !== 'undefined' ? new WebStorageStateStore({store: window.localStorage}) : undefined,
        authority: `${authorityPath}`,
        client_id: `${clientId}`,
        scope: 'openid IdentityServerApi',
        response_type: 'code',
        redirect_uri: `${clientURL}/authentication/callback`,
        post_logout_redirect_uri: `${clientURL}`, // Auth0 uses returnTo
        silent_redirect_uri: `${clientURL}/authentication/silent_callback`,
        automaticSilentRenew: true,
        loadUserInfo: false,
        metadata: {
            issuer: `${authorityPath}/`,
            authorization_endpoint: `${authorityPath}/connect/authorize`,
            token_endpoint: `${authorityPath}/connect/token`,
            userinfo_endpoint: `${authorityPath}/connect/userinfo`,
            end_session_endpoint: `${authorityPath}/connect/endsession`
        }
    }

    const onSignIn = () => {
        Router.push('/main')
    }

    return (
        <AuthProvider {...oidcConfig} onSigninCallback={onSignIn} prompt={'login'}>
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
        </AuthProvider>
    )
}
