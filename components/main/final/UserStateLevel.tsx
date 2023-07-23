import React, { useEffect, useState, useContext } from "react";
import { onlineRegistrationStatus } from "../../common/enums";
import { SejamContext } from "../../../pages/main";

export default function UserStateLevel() {
    const { regInfo } = useContext<any>(SejamContext)
    const [state, setState] = useState<string | undefined>('')

    useEffect(() => {
        if (regInfo) setState(onlineRegistrationStatus.find((item: any) => item.id === regInfo?.registrationState)?.title)
    }, [regInfo])

    return (
        <div className="grow flex flex-col bg-[url(/leafs-back.svg)] bg-left-bottom bg-no-repeat">
            <div className={'m-auto font-bold'}>
                <div className={'flex w-fit mx-auto items-center  mb-5'}>
                    شما در وضعیت
                    <h2 className={'mx-1 text-sm m-0 sm:text-lg text-tavanaPurple'} suppressHydrationWarning={true}>
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