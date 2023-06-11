import React from "react";
import {useContext} from "react";
import {SejamContext} from "../../../pages/main";
import Image from "next/image";
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/20/solid";
import Router from "next/router";
import {useAuth} from "react-oidc-context";

export default function ProgressBar() {
    const {level,regInfo} = useContext<any>(SejamContext)
    const registerLogin = typeof window !== 'undefined' && localStorage.getItem('register-login')
    const progress = [
        {
            title: 'ایجاد پروفایل',
            level: 0,
        },
        {
            title: 'وضعیت سجامی',
            level: 0.5,
        },
        {
            title: 'دریافت اطلاعات سجامی',
            level: 1,
        },
        {
            title: 'تکمیل اطلاعات',
            level: 2,
        },
        {
            title: 'بارگذاری مدارک',
            level: 3,
        },
        {
            title: 'تکمیل آزمون',
            level: 4,
        },
        {
            title: 'تکمیل تعهدنامه',
            level: 5,
        },
        {
            title: 'وضعیت ثبت نام',
            level: 6,
        }
    ]
    const auth = useAuth()
    return (
        <div className={'container relative flex flex-row md:flex-col items-center z-10'}>
            <div className={'mx-auto py-5 ml-10 md:m-0'}>
                <Image src={'/logo-white.svg'} height={60} width={60} alt={'tavana'}/>
            </div>
            <button
                className={'md:flex hidden absolute left-0 top-[50px] -translate-y-1/2 bg-content text-tavanaRed border-2 border-tavanaRed py-2 px-5 w-fit hover:opacity-70 transition-colors'}
                onClick={() => {
                    if (registerLogin){
                        localStorage.clear()
                    }else{
                        void auth.signoutRedirect({id_token_hint: auth.user?.id_token})
                    }
                    Router.push('/')
                }}>
                <ArrowLeftOnRectangleIcon className={'h-5 w-5'}/>
                <p className={'hidden md:block'}>
                    خروج
                </p>
            </button>
            <div className={'relative w-full'}>
                <ul className="flex">
                    {
                        progress.map((step: any,index:number) => {
                            return (
                                <li suppressHydrationWarning={true}
                                    className={`relative md:justify-end justify-center items-center font-bold grow text-center bg-no-repeat bg-center p-2 h-full md:h-[150px] h-[81px] ${level > step.level ? 'step-done' : (level === step.level ? (regInfo.registrationState===18 && step.level===6 ? 'step-done':'step-active') : 'step-done')}`}
                                    key={step.level} style={{backgroundImage:`url(/digits/${index+1}-${level === step.level ? (regInfo.registrationState===18 && step.level===6 ? 'inactive':'active'):'inactive'}.svg)`}}>
                                    <p className={'pb-5 md:-translate-y-1/2 translate-y-1/2 text-2xl md:text-sm md:p-0'}>{step.title}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <button
                className={'md:hidden h-full flex flex-col mr-5 bg-content text-tavanaRed border-b-0 translate-y-0.5 border-2 border-tavanaRed py-2 px-5 w-fit hover:opacity-70 transition-colors'}
                onClick={() => {
                    void auth.signoutRedirect({id_token_hint: auth.user?.id_token})
                    Router.push('/')
                }}>
                <span className={'my-auto'}>
                   <ArrowLeftOnRectangleIcon className={'h-5 w-5 mx-auto'}/>
                    خروج
                </span>
            </button>
        </div>
    )
}