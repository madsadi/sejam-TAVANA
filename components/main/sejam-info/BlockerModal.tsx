import React, {useState} from "react";
import {toast} from "react-toastify";
import useMutation from "../../../hooks/useMutation";
import {SEJAM_URL} from "../../../api/constants";

export const BlockerModal = () => {
    const [blockerModal, setBlockerModal] = useState<boolean>(true)
    const [info, setInfo] = useState<any>({uniqueId: '', agentUniqueId: ''})
    const {mutate: updateAgentInfo} = useMutation({url: `${SEJAM_URL}/api/request/UpdateAgentInfo`})

    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;
        setInfo({...info, ..._info})
    }
    const updateAgent = async () => {
        await updateAgentInfo(info)
            .then(() => setBlockerModal(false))
            .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
    }

    return (
        <>
            {blockerModal ? <div className="fixed flex flex-col inset-0 bg-gray-800 backdrop-blur-sm bg-opacity-50 transition-opacity z-10">
                <div
                    className={`relative transform rounded-lg shadow-xl transition-all max-w-3xl sm:w-full bg-white m-auto`}>
                    <div className="px-4 py-2">
                        <div className="text-center">
                            <h4 className="text-md font-medium">
                                اطلاعات تکمیلی وکیل
                            </h4>
                        </div>
                    </div>
                    <div className={'p-3'}>
                        <div className={'mt-5'}>
                            <p className={'text-red-400'}>کد ملی وکیل با اطلاعات دریافت شده از سجام تطابق ندارد.</p>
                            <p className={'my-1 '}>برای ادامه روند ثبت نام اطلاعات زیر را اصلاح نموده.</p>
                            <div className={'grid md:grid-cols-3 grid-cols-2 gap-3 mt-5'}>
                                <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                                    <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[90px]'}>
                                        کد ملی وکیل:
                                    </label>
                                    <input className={`input grow`}
                                           dir={'ltr'}
                                           value={info.agentUniqueId}
                                           onChange={(e) => infoUpdate('agentUniqueId', e.target.value)}
                                    />
                                </div>
                                <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                                    <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[60px]'}>
                                        کد ملی :
                                    </label>
                                    <input className={`input grow`}
                                           dir={'ltr'}
                                           value={info.uniqueId}
                                           onChange={(e) => infoUpdate('uniqueId', e.target.value)}
                                    />
                                </div>
                                <button className={'button w-fit px-5 mr-auto'} type={'button'} onClick={updateAgent}>
                                    ویرایش
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:null}
        </>
    )
}