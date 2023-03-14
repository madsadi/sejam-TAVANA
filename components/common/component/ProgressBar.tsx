import {
    ChevronLeftIcon
} from '@heroicons/react/24/solid'
import {useMediaQuery} from 'react-responsive'
import {useContext, useEffect} from "react";
import {SejamContext} from "../../../pages/main";
import {getRegistrationState} from "../../../api/resgistration.api";

export default function ProgressBar() {
    const {level, setLevel} = useContext<any>(SejamContext)
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
            title: 'در انتظار تایید مشتری',
            level: 6,
        }
    ]

    const findLevel = (no: number) => {
        //Enums(RegistrationState) are available in ../components/common/enums
        switch (true) {
            case no <= 5:
                setLevel(0);
                break;
            case no === 6:
                setLevel(1);
                break
            case no <= 14:
                setLevel(2);
                break
            case no === 15:
                setLevel(3);
                break
            case no === 16:
                setLevel(4);
                break
            case no === 17:
                setLevel(5);
                break
            case no >= 19:
                setLevel(6);
                break
            default:
                setLevel(0);
                return
        }
    }
    useEffect(() => {
        const registrationState = async () => {
            await getRegistrationState()
                .then((res) => findLevel(res?.result?.registrationState))
        }

        registrationState()
    }, [])

    return (
        <div className="flex mb-5 border border-gray-400 bg-gray-300 rounded-md">
            {
                progress.map((step: any, index: number) => {
                    return (
                        <div
                            className={`flex relative items-center text-sm h-8 transition-all text-white ${level === step.level ? `animate-pulse z-[4] rounded-l-full bg-green-400 ${step.level !== 0 && 'shadow-[16px_0_0_0_rgb(74,222,128)]'}` : ''} ${step.level === 6 ? 'w-fit rounded-l-none' : 'grow'}`}
                            key={step.level}>
                            <div className="mx-2 z-10">{isMobile ? index + 1 : step.title}</div>
                            <div
                                className={`absolute h-full right-0 transition-all duration-500 z-[5] ${level > step.level ? 'w-full bg-green-600' : (level < step.level ? '' : 'bg-green-400')} ${step.level !== 6 ? 'rounded-l-full' : 'rounded-l-none'} ${step.level > 0 ? 'shadow-[16px_0_0_0_rgb(22,163,74)]' : 'shadow-none'}`}/>
                            {step.level !== 6 && <ChevronLeftIcon className='h-full w-5 mr-auto z-10'/>}
                        </div>
                    )
                })
            }
        </div>
    )
}