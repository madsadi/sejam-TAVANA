import React, {Dispatch, Fragment, useState} from "react";
import {accountNumber, bankAccount, cityType, countryType, provinceType} from "./types";
import {registerBankAccount, searchCity, searchCountry, searchProvince} from "../../../api/sejam-info.api";
import {accountTypeEnums, personType} from "../../common/enums";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {CheckIcon} from "@heroicons/react/20/solid";
import {toast} from "react-toastify";
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}
export default function AddAccountComponent({fetch,banks,setAddModal}:{fetch:Function,banks:accountNumber[],setAddModal:Dispatch<boolean>}){
    const [query,setQuery]=useState<bankAccount>({accountNumber:'',iban:'',type:-1,cityId:-1,isDefault:false})
    const [country,setCountry]=useState<countryType>({countryName:'',countryId:-1})
    const [countries,setCountries]=useState<countryType[]>([])
    const [province,setProvince]=useState<provinceType>({provinceId:-1,provinceName:''})
    const [provinces,setProvinces]=useState<provinceType[]>([])
    const [city,setCity]=useState<cityType>({cityId:-1,cityName:''})
    const [cities,setCities]=useState<cityType[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [openProv, setOpenProv] = useState<boolean>(false)
    const [openCity, setOpenCity] = useState<boolean>(false)

    const searchCountryHandler = async (e:any)=>{
        await searchCountry(e.target.value)
            .then((res)=>setCountries(res?.result?.response))
    }

    const searchProvinceHandler = async (e:any)=>{
        await searchProvince(country.countryId,e.target.value)
            .then((res)=>setProvinces(res?.result?.response))
    }

    const searchCityHandler = async (e:any)=>{
        await searchCity({CountryId:country.countryId, ProvinceId:province.provinceId,CityName:e.target.value})
            .then((res)=>setCities(res?.result?.response))
    }

    const queryUpdateHandler = (key:string,value:any)=>{
        let _query:bankAccount | any= {...query};
        _query[key] = value;
        setQuery(_query)
    }

    const submitHandler = async (e:any)=>{
        e.preventDefault()
        let restOfAccounts = banks.map((b:accountNumber)=>{
            return ({
                "accountNumber": b.accountNumber,
                "iban": b.sheba,
                "type": accountTypeEnums.find((item:any)=>item.enTitle===b.type)?.id,
                "cityId": b.branchCity.id,
                "isDefault": b.isDefault
            })
        })
        await registerBankAccount({bankAccounts:[...restOfAccounts,query]})
            .then((res)=> {
                fetch();
                setAddModal(false)
            })
            .catch((err)=>toast.error(err?.response?.data?.error?.message))
    }
    return(
        <form className={'grid grid-cols-2 gap-4'} onSubmit={submitHandler}>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">شماره حساب:</span>
                </label>
                <input type={'tel'} dir={'ltr'} pattern={"[0-9]*"} className="input input-bordered w-full max-w-xs" value={query.accountNumber} onChange={(e)=>queryUpdateHandler('accountNumber',e.target.value)}/>
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">شماره شبا:</span>
                </label>
                <div className={'relative w-full max-w-xs input-bordered'}>
                    <input type={'tel'} dir={'ltr'} pattern={"[0-9]*"}  className="input pl-12" value={query.iban} onChange={(e)=>queryUpdateHandler('iban',e.target.value)}/>
                    <div className={'absolute bg-gray-200 rounded-l left-0 top-0 h-full flex border-r border-border px-3 text-center font-bold z-10'}>
                        <div className={'m-auto'}>
                        IR
                        </div>
                    </div>
                </div>
            </div>
            <Listbox value={query.type} onChange={(e)=>queryUpdateHandler('type',e)}>
                    {({ open }) => (
                        <div className={'relative'}>
                    <label className={'mb-1'}>
                        <span className="label-text">نوع سپرده:</span>
                    </label>
                    <Listbox.Button className="relative input w-full bg-white py-1.5 pr-3 pl-10">
                                          <span className="flex items-center">
                                            <span className="ml-3 block truncate">{accountTypeEnums.find((item:any)=>item.id===query.type)?.faTitle}</span>
                                          </span>
                        <span className="pointer-events-none absolute inset-y-0 left-0 mr-3 flex items-center pl-2">
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
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {accountTypeEnums.map((acc) => (
                                <Listbox.Option
                                    key={acc.id}
                                    className={({ active }) =>
                                        classNames(
                                            active ? 'bg-gray-200' : 'text-gray-900',
                                            'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                        )
                                    }
                                    value={acc.id}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block')}
                                                                    >
                                                                        {acc.faTitle}
                                                                      </span>
                                            </div>

                                            {selected ? (
                                                <span
                                                    className={classNames(
                                                        active ? '' : '',
                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                      </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                        </div>
                        )}
                </Listbox>
            <Listbox value={country} onChange={(e)=> {
                setCountry(e)
                setOpen(false)
            }}>
                <>
                    <div>
                        <label className="mb-2 label-text">کشور:</label>
                        <div className={'relative w-full bg-white grow '}>
                            <input type="text" value={country.countryName}
                                   className="input text-black input-bordered w-full"
                                   onChange={(e)=> {
                                       setCountry({countryName:e.target.value,countryId:-1})
                                       searchCountryHandler(e);
                                       setOpen(true)
                                   }}/>
                            <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 mr-3 flex items-center pl-2">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                            <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full '} >
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
                                                    className={({active}) =>
                                                        classNames(
                                                            active ? 'bg-gray-200' : 'text-gray-900',
                                                            'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                                        )
                                                    }
                                                    value={country}
                                                >
                                                    {({selected, active}) => (
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
            <Listbox value={province} onChange={(e)=> {
                setProvince(e)
                setOpenProv(false)
            }}>
                <>
                    <div>
                        <label className="mb-2 label-text">استان:</label>
                        <div className={'relative w-full bg-white grow '}>
                            <input type="text" value={province.provinceName}
                                   className="input text-black input-bordered w-full"
                                   onChange={(e)=> {
                                       setProvince({...province,provinceName:e.target.value,provinceId:-1})
                                       searchProvinceHandler(e);
                                       setOpenProv(true)
                                   }}/>
                            <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 mr-3 flex items-center pl-2">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                            <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full '} >
                                {province.provinceName ? <div className="relative grow">
                                    <Transition
                                        show={openProv}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options
                                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {(provinces && country.countryId>=0) ? provinces.map((prov: provinceType) => (
                                                <Listbox.Option
                                                    key={prov.provinceId}
                                                    className={({active}) =>
                                                        classNames(
                                                            active ? 'bg-gray-200' : 'text-gray-900',
                                                            'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                                        )
                                                    }
                                                    value={prov}
                                                >
                                                    {({selected, active}) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block')}
                                                                    >
                                                                        {prov.provinceName}
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
                                            )):<span className={'p-2'}>لطفا کشور را انتخاب کنید</span>}
                                        </Listbox.Options>
                                    </Transition>
                                </div>:null}
                            </div>
                        </div>
                    </div>
                </>
            </Listbox>
            <Listbox value={city} onChange={(e)=> {
                setCity(e)
                setOpenCity(false)
                queryUpdateHandler('cityId',e.cityId)
            }}>
                <>
                    <div>
                        <label className="mb-2 label-text">شهر:</label>
                        <div className={'relative w-full bg-white grow '}>
                            <input type="text" value={city.cityName}
                                   className="input text-black input-bordered w-full"
                                   onChange={(e)=> {
                                       setCity({cityName:e.target.value,cityId:-1})
                                       searchCityHandler(e);
                                       setOpenCity(true)
                                   }}/>
                            <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 mr-3 flex items-center pl-2">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                            <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full '} >
                                {city.cityName ? <div className="relative grow">
                                    <Transition
                                        show={openCity}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options
                                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {(cities && province.provinceId >= 0) ? cities.map((c: cityType) => (
                                                <Listbox.Option
                                                    key={c.cityId}
                                                    className={({active}) =>
                                                        classNames(
                                                            active ? 'bg-gray-200' : 'text-gray-900',
                                                            'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                                        )
                                                    }
                                                    value={c}
                                                >
                                                    {({selected, active}) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block')}
                                                                    >
                                                                        {c.cityName}
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
                                            )) : <div className={'p-2'}>لطفا استان را انتخاب کنید</div>}
                                        </Listbox.Options>
                                    </Transition>
                                </div>:null}
                            </div>
                        </div>
                    </div>
                </>
            </Listbox>
            <div className="flex items-center ">
                <input className="ml-2 checkbox" checked={query.isDefault} onChange={(e)=>queryUpdateHandler('isDefault',e.target.checked)} type="checkbox" dir={'ltr'} name="confirm"/>
                <label htmlFor="confirm">حساب پیش فرض</label>
            </div>
            <button className={'button w-fit mr-auto'} type={'submit'}>
                تایید
            </button>
        </form>
    )
}