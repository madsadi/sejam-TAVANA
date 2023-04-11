import {getSejamProfileSchema} from "../../common/shcema/schema";
import {Form, Formik} from "formik";
import InputComponent from "../../common/component/InputComponent";
import CaptchaComponent from "../../common/component/CaptchaComponent";
import React, {useContext, useState} from "react";
import {getSejamProfile} from "../../../api/GetSejamProfile.api";
import {toast} from "react-toastify";
import {SejamContext} from "../../../pages/main";

type initialType = {
    SejamToken: string,
    captcha: string,
    uuid: string
}
const initialValue = {
    SejamToken: '',
    captcha: '',
    uuid: '',
}
export default function GetSejamProfile() {
    const {setLevel} = useContext<any>(SejamContext)
    const [info, setInfo] = useState<initialType>(initialValue)
    const [retry, setRetry] = useState<boolean>(false)

    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;

        setInfo({...info, ..._info})
    }

    const submitHandler = async (v: initialType) => {
        await getSejamProfile({SejamToken: v.SejamToken, CaptchaCode: info.uuid + '_' + v.captcha})
            .then((res) => {
                setLevel(2)
            })
            .catch((err) => {
                setRetry(!retry)
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    return (
        <div className={'bg-white/50 backdrop-blur-md rounded-md p-5'}>
            <Formik initialValues={initialValue} validationSchema={getSejamProfileSchema} onSubmit={submitHandler}>
                {({isSubmitting}) => (
                    <Form className={'flex flex-col'}>
                        <div className={'md:w-1/2 md:mx-auto space-y-4'}>
                            <InputComponent
                                label={'کد ارسال شده'}
                                name={'SejamToken'}
                                type={'text'}/>
                            <div className={'mt-4'}>
                                <CaptchaComponent infoUpdate={infoUpdate}
                                                  info={info}
                                                  name={'captcha'} retry={retry}/>
                            </div>
                        </div>
                        <button className={'button w-fit mt-4 mr-auto'} disabled={isSubmitting} type={'submit'}>
                            <div className={'flex items-center mx-auto '}>
                                ادامه
                                {isSubmitting && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>}
                            </div>
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}