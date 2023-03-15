import {useContext, useEffect, useState} from "react";
import {SejamContext} from "../../../pages/main";
import Lottie from 'react-lottie';
import animationData from '../../../public/icons/customer-service.json';
import {onlineRegistrationStatus} from "../../common/enums";
import {getRegistrationState} from "../../../api/resgistration.api";

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
        <div className="grow flex flex-col bg-white p-5 rounded-md">
            <Lottie
                options={defaultOptions}
                height={'50%'}
                width={'50%'}
            />
            <div>
                <div className={'flex w-fit mx-auto items-center'}>
                    شما در وضعیت
                    <h2 suppressHydrationWarning={true}>
                        {state}
                    </h2>
                    هستید
                </div>
            </div>
        </div>
    )
}