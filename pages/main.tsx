import React, {createContext, useEffect, useState} from 'react';
import ProgressBar from "../components/common/component/ProgressBar";
import AgreementLevel from "../components/main/agreement/Agreement.level";
import ProfileSetter from "../components/main/Profile-setter";
import GetSejamProfile from "../components/main/Get-sejam-profile";
import SejamInfoLevel from "../components/main/sejam-info/SejamInfo.level";
import UploadDocumentsLevel from "../components/main/upload-documents/UploadDocuments.level";
import TestLevel from "../components/main/test/Test.level";
import {SejamInfoType} from "../components/main/sejam-info/types";
import UserStateLevel from "../components/main/final/UserStateLevel";
import {getRegistrationState} from "../api/resgistration.api";
import {toast} from "react-toastify";
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/24/outline";
import {useAuth} from "react-oidc-context";
import Router from "next/router";
import {SejamiStatus} from "../components/main/sejami-status";

export const SejamContext = createContext({})
export default function Main() {
    const [level, setLevel] = useState<number>(0)
    const [regInfo, setRegInfo] = useState<any>({})
    const [userData, setUserData] = useState<SejamInfoType[] | any>(null)
    const [userDefaultBank, setUserDefaultBank] = useState<any>(null)
    const auth = useAuth();

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
                .then((res) => {
                    findLevel(res?.result?.registrationState);
                    setRegInfo(res?.result)
                })
                .catch((err) => {
                    setLevel(0)
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        }
        registrationState()
    }, [])

    const Components = {
        0: <ProfileSetter regInfo={regInfo}/>,
        0.5: <SejamiStatus/>,
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
                {level >= 0 ? <div className={'flex flex-col grow pt-16 md:pt-24 pb-5'}>
                    {Components}
                </div> : null}
                <button
                    className={'md:flex hidden fixed top-10 left-10 rounded bg-gray-300 py-2 px-5 w-fit hover:opacity-70 transition-colors'} onClick={() => {
                    void auth.signoutRedirect({id_token_hint: auth.user?.id_token})
                    Router.push('/')
                }}>
                    <ArrowLeftOnRectangleIcon className={'h-5 w-5'}/>
                    خروج
                </button>
            </div>
        </SejamContext.Provider>
    )
}

