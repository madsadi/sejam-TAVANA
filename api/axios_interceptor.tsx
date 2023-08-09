import axios from "axios";
import Router from "next/router";
import { IDP_URL } from './constants';

axios.interceptors.request.use((value) => {
    const clientId = 'sejam-gateway';

    const authorityPath = IDP_URL;

    if (typeof window !== 'undefined') {
        const oidcStorage: any = localStorage.getItem(`oidc.user:${authorityPath}:${clientId}`)
        let token = JSON.parse(oidcStorage)?.access_token
        let tokenType = JSON.parse(oidcStorage)?.token_type
        value.headers = {
            "Authorization": tokenType + " " + token,
            "X-Frame-Options": "DENY",
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0 post-check=0, pre-check=0",
            "Pragma": "no-cache",
            "X-Content-Type-Options": "nosniff",
            "X-XSS-Protection": "1; mode=block",
            "Content-Security-Policy": "default-src 'self'"
        }

        return value
    }
})

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const clientId = 'sejam-gateway';
        const authorityPath = IDP_URL;

        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem(`oidc.user:${authorityPath}:${clientId}`);
                Router.push('/');
            }
        }

        return Promise.reject(error);
    }
);