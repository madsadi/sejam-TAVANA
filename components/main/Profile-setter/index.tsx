import React, {Fragment, useContext, useEffect, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";
import {personType} from "../../common/enums";
import {countryType} from "../sejam-info/types";
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import CaptchaComponentNotFormik from "../../common/component/CaptchaComponentNotFormik";
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon} from '@heroicons/react/20/solid'
import {countryMock} from "../../mock/Mock";
import { useFuzzy } from "react-use-fuzzy";
import {requestMock} from "../../common/functions";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type initialType = {
    hasAgent: boolean,
    personType: any,
    countryId: any,
    captcha: string,
    uniqueId:string
}
const initialValue = {
    hasAgent: false,
    personType: null,
    countryId: null,
    captcha: '',
    uniqueId:''
}

export default function ProfileSetter({regInfo}: { regInfo: any }) {
    const {setLevel} = useContext<any>(SejamContext)
    const [info, setInfo] = useState<initialType | any>(initialValue)
    const [country, setCountry] = useState<countryType>({countryName: '', countryId: null})
    const [retry, setRetry] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [uuid, setUuid] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const {result, keyword, search} = useFuzzy<any>(countryMock, {
        keys: ['countryName'],
    });

    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;
        setInfo({...info, ..._info})
    }
    const returnCondition = (regInfo: any) => {
        if (((regInfo.hasAgent && regInfo?.agentUniqueId) || (!regInfo.hasAgent && !regInfo?.agentUniqueId)) && regInfo.uniqueId && regInfo.personType && regInfo.countryId) {
            return true
        } else {
            return false
        }
    }

    const submitHandler = async (e: any) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (returnCondition(info)) {
            await requestMock()
                .then(() => {
                    setLevel(2)
                })
                .catch((err) => {
                    setIsSubmitting(false)
                    setRetry(!retry)
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        } else {
            setIsSubmitting(false)
            toast.warning('All fields are required')
        }
    }

    useEffect(()=>{
        if (!info.hasAgent){
            infoUpdate('agentUniqueId','')
        }
    },[info.hasAgent])

    return (
        <div className={'bg-white/50 rounded-md p-5 backdrop-blur-md'}>
            <form className={'flex flex-col'} onSubmit={submitHandler}>
                <p className={'mb-5'}>Please complete these information</p>
                <div className={'grid md:grid-cols-2 grid-cols-1 gap-4'}>
                    <div className={'grid grid-cols-1 gap-4'}>
                        <div className="flex items-center">
                            <label htmlFor="confirm">Are you signing for another person?</label>
                            <div className={'relative w-[100px] flex bg-white p-1 rounded-full h-full border-2 border-white shadow-[0_0_0_1px_#eee] ml-2 overflow-hidden'}>
                                <div className={`bg-tavanaGreen rounded-full w-1/2 h-[90%] z-0 absolute right-0 top-1/2 -translate-y-1/2 transition-all ${info.hasAgent ? '-translate-x-full':'translate-x-0'}`}/>
                                <button type={'button'} className={`grow text-center z-[1] ${info.hasAgent ? 'text-white':''}`} onClick={()=>infoUpdate('hasAgent',true)}>
                                    yes
                                </button>
                                <button type={'button'} className={`grow text-center z-[1] pr-1 ${!info.hasAgent ? 'text-white':''}`} onClick={()=>infoUpdate('hasAgent',false)}>
                                    no
                                </button>
                            </div>
                        </div>
                        {info.hasAgent ? <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                            <label className={'flex items-center mb-1 mr-0 md:mr-3 min-w-[110px]'}>
                                Agent National ID:
                            </label>
                            <input className={`input`}
                                   dir={'ltr'}
                                   value={info.agentUniqueId}
                                   onChange={(e) => infoUpdate('agentUniqueId', e.target.value)}
                            />
                        </div> : null}
                        <Listbox value={info.personType} onChange={(e) => infoUpdate('personType', e)}>
                            {({open}) => (
                                <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full '}>
                                    <label className="flex items-center mb-1 mr-0 md:mr-3 min-w-[110px]">Private or Legal:</label>
                                    <div className="relative mt-2 grow">
                                        <Listbox.Button
                                            className="relative input w-full bg-white py-1.5 pl-3 pr-10">
                                          <span className="flex items-center">
                                            <span
                                                className="mr-3 block truncate">{personType.find((item: any) => item.id === info.personType)?.enTitle}</span>
                                          </span>
                                            <span
                                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
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
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-gray-200' : 'text-gray-900',
                                                                'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                                            )
                                                        }
                                                        value={person.id}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block')}
                                                                    >
                                                                        {person.enTitle}
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
                                                                                   aria-hidden="true"/>
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
                                    <label className="flex items-center mb-1 mr-0 md:mr-3 min-w-[110px]">Nationality:</label>
                                    <div className={'relative w-full bg-white grow '}>
                                        <input type="text" value={country.countryName}
                                               className="input text-black input-bordered w-full"
                                               onChange={(e) => {
                                                   setCountry({countryId:null,countryName:e.target.value})
                                                   search(e.target.value);
                                                   if (e.target.value){
                                                       setOpen(true)
                                                   }else{
                                                       setOpen(false)
                                                   }
                                               }}/>
                                        <span
                                            className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 ml-3 flex items-center pr-2">
                                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"
                                                                         aria-hidden="true"/>
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
                                                        {result.map((country) => (
                                                            <Listbox.Option
                                                                key={country.item?.countryId}
                                                                className={({active}) =>
                                                                    classNames(
                                                                        active ? 'bg-gray-200' : 'text-gray-900',
                                                                        'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                                                    )
                                                                }
                                                                value={country.item}
                                                            >
                                                                {({selected, active}) => (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block')}
                                                                        >
                                                                            {country.item?.countryName}
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
                                                                                       aria-hidden="true"/>
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
                        <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                            <label className={'flex items-center mb-1 mr-0 md:mr-3 min-w-[110px]'}>
                                {info.personType === 1 ? (info.countryId === 1 ? 'National ID:' : (info.countryId ? 'Passport NO.:' : 'National ID:')) : 'National ID:'}
                            </label>
                            <input className={`input`}
                                   dir={'ltr'}
                                   value={info.uniqueId}
                                   onChange={(e) => infoUpdate('uniqueId', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={'mt-auto w-full '}>
                        <div className={'w-full md:w-[300px] ml-auto'}>
                            <CaptchaComponentNotFormik setUuid={setUuid}
                                                       uuid={uuid}
                                                       info={info}
                                                       infoUpdate={infoUpdate}
                                                       name={'captcha'} retry={retry}/>
                        </div>
                    </div>
                </div>
                <div
                    className={'flex md:flex-row flex-col md:space-y-0 space-y-2 items-center space-x-2 space-x-reverse ml-auto mt-5'}>
                    <button className={'button w-fit min-w-fit'} disabled={isSubmitting} type={'submit'}>
                        <div className={'flex items-center mx-auto '}>
                            Confirm Information
                            {isSubmitting && <svg className="animate-spin h-5 w-5 ml-3 ..." viewBox="0 0 24 24">
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