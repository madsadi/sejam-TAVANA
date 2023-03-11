import React, {useContext, useState} from "react";
import {profileSetter} from "../../common/shcema/schema";
import {Form, Formik} from "formik";
import InputComponent from "../../common/component/InputComponent";
import CaptchaComponent from "../../common/component/CaptchaComponent";
import {addCustomerProfileInfo, getSejamKYCToken, isSejami, sejamStatus} from "../../../api/ProfileSetter.api";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";
import {sejamStatusEnums} from "../../common/enums";

type initialType = {
    mobileNumber: string,
    uniqueId: string,
    email: string,
    personType: string,
    countryId: string,
    foriegnCSDCode: string,
    captcha: string,
    uuid: string
}
const initialValue = {
    mobileNumber: '',
    uniqueId: '',
    email: '',
    personType: '',
    countryId: '',
    foriegnCSDCode: '',
    captcha: '',
    uuid: ''
}

export default function ProfileSetter() {
    const {setLevel} = useContext<any>(SejamContext)
    const [info, setInfo] = useState<initialType>(initialValue)
    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;

        setInfo({...info, ..._info})
    }

    const forum = [
        {
            title: 'شماره همراه',
            name: 'mobileNumber',
            type: 'text'
        },
        {
            title: 'کد ملی',
            name: 'uniqueId',
            type: 'text'
        },
        {
            title: 'ایمیل',
            name: 'email',
            type: 'text'
        },
        {
            title: 'حقیقی یا حقوقی',
            name: 'personType',
            type: 'number'
        },
        {
            title: 'کشور',
            name: 'countryId',
            type: 'number'
        },
        {
            title: 'کد اتباع خارجی',
            name: 'foriegnCSDCode',
            type: 'number'
        }
    ]

    const submitHandler = async (v: any) => {
        const checkPoints = async ()=>{
            const KYC =async ()=>{
                await getSejamKYCToken()
                    .then(()=> {
                        toast.success('کد برای شماره همراه شما ارسال شد')
                        setLevel(0.5)
                    })
                    .catch((err)=> {
                        toast.error(`${err?.response?.data?.error?.message}`)
                    })
            }
            const status = async ()=>{
                await sejamStatus()
                    .then((res)=> {
                        toast.success(`${sejamStatusEnums.find((item:any)=>item.id === res?.result?.sejamStatus)?.title}`)
                        KYC();
                    })
                    .catch((err)=> {
                        toast.error(`${err?.response?.data?.error?.message}`)
                    })
            }
            await isSejami()
                .then(()=> {
                    toast.success('شما سجامی هستید')
                    status();
                })
                .catch((err)=> {
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        }
        await addCustomerProfileInfo({...v,personType:Number(v.personType),countryId:Number(v.countryId), captchaCode: info.uuid + '_' + v.captcha})
            .then(() => {
                checkPoints()
            })
            .catch((err) => {
                checkPoints()
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }
    return (
        <div className={'bg-white p-5'}>
            <Formik initialValues={initialValue} validationSchema={profileSetter} onSubmit={submitHandler}>
                {({isSubmitting}) => (
                    <Form className={'flex flex-col'}>
                        <div className={'grid sm:grid-cols-3 grid-cols-1 gap-4'}>
                            {
                                forum.map((item: any) => {
                                    return (
                                        <InputComponent key={item.title}
                                                        label={item.title}
                                                        name={item.name}
                                                        type={item.name}/>
                                    )
                                })
                            }
                            <span className={'mt-4'}>
                                <CaptchaComponent infoUpdate={infoUpdate}
                                                  info={info}
                                                  name={'captcha'}/>
                            </span>
                        </div>
                        <button className={'button w-fit mr-auto'} disabled={isSubmitting} type={'submit'}>
                            <div className={'flex items-center mx-auto '}>
                                ثبت اطلاعات
                                {isSubmitting && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
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