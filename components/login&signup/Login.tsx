import React, {useEffect} from "react";
import Router, {useRouter} from "next/router";
import {requestMock} from "../common/functions";

export default function Login() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem('RefCode', `${router.query?.RefCode ? router.query?.RefCode:null}`)
    }, [])

    const loginHandler = async ()=>{
        await requestMock()
            .then(()=>Router.push('/main'))
    }

    return (
        <>
            <h2>Log in</h2>
            <div className={'mt-auto text-center'}>
                <button className={'button mt-16'} onClick={loginHandler}>
                    <div className={'flex items-center mx-auto w-fit py-2 sm:py-1'}>
                        Log in
                    </div>
                </button>
            </div>
        </>

    )
}