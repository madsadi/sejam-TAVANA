import React,{useEffect, useState} from "react";
import Lottie from 'react-lottie';
import animationData from '../../../public/icons/customer-service.json';
import {onlineRegistrationStatus} from "../../common/enums";
import {getRegistrationState} from "../../../api/resgistration.api";
import Image from 'next/image'

export default function UserStateLevel() {
    const [state, setState] = useState<string | undefined>('')
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,

    };

    useEffect(() => {
        const registrationState = async () => {
            await getRegistrationState()
                .then((res) => {
                    setState(onlineRegistrationStatus.find((item: any) => item.id === res?.result?.registrationState)?.title)
                })
        }

        registrationState()
    }, [])

    return (
        <div className="grow flex flex-col bg-white p-5 rounded-md bg-[url(/icons/logo.jpg)] bg-[length:200px_200px] bg-left-bottom bg-no-repeat">
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