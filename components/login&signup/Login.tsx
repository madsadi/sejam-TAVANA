import React, {useEffect} from "react";
import {useAuth} from 'react-oidc-context';
import {useRouter} from "next/router";

export default function Login() {
    const auth = useAuth();
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem('RefCode', `${router.query?.RefCode ? router.query?.RefCode:null}`)
    }, [])


    return (
        <>
            <h2>Log in</h2>
            <div className={'mt-auto text-center'}>
                <button className={'button mt-16'} onClick={() => void auth.signinRedirect()}>
                    <div className={'flex items-center mx-auto w-fit py-2 sm:py-1'}>
                        Log in
                    </div>
                </button>
            </div>
        </>

    )
}