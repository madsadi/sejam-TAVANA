import Image from "next/image";
import React, { createContext, useState } from 'react'
import Confirmation from "../components/login&signup/confirmation";
import MobileEntry from "../components/login&signup/MobileEntry";
import InfoEntry from "../components/login&signup/InfoEntry";
import Login from "../components/login&signup/Login";

export const IdpContext = createContext<any>({})
export default function Home() {
    const [level, setLevel] = useState('mobileEntry')
    const [mobile, setMobile] = useState('')
    const [token, setToken] = useState<string>('')

    const Components = {
        'mobileEntry': <MobileEntry />,
        'confirmation': <Confirmation />,
        'infoEntry': <InfoEntry />,
        'login': <Login />
    }[level]

    return (
        <IdpContext.Provider value={{ setLevel, level, setMobile, mobile, setToken, token }}>
            <div
                className="flex lg:flex-row flex-col-reverse xl:w-4/5 lg:w-[960px] sm:h-[90vh] responsive-padding h-[100dvh] sm:m-auto shadow-md sm:rounded-md overflow-hidden ">
                <div className="h-full bg-white grow lg:basis-1/2 sm:w-[540px] w-full p-10 flex flex-col">
                    {Components}
                </div>
                <div className="relative h-full lg:grow lg:basis-1/2 basis-[80px] py-5 lg:py-0 flex flex-col bg-[url(/leafs.svg)] bg-no-repeat bg-center bg-contain">
                    <div className={'absolute hidden lg:block top-0 left-0'}>
                        <Image src={'/logo-text.svg'} alt={'tavana'} height={118} width={100} />
                    </div>
                    <div className={'flex lg:hidden grow'}>
                        <div className={'w-1/5 relative h-full'}>
                            <Image src={'/logo-white.svg'} alt={'tavana'} fill />
                        </div>
                        <div className={'grow relative h-full'}>
                            <Image src={'/logo-full.svg'} alt={'tavana'} fill />
                        </div>
                    </div>
                </div>
            </div>
        </IdpContext.Provider>
    )
}
