import React, { Fragment, useContext, useEffect, useState } from "react";
import { SejamContext } from "../../../pages/main";
import { toast } from "react-toastify";
import { personType } from "../../common/enums";
import { countryType } from "../sejam-info/types";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CaptchaComponentNotFormik from "../../common/component/CaptchaComponentNotFormik";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import useQuery from "../../../hooks/useQuery";
import { SEJAM_URL } from "../../../api/constants";
import useMutation from "../../../hooks/useMutation";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type initialType = {
    hasAgent: boolean,
    personType: any,
    countryId: any,
    captcha: string,
}
const initialValue = {
    hasAgent: false,
    personType: null,
    countryId: null,
    captcha: '',
}

export default function ProfileSetter() {
    const { fetchAsyncData: searchCountry } = useQuery({ url: `${SEJAM_URL}/api/request/SearchCountry` })
    const { mutate: addCustomer } = useMutation({ url: `${SEJAM_URL}/api/request/AddCustomerProfileInfo` })
    const { setLevel, registrationState, regInfo } = useContext<any>(SejamContext)
    const [info, setInfo] = useState<initialType | any>(initialValue)
    const [country, setCountry] = useState<countryType>({ countryName: '', countryId: null })
    const [countries, setCountries] = useState<countryType[]>([])
    const [retry, setRetry] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [uuid, setUuid] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const searchCountryHandler = async (e: any) => {
        setCountry({ countryName: e.target.value, countryId: -1 })
        await searchCountry({ CountryName: e.target.value })
            .then((res) => setCountries(res?.data.result?.response))
    }

    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;
        setInfo({ ...info, ..._info })
    }
    const returnCondition = (regInfo: any) => {
        if (((regInfo.hasAgent && regInfo?.agentUniqueId) || (!regInfo.hasAgent && !regInfo?.agentUniqueId)) && regInfo.personType && (regInfo.countryId === 1 || (regInfo.countryId !== 1 && regInfo.foriegnCSDCode))) {
            return true
        } else {
            return false
        }
    }
    const returnInitialCondition = (regInfo: any) => {
        if (regInfo.personType && regInfo.countryId && regInfo.registrationState <= 5) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (returnInitialCondition(regInfo)) {
            setLevel(0.5)
        }
    }, [regInfo])

    const submitHandler = async (e: any) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (returnCondition(info)) {
            await addCustomer({
                ...info,
                personType: Number(info.personType),
                countryId: Number(info.countryId),
                captchaCode: uuid + '_' + info.captcha,
                refCode: localStorage.getItem('RefCode') === 'null' ? null : localStorage.getItem('RefCode'),
                captcha: ''
            })
                .then(() => {
                    setLevel(0.5)
                    registrationState(false)
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

    useEffect(() => {
        if (!info.hasAgent) {
            infoUpdate('agentUniqueId', '')
        }
    }, [info.hasAgent])
    useEffect(() => {
        if (info.countryId === 1) {
            infoUpdate('foriegnCSDCode', '')
        }
    }, [info.countryId])

    return (
        <form className={'flex flex-col'} onSubmit={submitHandler}>
            <h5 className={'mb-5'}>اطلاعات زیر را جهت ایجاد پروفایل تکمیل کنید</h5>
            <div className={'grid md:grid-cols-2 grid-cols-1 gap-4'}>
                <div className={'grid grid-cols-1 gap-4'}>
                    <div className="flex items-center">
                        <label htmlFor="confirm">آیا فرد دیگری را ثبت نام می کنید؟</label>
                        <div className={'relative w-[100px] flex bg-white p-1 rounded-full h-full border-2 border-white shadow-[0_0_0_1px_#eee] mr-2 overflow-hidden'}>
                            <div className={`bg-tavanaPurple rounded-full w-1/2 h-[90%] z-0 absolute right-0 top-1/2 -translate-y-1/2 transition-all ${!info.hasAgent ? '-translate-x-full' : 'translate-x-0'}`} />
                            <button type={'button'} className={`grow text-center z-[1] ${info.hasAgent ? 'text-white' : ''}`} onClick={() => infoUpdate('hasAgent', true)}>
                                بله
                            </button>
                            <button type={'button'} className={`grow text-center z-[1] pr-1 ${!info.hasAgent ? 'text-white' : ''}`} onClick={() => infoUpdate('hasAgent', false)}>
                                خیر
                            </button>
                        </div>
                    </div>
                    {info.hasAgent ? <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                        <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                            کد ملی وکیل:
                        </label>
                        <input className={`input`}
                            dir={'ltr'}
                            value={info.agentUniqueId}
                            onChange={(e) => infoUpdate('agentUniqueId', e.target.value)}
                        />
                    </div> : null}
                    <Listbox value={info.personType} onChange={(e) => infoUpdate('personType', e)}>
                        {({ open }) => (
                            <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full '}>
                                <label className="flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]">حقیقی یا
                                    حقوقی:</label>
                                <div className="relative mt-2 grow">
                                    <Listbox.Button
                                        className="relative input w-full bg-white py-1.5 pr-3 pl-10">
                                        <span className="flex items-center">
                                            <span
                                                className="ml-3 block truncate">{personType.find((item: any) => item.id === info.personType)?.title}</span>
                                        </span>
                                        <span
                                            className="pointer-events-none absolute inset-y-0 left-0 mr-3 flex items-center pl-2">
                                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options
                                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {personType.map((person) => (
                                                <Listbox.Option
                                                    key={person.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-gray-200' : 'text-gray-900',
                                                            'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                                        )
                                                    }
                                                    value={person.id}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block')}
                                                                >
                                                                    {person.title}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? '' : '',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5"
                                                                        aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </div>
                        )}
                    </Listbox>
                    <Listbox value={info.countryId} onChange={(e) => {
                        infoUpdate('countryId', e.countryId)
                        setCountry(e)
                        setOpen(false)
                    }}>
                        <>
                            <div className="flex h-12 items-center">
                                <label className="flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]">تابعیت:</label>
                                <div className={'relative w-full bg-white grow '}>
                                    <input type="text" value={country.countryName}
                                        className="input text-black input-bordered w-full"
                                        onChange={(e) => {
                                            searchCountryHandler(e);
                                            setOpen(true)
                                        }} />
                                    <span
                                        className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 mr-3 flex items-center pl-2">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"
                                            aria-hidden="true" />
                                    </span>
                                    <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full '}>
                                        <div className="relative grow">
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options
                                                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {countries.map((country) => (
                                                        <Listbox.Option
                                                            key={country.countryId}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'bg-gray-200' : 'text-gray-900',
                                                                    'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                                                )
                                                            }
                                                            value={country}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block')}
                                                                        >
                                                                            {country.countryName}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? '' : '',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                            )}
                                                                        >
                                                                            <CheckIcon className="h-5 w-5"
                                                                                aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </Listbox>
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
                </div>
                <div className={'mt-auto w-full '}>
                    <div className={'w-full md:w-[300px] mr-auto'}>
                        <CaptchaComponentNotFormik setUuid={setUuid}
                            uuid={uuid}
                            info={info}
                            infoUpdate={infoUpdate}
                            name={'captcha'} retry={retry} />
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
    )
}