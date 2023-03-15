import React, {useContext, useEffect, useState} from "react";
import {profileSetter} from "../../common/shcema/schema";
import {Form, Formik} from "formik";
import CaptchaComponent from "../../common/component/CaptchaComponent";
import {addCustomerProfileInfo, getSejamKYCToken, isSejami, sejamStatus} from "../../../api/ProfileSetter.api";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";
import {personType, sejamStatusEnums} from "../../common/enums";
import {countryType} from "../sejam-info/types";
import {searchCountry} from "../../../api/sejam-info.api";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {getCurruntUserInfo} from "../../../api/login-signup.api";
import Image from 'next/image';

type initialType = {
    mobileNumber: string,
    uniqueId: string,
    email: string,
    personType: any,
    countryId: any,
    foriegnCSDCode: string,
    captcha: string,
    uuid: string
}
const initialValue = {
    mobileNumber: '',
    uniqueId: '',
    email: '',
    personType: '',
    countryId: 1,
    foriegnCSDCode: '',
    captcha: '',
    uuid: ''
}

export default function ProfileSetter() {
    const {setLevel} = useContext<any>(SejamContext)
    const [info, setInfo] = useState<initialType | any>(initialValue)
    const [country, setCountry] = useState<countryType>({countryName: 'ایران', countryId: 1})
    const [countries, setCountries] = useState<countryType[]>([])
    const [error, setError] = useState<{ message: string, link: string }>({message: '', link: ''})

    const searchCountryHandler = async (e: any) => {
        await searchCountry(e.target.value)
            .then((res) => setCountries(res?.result?.response))
    }
    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;

        setInfo({...info, ..._info})
    }

    const submitHandler = async (v: any) => {
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
                        if (res?.result?.sejamStatus !== 7) {
                            KYC();
                        } else {
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
                        message: 'کاربر گرامی شما احراز هویت نشده اید، لطفا جهت احراز هویت به یکی از مراکز احراز هویت در آدرس زیر مراجعه نمایید',
                        link: 'https://www.sejam.ir/fa/AU'
                    })
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        }
        await addCustomerProfileInfo({
            ...v,
            personType: Number(v.personType),
            countryId: Number(v.countryId),
            captchaCode: info.uuid + '_' + v.captcha
        })
            .then(() => {
                checkPoints()
            })
            .catch((err) => {
                checkPoints()
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    useEffect(() => {
        const userInfo = async () => {
            await getCurruntUserInfo()
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
        userInfo()
    }, [])

    return (
        <div className={'bg-white p-5 rounded-md'}>
            <Formik initialValues={initialValue} validationSchema={profileSetter} onSubmit={submitHandler}>
                {({isSubmitting}) => (
                    <Form className={'flex flex-col'}>
                        <div className={'grid sm:grid-cols-3 grid-cols-1 gap-4'}>
                            <div className="dropdown w-full">
                                <label className={'flex items-center mb-1'}>
                                    حقیقی یا حقوقی
                                </label>
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
                            <div className="dropdown">
                                <label className={'flex items-center mb-1'}>
                                    کشور
                                </label>
                                <label className="label flex p-0">
                                    <input type="text" className="input input-bordered w-full max-w-xs"
                                           onChange={searchCountryHandler}/>
                                    <div tabIndex={1} className="btn">{country.countryName}</div>
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
                            <div>
                                <label className={'flex items-center mb-1'}>
                                    شماره همراه
                                </label>
                                <input className={`input`}
                                       dir={'ltr'}
                                       type={'number'}
                                       onChange={(e) => infoUpdate('mobileNumber', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className={'flex items-center mb-1'}>
                                    {info.personType === 1 ? (info.countryId === '1' ? 'کد ملی' : (info.countryId ? 'شماره پاسپورت' : 'کد ملی')) : 'شناسه ملی'}
                                </label>
                                <input className={`input`}
                                       dir={'ltr'}
                                       type={'number'}
                                       onChange={(e) => infoUpdate('uniqueId', e.target.value)}
                                />
                            </div>
                            {(info.countryId !== 1 && info.countryId) ? <div>
                                <label className={'flex items-center mb-1'}>
                                    کد اتباع خارجی
                                </label>
                                <input className={`input`}
                                       dir={'ltr'}
                                       type={'number'}
                                       onChange={(e) => infoUpdate('foriegnCSDCode', e.target.value)}
                                />
                            </div> : null}
                            <div>
                                <label className={'flex items-center mb-1'}>
                                    ایمیل
                                </label>
                                <input className={`input`}
                                       dir={'ltr'}
                                       type={'email'}
                                       onChange={(e) => infoUpdate('email', e.target.value)}
                                />
                            </div>
                            <span>
                                <CaptchaComponent infoUpdate={infoUpdate}
                                                  info={info}
                                                  name={'captcha'}/>
                            </span>
                        </div>
                        <div className={'flex items-center space-x-2 space-x-reverse mr-auto mt-5'}>
                            {error?.message ? <a className={'button bg-red-500 w-fit'} href={error.link}>
                                <div className={'flex items-center mx-auto '}>
                                    <span className={'h-[24px]'}>
                                        <Image src={'/icons/sejam.svg'} alt={'sejam'} height={24} width={24}/>
                                    </span>
                                    {error.message}
                                </div>
                            </a>:null}
                            <button className={'button w-fit'} disabled={isSubmitting} type={'submit'}>
                                <div className={'flex items-center mx-auto '}>
                                    ثبت اطلاعات
                                    {isSubmitting && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>}
                                </div>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}