import Image from "next/image";
import React, {createContext, useState} from 'react'
import Confirmation from "../components/login&signup/confirmation";
import MobileEntry from "../components/login&signup/MobileEntry";
import InfoEntry from "../components/login&signup/InfoEntry";

export const IdpContext = createContext<any>({})
export default function Home() {
    const [level, setLevel] = useState('mobileEntry')
    const [mobile,setMobile] = useState('')
    const [token, setToken] = useState<string>('')

    const Components = {
        'mobileEntry': <MobileEntry />,
        'confirmation': <Confirmation />,
        'infoEntry': <InfoEntry/>
    }[level]

    return (
        <IdpContext.Provider value={{setLevel, level,setMobile,mobile,setToken,token}}>
            <div className="flex lg:flex-row flex-col-reverse xl:w-[1000px] lg:w-[960px] sm:h-[90vh] h-screen sm:m-auto shadow-md sm:rounded-md overflow-hidden">
                <div className="h-full bg-white grow lg:basis-1/2 sm:w-[540px] w-full p-10 flex flex-col">
                    {Components}
                </div>
                <div className="h-full bg-tavanaGreen lg:grow lg:basis-1/2 basis-[120px] py-5 lg:py-0 flex flex-col">
                    <span className="lg:h-1/2 lg:w-1/2 h-full w-full lg:m-auto relative">
                      <Image src={'/logo-full.svg'} alt={'tavana'} fill/>
                    </span>
                </div>
            </div>
        </IdpContext.Provider>
    )
}
