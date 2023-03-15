import {createContext, useEffect, useState} from 'react';
import ProgressBar from "../components/common/component/ProgressBar";
import AgreementLevel from "../components/main/agreement/Agreement.level";
import ProfileSetter from "../components/main/Profile-setter";
import GetSejamProfile from "../components/main/Get-sejam-profile";
import SejamInfoLevel from "../components/main/sejam-info/SejamInfo.level";
import UploadDocumentsLevel from "../components/main/upload-documents/UploadDocuments.level";
import TestLevel from "../components/main/test/Test.level";
import {SejamInfoType} from "../components/main/sejam-info/types";
import UserStateLevel from "../components/main/final/UserStateLevel";
import Lottie from "react-lottie";
import avatar from "../public/icons/avatar.json";
import pencil from "../public/icons/pencil.json";
import scan from "../public/icons/scan-document.json";
import sms from "../public/icons/sms.json";

export const SejamContext = createContext({})
export default function Main() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: avatar,
    };
    const [level, setLevel] = useState<number>(5)
    const [option, setOption] = useState<any>(defaultOptions)
    const [userData, setUserData] = useState<SejamInfoType[] | any>(null)
    const [userDefaultBank, setUserDefaultBank] = useState<any>(null)


    useEffect(() => {
        const optionHandler = (level: number) => {
            switch (level) {
                case 1:
                    setOption({
                        loop: true,
                        autoplay: true,
                        animationData: sms,
                    })
                    break;
                case 2:
                case 4:
                    setOption({
                        loop: true,
                        autoplay: true,
                        animationData: pencil,
                    })
                    break;
                case 3:
                    setOption({
                        loop: true,
                        autoplay: true,
                        animationData: scan,
                    })
                    break;
            }
        }
        optionHandler(level)
    }, [level])

    const Components = {
        0: <ProfileSetter/>,
        1: <GetSejamProfile/>,
        2: <SejamInfoLevel/>,
        3: <UploadDocumentsLevel/>,
        4: <TestLevel/>,
        5: <AgreementLevel/>,
        6: <UserStateLevel/>
    }[level]

    return (
        <SejamContext.Provider value={{setLevel, setUserData, userData, level,setUserDefaultBank,userDefaultBank}}>
            <div className="container flex flex-col h-full py-10 text-sm md:text-md">
                <ProgressBar/>
                {Components}
                {level < 5 ? <div className={'md:block hidden fixed top-10 right-10 w-[150px] h-[200px] opacity-30'} suppressHydrationWarning={true}>
                    <Lottie
                        options={option}
                    />
                </div> : null}
            </div>
        </SejamContext.Provider>
    )
}