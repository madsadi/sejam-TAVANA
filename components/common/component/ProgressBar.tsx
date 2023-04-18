import React from "react";
import {useMediaQuery} from 'react-responsive'
import {useContext} from "react";
import {SejamContext} from "../../../pages/main";
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/24/outline";
import Router from "next/router";
import {useAuth} from "react-oidc-context";

export default function ProgressBar() {
    const {level} = useContext<any>(SejamContext)
    const isMobile = useMediaQuery({query: `(max-width: 760px)`});
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
    const auth = useAuth();

    return (
        <div className={'flex md:flex-row flex-col items-center mb-5 z-10'}>
            <div className={'relative grow h-[60px] w-full'}>
                <ul className="steps transition-all min-h-fit absolute top-0 z-10 w-full right-0">
                    {
                        progress.map((step: any) => {
                            return (
                                <li suppressHydrationWarning={true}
                                    className={`step ${level > step.level ? 'step-success' : (level === step.level ? 'step-active' : '')}`}
                                    key={step.level}>{isMobile ? '' : step.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <button
                className={'flex rounded bg-gray-300 py-2 px-5 w-fit hover:opacity-70 transition-colors'}
                onClick={() => {
                    void auth.signoutRedirect({id_token_hint: auth.user?.id_token})
                    Router.push('/')
                }}>
                <ArrowLeftOnRectangleIcon className={'h-5 w-5'}/>
                خروج
            </button>
        </div>
    )
}