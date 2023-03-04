import React, {useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/20/solid";
import {useField} from "formik";

const InputComponent: React.FC<any> = ({label,type,...props}) => {
    const [field,meta] = useField(props)
    const [showPass, setShowPass] = useState<boolean>(false)

    if (type === 'password') {
        return (
            <div>
                <label className={'flex items-center mb-1'}>
                    {label}
                    {meta.error && <div className={'text-red-300 text-sm mr-1'}>{meta.error}</div>}
                </label>
                <div className={'relative'}>
                    <input className={`input text-left ${meta.touched && meta.error ? 'border-red-300':''}`}
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

    } else {
        return (
            <div>
                <label className={'flex items-center mb-1'}>
                    {label}
                    {meta.error && <div className={'text-red-300 text-sm mr-1'}>{meta.error}</div>}
                </label>
                <input className={`input ${meta.touched && meta.error ? 'border-red-300':''}`}
                       dir={props.name === 'mobile' ? 'ltr':''}
                       type={type}
                       {...props}
                       {...field}
                />
            </div>
        )

    }
}

export default InputComponent;