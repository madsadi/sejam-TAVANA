import {v4 as uuidv4} from "uuid";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import React, {useEffect, useState} from "react";
import useQuery from "../../../hooks/useQuery";
import {CAPTCHA_URL} from "../../../api/constants";

const CaptchaComponentNotFormik: React.FC<any> = ({retry,uuid,setUuid,info,infoUpdate}) =>  {
    const {fetchAsyncData} = useQuery({url:`${CAPTCHA_URL}/api/create`})
    const [generatedCaptcha, setGeneratedCaptcha] = useState<any>(null);

    const captcha = async (uuid: string) => {
        await fetchAsyncData({id:uuid},'','blob')
            .then((response) => setGeneratedCaptcha(URL.createObjectURL(response.data)))
    }

    useEffect(() => {
        setUuid(uuidv4())
    }, [retry])

    useEffect(() => {
        if (uuid) {
            captcha(uuid)
        }
    }, [uuid])

    return (
        <div>
            <label className={'flex items-center mb-1'}>
                کد امنیتی
            </label>
            <div className={'relative w-full border border-border rounded bg-white overflow-hidden mb-3'}>
                <img className={'h-[60px] w-3/5 bg-contain'} src={generatedCaptcha}/>
                <div role={'button'}
                     className={'absolute left-0 top-1/2 -translate-y-1/2 border-r border-border h-full px-4 hover:bg-border transition-all'}
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