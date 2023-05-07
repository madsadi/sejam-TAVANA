import {v4 as uuidv4} from "uuid";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import React, {useEffect} from "react";
import {useField} from "formik";

const CaptchaComponent: React.FC<any> = ({retry,info,infoUpdate,...props}) =>  {
    const [field,meta]=useField(props)

    useEffect(() => {
        infoUpdate('uuid', uuidv4())
    }, [retry])

    return (
        <div>
            <label className={'flex items-center mb-1'}>
                Captcha Code
                {meta.error && <div className={'text-red-300 text-sm ml-1'}>{meta.error}</div>}
            </label>
            <div className={'relative w-full border border-border rounded-xl overflow-hidden mb-3'}>
                <div className={'h-[60px] w-3/5'}>123654</div>
                <div role={'button'}
                     className={'absolute right-0 top-1/2 -translate-y-1/2 border-l border-border h-full px-4 hover:bg-border transition-all'}
                     onClick={() => infoUpdate('uuid', uuidv4())
                     }>
                    <ArrowPathIcon className={'h-full w-6 text-black'}/>
                </div>
            </div>
            <input className={`input ${meta.touched && meta.error ? 'border-red-300':''}`}
                   type={'number'}
                   dir={'ltr'}
                   {...props}
                   {...field}
            />
        </div>
    )
}

export default CaptchaComponent;