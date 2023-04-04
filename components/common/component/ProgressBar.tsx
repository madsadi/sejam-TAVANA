import React from "react";
import {useMediaQuery} from 'react-responsive'
import {useContext} from "react";
import {SejamContext} from "../../../pages/main";

export default function ProgressBar() {
    const {level} = useContext<any>(SejamContext)
    const isMobile = useMediaQuery({query: `(max-width: 760px)`});
    const progress = [
        {
            title: 'ایجاد کاربر',
            level: 0,
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

    return (
            <ul className="steps mb-5 transition-all min-h-fit absolute top-10 z-10 w-full right-0">
                {
                    progress.map((step: any) => {
                        return (
                            <li suppressHydrationWarning={true} className={`step ${level >= step.level ? 'step-success':''}`} key={step.level}>{isMobile ? '':step.title}</li>
                        )
                    })
                }
            </ul>
    )
}