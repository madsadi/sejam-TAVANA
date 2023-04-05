import React, {useContext, useEffect, useState} from "react";
import {addCustomerProfileInfo, getSejamKYCToken, isSejami, sejamStatus} from "../../../api/ProfileSetter.api";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";
import {personType, sejamStatusEnums} from "../../common/enums";
import {countryType} from "../sejam-info/types";
import {searchCountry} from "../../../api/sejam-info.api";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {getCurrentUserInfo} from "../../../api/login-signup.api";
import Image from 'next/image';
import CaptchaComponentNotFormik from "../../common/component/CaptchaComponentNotFormik";

type initialType = {
    mobileNumber: string,
    uniqueId: string,
    email: string,
    personType: any,
    countryId: any,
    captcha: string,
    uuid: string
}
const initialValue = {
    mobileNumber: '',
    uniqueId: '',
    email: '',
    personType: 1,
    countryId: 1,
    captcha: '',
    uuid: ''
}

export default function ProfileSetter() {
    const {setLevel} = useContext<any>(SejamContext)
    const [info, setInfo] = useState<initialType | any>(initialValue)
    const [country, setCountry] = useState<countryType>({countryName: 'ایران', countryId: 1})
    const [countries, setCountries] = useState<countryType[]>([])
    const [error, setError] = useState<{ message: string, link: string }>({message: '', link: ''})
    const [retry, setRetry] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const searchCountryHandler = async (e: any) => {
        setCountry({countryName:e.target.value,countryId:-1})
        await searchCountry(e.target.value)
            .then((res) => setCountries(res?.result?.response))
    }
    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;

        setInfo({...info, ..._info})
    }

    const submitHandler = async (e: any) => {
        e.preventDefault()
        setIsSubmitting(true)
        const checkPoints = async () => {
            const KYC = async () => {
                await getSejamKYCToken()
                    .then(() => {
                        setIsSubmitting(false)
                        toast.success('کد برای شماره همراه شما ارسال شد')
                        setLevel(1)
                    })
                    .catch((err) => {
                        setIsSubmitting(false)
                        setRetry(!retry)
                        toast.error(`${err?.response?.data?.error?.message}`)
                    })
            }
            const status = async () => {
                await sejamStatus()
                    .then((res) => {
                        toast.success(`${sejamStatusEnums.find((item: any) => item.id === res?.result?.sejamStatus)?.title}`)
                        if (res?.result?.sejamStatus !== 7) {
                            KYC();
                        } else {
                            setRetry(!retry)
                            if (res?.result?.sejamStatus === 9) {
                                toast.success('قابلیت ثبت نام برای این اطلاعات امکان ندارد')
                            } else {
                                setError({
                                    message: 'عملیات ثبت نام شما در سامانه سجام انجام و یا کامل نشده است. <br> لطفا در سامانه سجام ثبت نام نموده، سپس مجددا اقدام نمایید.'
                                    , link: 'http://profilesejam.csdiran.ir/'
                                })
                            }
                        }
                    })
                    .catch((err) => {
                        setIsSubmitting(false)
                        toast.error(`${err?.response?.data?.error?.message}`)
                    })
            }
            await isSejami()
                .then(() => {
                    setIsSubmitting(false)
                    toast.success('شما سجامی هستید')
                    status();
                })
                .catch((err) => {
                    setIsSubmitting(false)
                    setRetry(!retry)
                    setError({
                        message: 'کاربر گرامی شما احراز هویت نشده اید، لطفا جهت احراز هویت به یکی از مراکز احراز هویت در آدرس زیر مراجعه نمایید',
                        link: 'https://www.sejam.ir/fa/AU'
                    })
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        }
        if (Object.values(info).every((item:any)=>item)){
            await addCustomerProfileInfo({
                ...info,
                personType: Number(info.personType),
                countryId: Number(info.countryId),
                captchaCode: info.uuid + '_' + info.captcha
            })
                .then(() => {
                    checkPoints()
                })
                .catch((err) => {
                    setRetry(!retry)
                    checkPoints()
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        }else{
            setIsSubmitting(false)
            toast.warning('همه ی ورودی ها الزامی می باشند.')
        }
    }

    useEffect(() => {
        const userInfo = async () => {
            await getCurrentUserInfo()
                .then((res) => {
                    Object.keys(res?.result).map((item: any) => {
                        if (item === 'phoneNumber') {
                            infoUpdate('mobileNumber', res?.result.phoneNumber)
                        } else if (info?.[item] !== undefined) {
                            infoUpdate(item, res?.result[item])
                        }
                    })
                })
        }
        if (typeof window !== "undefined") {
            // console.log(typeof window)
            // userInfo()
        }
    }, [])

    return (
        <div className={'bg-white rounded-md p-5'}>
                    <form className={'flex flex-col'} onSubmit={submitHandler}>
                        <div className={'grid md:grid-cols-2 grid-cols-1 gap-4'}>
                            <div className={'grid grid-cols-1 gap-4'}>
                                <div className="dropdown flex flex-col md:flex-row space-y-3 md:space-y-0 w-full ">
                                    <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                                        حقیقی یا حقوقی:
                                    </label>
                                    <div className={'relative w-full'}>
                                        <div tabIndex={1} className="input flex w-full items-center cursor-pointer">
                                            {personType.find((item: any) => item.id === info.personType)?.title}
                                            <ChevronDownIcon className={'h-5 w-5 mr-auto'}/>
                                        </div>
                                        <ul tabIndex={0}
                                            className="dropdown-content max-h-[200px] overflow-y-auto menu p-2 shadow-md bg-base-100 w-full"
                                            style={{flexWrap: 'unset'}}>
                                            {personType.map((item: any) => {
                                                return (
                                                    <li key={item.id} onClick={() => infoUpdate('personType', item.id)}
                                                        className={'odd:bg-gray-200 cursor-pointer hover:bg-gray-100 px-2 py-1'}>
                                                        {item.title}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="dropdown flex flex-col md:flex-row space-y-3 md:space-y-0 w-full ">
                                    <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                                        کشور:
                                    </label>
                                    <div className={'w-full relative'}>
                                        <label className="label flex p-0 min-w-[110px]">
                                            <input type="text" value={country.countryName} className="input text-black input-bordered w-full"
                                                   onChange={searchCountryHandler}/>
                                        </label>
                                        {countries.length ? <ul tabIndex={0}
                                                                className="dropdown-content max-h-[200px] overflow-y-auto menu p-2 shadow-md bg-base-100 w-full"
                                                                style={{flexWrap: 'unset'}}>
                                            {countries.map((item: countryType) => {
                                                return (
                                                    <li key={item.countryId} onClick={() => {
                                                        setCountry(item);
                                                        infoUpdate('countryId', item.countryId)
                                                    }}
                                                        className={'odd:bg-gray-200 cursor-pointer hover:bg-gray-100 px-2 py-1'}>
                                                        {item.countryName}
                                                    </li>
                                                )
                                            })}
                                        </ul> : null}
                                    </div>
                                </div>
                                    <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                                        <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                                            {info.personType === 1 ? (info.countryId === 1 ? 'کد ملی:' : (info.countryId ? 'شماره پاسپورت:' : 'کد ملی:')) : 'شناسه ملی:'}
                                        </label>
                                        <input className={`input`}
                                               dir={'ltr'}
                                               type={'number'}
                                               value={info.uniqueId}
                                               onChange={(e) => infoUpdate('uniqueId', e.target.value)}
                                        />
                                    </div>
                                    {(info.countryId !== 1 && info.countryId) ? <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                                        <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                                            کد اتباع خارجی:
                                        </label>
                                        <input className={`input`}
                                               dir={'ltr'}
                                               type={'number'}
                                               value={info.foriegnCSDCode}
                                               onChange={(e) => infoUpdate('foriegnCSDCode', e.target.value)}
                                        />
                                    </div> : null}
                                <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                                    <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                                        شماره همراه:
                                    </label>
                                    <input className={`input`}
                                           dir={'ltr'}
                                           type={'number'}
                                           value={info.mobileNumber}
                                           onChange={(e) => infoUpdate('mobileNumber', e.target.value)}
                                    />
                                </div>
                                <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                                    <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                                        ایمیل:
                                    </label>
                                    <input className={`input`}
                                           dir={'ltr'}
                                           type={'email'}
                                           value={info.email}
                                           onChange={(e) => infoUpdate('email', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={'mt-auto w-full '}>
                                <div className={'w-full md:w-[300px] mr-auto'}>
                                    <CaptchaComponentNotFormik infoUpdate={infoUpdate}
                                                               info={info}
                                                               name={'captcha'} retry={retry}/>
                                </div>
                            </div>
                        </div>
                        <div className={'flex md:flex-row flex-col md:space-y-0 space-y-2 items-center space-x-2 space-x-reverse mr-auto mt-5'}>
                            {error?.message ? <a className={`button bg-red-300 transition-all ${error?.message ? 'max-w-[1000px]':'w-0'}`} href={error.link}>
                                <div className={'flex items-center mx-auto '}>
                                    <span className={'ml-3 min-w-[24px]'}>
                                        <Image src={'/icons/sejam.svg'} alt={'sejam'} height={24} width={24}/>
                                    </span>
                                    {error.message}
                                    <span className={'border-b border-blue-500 mr-2'}>
                                        کلیک کنید
                                    </span>
                                </div>
                            </a>:null}
                            <button className={'button w-fit min-w-fit'} disabled={isSubmitting} type={'submit'}>
                                <div className={'flex items-center mx-auto '}>
                                    ثبت اطلاعات
                                    {isSubmitting && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>}
                                </div>
                            </button>
                        </div>
                    </form>
        </div>
    )
}