import axios from "axios";
import Router from "next/router";
import { IDP_URL } from './constants';

axios.interceptors.request.use((value) => {
    const clientId = 'sejam-gateway';

    const authorityPath = IDP_URL;

    if (typeof window !== 'undefined') {
        const oidcStorage:any = localStorage.getItem(`oidc.user:${authorityPath}:${clientId}`)
        let token = JSON.parse(oidcStorage)?.access_token
        let tokenType = JSON.parse(oidcStorage)?.token_type
            value.headers = {
                "Authorization": tokenType+" "+token,
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