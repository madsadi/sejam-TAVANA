import React, {useContext, useEffect, useState} from "react";
import {getSejamKYCToken, isSejami, sejamStatus} from "../../../api/ProfileSetter.api";
import {toast} from "react-toastify";
import {sejamStatusEnums} from "../../common/enums";
import {SejamContext} from "../../../pages/main";
import Image from "next/image";

export const SejamiStatus=()=>{
    const {setLevel} = useContext<any>(SejamContext)
    const [error, setError] = useState<{ message: string, link: string }>({message: '', link: ''})

    useEffect(()=>{
        const checkPoints = async () => {
            const KYC = async () => {
                await getSejamKYCToken()
                    .then(() => {
                        toast.success('کد برای شماره همراه شما ارسال شد')
                        setLevel(1)
                    })
                    .catch((err) => {
                        toast.error(`${err?.response?.data?.error?.message}`)
                    })
            }
            const status = async () => {
                await sejamStatus()
                    .then((res) => {
                        toast.success(`${sejamStatusEnums.find((item: any) => item.id === res?.result?.sejamStatus)?.title}`)
                        if (res?.result?.sejamStatus === 7) {
                            KYC();
                        } else {
                            if (res?.result?.sejamStatus === 9) {
                                toast.success('قابلیت ثبت نام برای این اطلاعات امکان ندارد')
                            } else {
                                setError({
                                    message:'عملیات ثبت نام شما در سامانه سجام انجام و یا کامل نشده است. لطفا در سامانه سجام ثبت نام نموده، سپس مجددا اقدام نمایید.'
                                    , link: 'http://profilesejam.csdiran.ir/'
                                })
                            }
                        }
                    })
                    .catch((err) => {
                        toast.error(`${err?.response?.data?.error?.message}`)
                    })
            }
            await isSejami()
                .then(() => {
                    toast.success('شما سجامی هستید')
                    status();
                })
                .catch((err) => {
                    setError({
                        message: 'کاربر گرامی شما در سجام احراز هویت نشده اید، لطفا جهت احراز هویت به یکی از مراکز احراز هویت مراجعه نمایید',
                        link: 'https://www.sejam.ir/fa/AU'
                    })
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        }
        checkPoints()
    },[])
    return(
        <div className={'bg-white rounded-md p-5'}>
            <div className={'w-full'}>
            {error?.message ?
                <a className={`bg-red-300 transition-all`}
                   href={error.link}>
                    <div className={'flex items-center mx-auto '}>
                                    <span className={'ml-3 min-w-[24px]'}>
                                        <Image src={'/icons/sejam.svg'} alt={'sejam'} height={24} width={24}/>
                                    </span>
                        {error.message}
                        <span className={'border-b border-blue-500 mr-2'}>
                                        کلیک کنید
                                    </span>
                    </div>
                </a> : null}
            </div>
        </div>
        )
}