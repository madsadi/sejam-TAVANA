import React,{useEffect, useState} from "react";
import Lottie from 'react-lottie';
import animationData from '../../../public/icons/customer-service.json';
import {onlineRegistrationStatus} from "../../common/enums";
import useQuery from "../../../hooks/useQuery";
import {SEJAM_URL} from "../../../api/constants";

export default function UserStateLevel() {
    const {fetchAsyncData} = useQuery({url:`${SEJAM_URL}/api/request/GetRegistrationState`})
    const [state, setState] = useState<string | undefined>('')
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,

    };

    useEffect(() => {
        const registrationState = async () => {
            await fetchAsyncData()
                .then((res) => {
                    setState(onlineRegistrationStatus.find((item: any) => item.id === res?.data.result?.registrationState)?.title)
                })
        }

        registrationState()
    }, [])

    return (
        <div className="grow flex flex-col bg-white/50 backdrop-blur-md p-5 rounded-md bg-[url(/logo-black.svg)] bg-[length:200px_200px] bg-left-bottom bg-no-repeat">
            <Lottie
                options={defaultOptions}
                height={'50%'}
                width={'50%'}
            />
            <div>
                <div className={'flex w-fit mx-auto items-center  mb-5'}>
                    شما در وضعیت
                    <h2 className={'mx-1 text-sm m-0 sm:text-lg'} suppressHydrationWarning={true}>
                        {state}
                    </h2>
                    هستید
                </div>
                <p className={'text-center'}>پس از بررسی  و تایید اطلاعات توسط کارشناسان کارگزاری، اطلاعات حساب کاربری برای شما ارسال خواهد شد.</p>
                <p className={'text-center my-2'}>با تشکر</p>
                <p className={'text-center'}>کارگزاری توانا</p>
            </div>
        </div>
    )
}