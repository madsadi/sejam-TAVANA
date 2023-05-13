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
import {toast} from "react-toastify";
import {SejamiStatus} from "../components/main/sejami-status";
import Lottie from "react-lottie";
import Loader from "../public/multi-shape-loader.json";
import {SEJAM_URL} from "../api/constants";
import useQuery from "../hooks/useQuery";

export const SejamContext = createContext({})
export default function Main() {
    const {fetchAsyncData} = useQuery({url:`${SEJAM_URL}/api/request/GetRegistrationState`})
    const [level, setLevel] = useState<number>(-1)
    const [regInfo, setRegInfo] = useState<any>({})
    const [userData, setUserData] = useState<SejamInfoType[] | any>(null)
    const [error, setError] = useState<string>('')
    const [userDefaultBank, setUserDefaultBank] = useState<any>(null)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loader,
    };
    const findLevel = (no: number) => {
        //Enums(OnlineRegistrationStatus) are available in ../components/common/enums
        switch (true) {
            case no <= 5:
                setLevel(0);
                break;
            // case no === 6:
            //     setLevel(1);
            //     break
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
            case no >= 18:
                setLevel(6);
                break
            default:
                setLevel(0);
                return
        }
    }

    useEffect(() => {
        const registrationState = async () => {
            await fetchAsyncData()
                .then((res) => {
                    setTimeout(()=>{
                        findLevel(res?.data.result?.registrationState);
                    },1000)
                    setRegInfo(res?.data.result)
                })
                .catch((err) => {
                    setError('مشکلی پیش آمده.')
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
        <SejamContext.Provider value={{setLevel, setUserData, userData, level, setUserDefaultBank, userDefaultBank,regInfo}}>
            <div className="container relative flex flex-col h-full md:py-10 py-5 text-sm md:text-md">
                <ProgressBar/>
                {level >= 0 ? <div className={'flex flex-col grow pt-5 md:pt-5 pb-5'}>
                    {Components}
                </div> : <div className={'flex flex-col grow pt-5 md:pt-5 pb-5 bg-white/30 backdrop-blur-md rounded w-full'}>
                    <div className={'m-auto md:h-[400px] h-[250px] md:w-[400px] w-[250px]'}>
                    <Lottie
                        options={defaultOptions}
                    />
                        <p className={'text-center'}>
                        {error}
                        </p>
                    </div>
                </div>}
            </div>
        </SejamContext.Provider>
    )
}

