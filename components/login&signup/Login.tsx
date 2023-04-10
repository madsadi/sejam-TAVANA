import React from "react";
import { useAuth } from 'react-oidc-context';
import {router} from "next/client";
import {ExtraSigninRequestArgs} from "oidc-client-ts";

export default function Login(){
    const auth = useAuth();

    return(
        <>
            <h2>ورود</h2>
            <div className={'mt-auto text-center'}>
                <button className={'button mt-16'} onClick={() => void auth.signinRedirect()}>
                    <div className={'flex items-center mx-auto w-fit'}>
                        ورود
                    </div>
                </button>
            </div>
        </>

    )
}