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
import {getRegistrationState} from "../api/resgistration.api";
import {toast} from "react-toastify";

export const SejamContext = createContext({})
export default function Main() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: avatar,
    };
    const [level, setLevel] = useState<number>(-1)
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

    const findLevel = (no: number) => {
        //Enums(RegistrationState) are available in ../components/common/enums
        switch (true) {
            case no <= 5:
                setLevel(0);
                break;
            case no === 6:
                setLevel(1);
                break
            case no <= 14:
                setLevel(2);
                break
            case no === 15:
                setLevel(3);
                break
            case no === 16:
                setLevel(4);
                break
            case no === 17:
                setLevel(5);
                break
            case no >= 19:
                setLevel(6);
                break
            default:
                setLevel(0);
                return
        }
    }
    useEffect(() => {
        const registrationState = async () => {
            await getRegistrationState()
                .then((res) => findLevel(res?.result?.registrationState))
                .catch((err)=> {
                    setLevel(0)
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        }
        registrationState()
    }, [])

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
            <SejamContext.Provider value={{setLevel, setUserData, userData, level, setUserDefaultBank, userDefaultBank}}>
                <div className="container relative flex flex-col h-full py-10 text-sm md:text-md">
                    <ProgressBar/>
                    {level>=0 ? <div className={'flex flex-col grow pt-16 md:pt-24 pb-5'}>
                        {Components}
                    </div>:null}
                    {/*{level < 5 ? <div className={'md:block hidden fixed top-10 right-10 w-[150px] h-[200px] opacity-30'} suppressHydrationWarning={true}>*/}
                    {/*    <Lottie*/}
                    {/*        options={option}*/}
                    {/*    />*/}
                    {/*</div> : null}*/}
                </div>
            </SejamContext.Provider>
        )
}

