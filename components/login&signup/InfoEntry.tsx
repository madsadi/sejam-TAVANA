import React, {useContext} from "react";
import InputComponent from "../common/component/InputComponent";
import {toast} from "react-toastify";
import {Form, Formik} from "formik";
import {register} from "../../api/login-signup.api";
import {IdpContext} from "../../pages";
import {infoEntry} from "../common/shcema/schema";

const initialValue = {
    token: '',
    phoneNumber: '',
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    nationalId: '',
    isActive: true
}
export default function InfoEntry() {
    const {setLevel, mobile, token} = useContext<any>(IdpContext)

    const forum = [
        {
            title: 'نام کاربری',
            name: 'userName',
        },
        {
            title: 'کدملی فرد/شناسه ملی شرکت/کد پاسپورت',
            name: 'nationalId',
        },
        {
            title: 'نام',
            name: 'firstName',
        },
        {
            title: 'نام خانوادگی',
            name: 'lastName',
        },
        {
            title: 'ایمیل',
            name: 'email',
        },
        {
            title: 'رمز عبور',
            name: 'password',
            type: 'password',
        },
        {
            title: 'تایید رمز عبور',
            name: 'passwordConfirm',
            type: 'password',
        },
    ]

    const registerHandler = async (v: any) => {
        if (v?.["passwordConfirm"] === v.password) {
            await register({...v, phoneNumber: mobile, token: token})
                .then(() => {
                    toast.success('ثبت نام شما با موفقیت انجام شد.')
                    setLevel('login')
                })
                .catch((err) => {
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        } else {
            toast.warning(`رمز عبور یکسان نمی باشد`)
        }
    }

    return (
        <>
            <div className={'w-full text-center'}>
                <h2>
                    اطلاعات اولیه
                </h2>
            </div>
            <Formik initialValues={initialValue} validationSchema={infoEntry} validateOnBlur={false} onSubmit={registerHandler}>
                {({isSubmitting}) => (
                    <Form className={'grow flex flex-col'}>
                        <div className={'relative grow overflow-y-auto custom-scrollbar'}>
                            <div className={'absolute h-full w-full space-y-3'}>
                                {
                                    forum.map((field: any) => {
                                        return (
                                            <InputComponent key={field.name}
                                                            label={field.title}
                                                            name={field.name}
                                                            type={field?.type}
                                                            placeholder={field?.placeholder}
                                            />
                                        )
                                    })
                                }
                                <div className="space-y-6 text-sm">
                                    <p>رمز عبور باید شرایط زیر را داشته باشد:</p>
                                    <ul className={'list-disc pr-10 text-justify text-center'}>
                                        <li>
                                            حداقل 8 کاراکتر باشد.
                                        </li>
                                        <li>
                                            ترکیبی از حروف کوچک و بزرگ باشد.
                                        </li>
                                        <li>
                                            شامل اعداد باشد.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={'mt-auto text-center'}>
                            <button className={'button mt-10'}
                                    type={'submit'}
                                    disabled={isSubmitting}
                            >
                                <div className={'flex items-center mx-auto w-fit'}>
                                    تایید
                                    {isSubmitting && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>}
                                </div>
                            </button>
                            <button className={'hover-button mx-auto mt-4'} onClick={() => setLevel('mobileEntry')}>
                                برگشت به صفحه اصلی
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}