import {v4 as uuidv4} from "uuid";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import React, {useEffect, useState} from "react";
import {useField} from "formik";
import {CAPTCHA_URL} from "../../../api/constants";
import useQuery from "../../../hooks/useQuery";

const CaptchaComponent: React.FC<any> = ({retry,info,infoUpdate,...props}) =>  {
    const {fetchAsyncData} = useQuery({url:`${CAPTCHA_URL}/api/create`})

    const [field,meta]=useField(props)
    const [generatedCaptcha, setGeneratedCaptcha] = useState<any>(null);

    const captcha = async (uuid: string) => {
        await fetchAsyncData({id:uuid},'','blob')
            .then((response) => setGeneratedCaptcha(URL.createObjectURL(response?.data)))
    }

    useEffect(() => {
        infoUpdate('uuid', uuidv4())
    }, [retry])

    useEffect(() => {
        if (info.uuid) {
            captcha(info.uuid)
        }
    }, [info.uuid])

    return (
        <div>
            <label className={'flex items-center mb-1'}>
                کد امنیتی
                {meta.error && <div className={'text-red-300 text-sm mr-1'}>{meta.error}</div>}
            </label>
            <div className={'h-[54px] relative bg-inputbg flex'}>
                <input className={`input pl-[182px] grow ${meta.touched && meta.error ? 'border-red-300':''}`}
                       type={'number'}
                       dir={'ltr'}
                       {...props}
                       {...field}
                />
                <div role={'button'}
                     className={'flex w-fit absolute left-0 before:block before:absolute before:w-0.5 before:right-0 before:bg-black/70 before:h-4/5 before:top-1/2 before:-translate-y-1/2 h-full px-4 hover:bg-border transition-all'}
                     onClick={() => infoUpdate('uuid', uuidv4())
                     }>
                    <div className={'overflow-hidden w-fit p-1 pl-5'}>
                        <img className={'h-full w-[100px] bg-contain'} src={generatedCaptcha}/>
                    </div>
                    <ArrowPathIcon className={'h-full w-6 text-black'}/>
                </div>

            </div>
        </div>
    )
}

export default CaptchaComponent;