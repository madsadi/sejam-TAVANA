import {v4 as uuidv4} from "uuid";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import React, {useEffect, useState} from "react";

const CaptchaComponentNotFormik: React.FC<any> = ({retry,uuid,setUuid,info,infoUpdate}) =>  {

    useEffect(() => {
        setUuid(uuidv4())
    }, [retry])

    return (
        <div>
            <label className={'flex items-center mb-1'}>
                Captcha Code
            </label>
            <div className={'relative w-full border border-border rounded-xl overflow-hidden mb-3'}>
                <div className={'h-[60px] w-3/5'}>123464</div>
                <div role={'button'}
                     className={'absolute right-0 top-1/2 -translate-y-1/2 border-l border-border h-full px-4 hover:bg-border transition-all'}
                     onClick={() => setUuid(uuidv4())
                     }>
                    <ArrowPathIcon className={'h-full w-6 text-black'}/>
                </div>
            </div>
            <input className={`input`}
                   type={'number'}
                   value={info.captcha}
                   onChange={(e)=>infoUpdate('captcha',e.target.value)}
            />
        </div>
    )
}

export default CaptchaComponentNotFormik;