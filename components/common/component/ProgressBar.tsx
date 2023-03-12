import {
    ChevronLeftIcon
} from '@heroicons/react/24/solid'
import { useMediaQuery } from 'react-responsive'
import {useContext} from "react";
import {SejamContext} from "../../../pages/main";

export default function ProgressBar() {
    const {level ,setLevel} = useContext<any>(SejamContext)
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    const progress = [
        {
            title: 'ایجاد کاربر',
            level: 0,
        },
        {
            title: 'تایید شماره موبایل',
            level: 1,
        },
        {
            title: 'دریافت اطلاعات سجامی',
            level: 2,
        },
        {
            title: 'بارگذاری مدارک',
            level: 3,
        },
        {
            title: 'آزمون آنلاین بورس',
            level: 4,
        },
        {
            title: 'خدمات کارگزاری',
            level: 5,
        },
        {
            title: 'در انتظار تایید مشتری',
            level: 6,
        }
    ]

    return (
        <div className="flex mb-5 border border-gray-400 bg-gray-300">
            {
                progress.map((step: any, index: number) => {
                    return (
                        <div className={`flex relative items-center text-sm h-8 transition-all text-white ${level === step.level ? `animate-pulse z-[4] rounded-l-full bg-green-400 ${step.level !==0 && 'shadow-[16px_0_0_0_rgb(74,222,128)]'}` : ''} ${step.level === 6 ? 'w-fit rounded-l-none' : 'grow'}`} key={step.level} onClick={() => setLevel(step.level)}>
                            <div className="mx-2 z-10">{isMobile ? index + 1 : step.title}</div>
                            <div className={`absolute h-full right-0 transition-all duration-500 z-[5] ${level > step.level ? 'w-full bg-green-600' : (level < step.level ? '':'bg-green-400')} ${step.level !== 6 ? 'rounded-l-full' : 'rounded-l-none'} ${step.level > 0 ? 'shadow-[16px_0_0_0_rgb(22,163,74)]' : 'shadow-none'}`} />
                            {step.level !== 6 && <ChevronLeftIcon className='h-full w-5 mr-auto z-10' />}
                        </div>
                    )
                })
            }
        </div >
    )
}