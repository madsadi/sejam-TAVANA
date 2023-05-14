import React, {useContext, useState} from "react";
import CaptchaComponent from "../common/component/CaptchaComponent";
import {Form, Formik} from "formik";
import {toast} from "react-toastify";
import InputComponent from "../common/component/InputComponent";
import {IdpContext} from "../../pages";
import {mobileEntry} from "../common/shcema/schema";
import useQuery from "../../hooks/useQuery";
import {IDP_URL} from "../../api/constants";


export default function MobileEntry() {
    const {setLevel, setMobile, mobile} = useContext<any>(IdpContext)
    const {fetchAsyncData} = useQuery({url:`${IDP_URL}/api/account/notifications/register/sms`})
    type initialType = {
        mobile: string,
        password: string,
        captcha: string,
        uuid: string
    }
    const initialValue = {
        mobile: mobile || '',
        password: '',
        captcha: '',
        uuid: ''
    }
    const [info, setInfo] = useState<initialType>(initialValue)
    const [retry, setRetry] = useState<boolean>(false)

    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;

        setInfo({...info, ..._info})
    }


    const submitHandler = async (v: any) => {
        await fetchAsyncData({phoneNumber: v.mobile, captchaToken: info.uuid + '_' + v.captcha})
            .then(() => {
                setMobile(v.mobile)
                setLevel('confirmation')
            })
            .catch((err) => {
                setRetry(!retry)
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    return (
        <>
            <h2>ثبت نام</h2>
            <Formik initialValues={initialValue} validationSchema={mobileEntry} validateOnChange={false} onSubmit={submitHandler}>
                {({isSubmitting}) => (
                    <Form className={'grow flex flex-col'}>
                        <InputComponent label={'شماره همراه'}
                                        name={'mobile'}
                                        type={'text'}/>
                        <span className={'mt-4'}>
                            <CaptchaComponent infoUpdate={infoUpdate}
                                              info={info}
                                              name={'captcha'}
                                              retry={retry}
                            />
                        </span>
                        <div className={'mt-auto text-center'}>
                            <button className={'button'} disabled={isSubmitting} type={'submit'}>
                                <div className={'flex items-center mx-auto w-fit'}>
                                    ثبت نام
                                    {isSubmitting && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>}
                                </div>
                            </button>
                            <button
                                className={'mt-4 hover-button mx-auto'}
                                onClick={() => setLevel('login')}>
                                <span>آیا در توانا حساب دارید؟</span>
                                <span className={'text-active'}> وارد شوید</span>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}