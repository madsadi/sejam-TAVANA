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
}
const initialValue = {
    mobileNumber: '',
    uniqueId: '',
    email: '',
    personType: null,
    countryId: null,
    captcha: '',
}

export default function ProfileSetter({regInfo}: { regInfo: any }) {
    const {setLevel} = useContext<any>(SejamContext)
    const [info, setInfo] = useState<initialType | any>(initialValue)
    const [country, setCountry] = useState<countryType>({countryName: '', countryId: null})
    const [countries, setCountries] = useState<countryType[]>([])
    const [retry, setRetry] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [uuid, setUuid] = useState<string>('')

    const searchCountryHandler = async (e: any) => {
        setCountry({countryName: e.target.value, countryId: -1})
        await searchCountry(e.target.value)
            .then((res) => setCountries(res?.result?.response))
    }
    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;
        setInfo({...info, ..._info})
    }
    const returnCondition = (regInfo:any)=>{
        if (regInfo.uniqueId && regInfo.mobileNumber && regInfo.email && regInfo.personType && regInfo.countryId && regInfo.registrationState<=5){
            return true
        }else{
            return false
        }
    }
    useEffect(() => {
        const userInfo = async () => {
            const countries = await searchCountry('')
            await getCurrentUserInfo()
                .then((res) => {
                    let _info = {mobileNumber: '', uniqueId: '', email: ''}
                    Object.keys(res?.result).map((item: any) => {
                        if (item === 'phoneNumber') {
                            _info['mobileNumber'] = res?.result.phoneNumber
                        } else if (item === 'nationalId') {
                            _info['uniqueId'] = res?.result.nationalId
                        } else if (item === 'email') {
                            _info['email'] = res?.result.email
                        }
                    })
                    setInfo({...info, ..._info, countryId: regInfo?.countryId, personType: regInfo?.personType})
                    setCountry({
                        countryName: countries.result?.response?.find((item: any) => item.countryId === regInfo?.countryId)?.countryName,
                        countryId: regInfo?.countryId
                    })
                })
        }
        if (returnCondition(regInfo)){
            setLevel(0.5)
        }else{
            userInfo()
        }
    }, [regInfo])

    const submitHandler = async (e: any) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (Object.values(info).every((item: any) => item)) {
            await addCustomerProfileInfo({
                ...info,
                personType: Number(info.personType),
                countryId: Number(info.countryId),
                captchaCode: uuid + '_' + info.captcha
            })
                .then(() => {
                    setLevel(0.5)
                })
                .catch((err) => {
                    setIsSubmitting(false)
                    setRetry(!retry)
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        } else {
            setIsSubmitting(false)
            toast.warning('همه ی ورودی ها الزامی می باشند.')
        }
    }

    return (
        <div className={'bg-white rounded-md p-5'}>
            <form className={'flex flex-col'} onSubmit={submitHandler}>
                <p className={'mb-5'}>اطلاعات زیر را جهت ایجاد پروفایل تکمیل کنید</p>
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
                                    <input type="text" value={country.countryName}
                                           className="input text-black input-bordered w-full"
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
                                   value={info.uniqueId}
                                   onChange={(e) => infoUpdate('uniqueId', e.target.value)}
                            />
                        </div>
                        {(info.countryId !== 1 && info.countryId) ?
                            <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
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
                                   name={'mobile'}
                                   dir={'ltr'}
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
                            <CaptchaComponentNotFormik setUuid={setUuid}
                                                       uuid={uuid}
                                                       info={info}
                                                       infoUpdate={infoUpdate}
                                                       name={'captcha'} retry={retry}/>
                        </div>
                    </div>
                </div>
                <div
                    className={'flex md:flex-row flex-col md:space-y-0 space-y-2 items-center space-x-2 space-x-reverse mr-auto mt-5'}>
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