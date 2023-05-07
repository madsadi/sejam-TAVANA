import React from "react";
import Lottie from 'react-lottie';
import animationData from '../../../public/icons/customer-service.json';

export default function UserStateLevel() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,

    };

    return (
        <div className="grow flex flex-col bg-white/50 backdrop-blur-md p-5 rounded-md bg-[url(/icons/logo.jpg)] bg-[length:200px_200px] bg-left-bottom bg-no-repeat">
            <Lottie
                options={defaultOptions}
                height={'50%'}
                width={'50%'}
            />
            <div>
                <div className={'flex w-fit mx-auto items-center  mb-5'}>
                    We appreciate your time for the registration
                </div>
            </div>
        </div>
    )
}