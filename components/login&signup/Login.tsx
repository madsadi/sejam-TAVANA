import React from "react";
import { useAuth } from 'react-oidc-context';
import {useRouter} from "next/router";

export default function Login(){
    const auth = useAuth();
    const router = useRouter()

    if (!localStorage.getItem('RefCode') && router.query?.RefCode){
        localStorage.setItem('RefCode',`${router.query?.RefCode}`)
    }

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