import React, {useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/20/solid";
import {useField} from "formik";
import {searchCountry} from "../../../api/sejam-info.api";
import {countryType} from "../../main/sejam-info/types";
import {personType} from "../enums";

const InputComponent: React.FC<any> = ({label, type, ...props}) => {
    const [field, meta] = useField(props)
    const [showPass, setShowPass] = useState<boolean>(false)
    const [country, setCountry] = useState<countryType>({countryName: 'کشور', countryId: 0})
    const [countries, setCountries] = useState<countryType[]>([])

    const searchCountryHandler = async (e: any) => {
        await searchCountry(e.target.value)
            .then((res) => setCountries(res?.result?.response))
    }

    if (type === 'password') {
        return (
            <div>
                <label className={'flex items-center mb-1'}>
                    {label}
                    {meta.error && <div className={'text-red-300 text-sm mr-1'}>{meta.error}</div>}
                </label>
                <div className={'relative'}>
                    <input className={`input text-left ${meta.touched && meta.error ? 'border-red-300' : ''}`}
                           dir={'ltr'}
                           {...props}
                           {...field}
                           type={showPass ? 'text' : 'password'}
                    />
                    {showPass ?
                        <EyeSlashIcon className={'absolute h-5 w-5 right-3 top-1/2 -translate-y-1/2 text-black'}
                                      role={'button'} onClick={() => setShowPass(false)}/> :
                        <EyeIcon className={'absolute h-5 w-5 right-3 top-1/2 -translate-y-1/2 text-black'}
                                 role={'button'} onClick={() => setShowPass(true)}/>}
                </div>
            </div>
        )

    } else if (type === 'dropdown') {
        return (
            <div className="dropdown">
                <label className={'flex items-center mb-1'}>
                    {label}
                    {meta.error && <div className={'text-red-300 text-sm mr-1'}>{meta.error}</div>}
                </label>
                <label className="label flex p-0">
                    <input type="text" className="input input-bordered w-full max-w-xs"
                           onChange={searchCountryHandler}/>
                    <div tabIndex={1} className="btn">{country.countryName}</div>
                </label>
                {countries.length ? <ul tabIndex={0}
                                        className="dropdown-content max-h-[200px] overflow-y-auto menu p-2 shadow-md bg-base-100 w-full"
                                        style={{flexWrap: 'unset'}}>
                    {personType.map((item: any) => {
                        return (
                            <li key={item.id}
                                className={'odd:bg-gray-200 cursor-pointer hover:bg-gray-100 px-2 py-1'}>
                                {item.title}
                            </li>
                        )
                    })}
                </ul> : null}
            </div>
        )
    } else {
        return (
            <div>
                <label className={'flex items-center mb-1'}>
                    {label}
                    {meta.error && <div className={'text-red-300 text-sm mr-1'}>{meta.error}</div>}
                </label>
                <input className={`input ${meta.touched && meta.error ? 'border-red-300' : ''}`}
                       dir={props.name === 'mobile' ? 'ltr' : ''}
                       type={type}
                       {...props}
                       {...field}
                />
            </div>
        )

    }
}

export default InputComponent;