import React from "react";
import Image from "next/image";

export default function SignInInfo() {
    return (
        <div className={'flex min-h-screen'}>
            <span className={'animate-spin m-auto h-12'}>
                <Image src={'/icons/spinner-light.svg'} width={48} height={48} alt={'loader'}/>
            </span>
        </div>
    )
}