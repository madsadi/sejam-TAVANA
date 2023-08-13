import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { useSWRConfig } from "swr";
import { IDP_URL } from "../../api/constants";
import { toast } from "react-toastify";
import Modal from "../common/component/modal";
import InputComponent from "../common/component/input-generator";
import { Form, Formik } from "formik";
import { changeMobileSchema } from "../common/shcema/schema";

const form = [
    { "title": "newPhoneNumber", "name": "شماره همراه جدید", "type": "input" },
    { "title": "token", "name": "کد ارسال شده", "type": "input" }
]
export const ChangeMobileNumber = () => {
    const { mutate: swrMutate } = useSWRConfig()
    const { mutate } = useMutation({ url: `${IDP_URL}/api/account/change-phone-number` })
    const { fetchAsyncData } = useQuery({ url: `${IDP_URL}/api/account/notifications/change-phone-number/sms` })
    const [open, setOpen] = useState(false)

    const changeMobile = () => {
        fetchAsyncData()
            .then(() => setOpen(true))
            .catch((err) => toast.error(`${err?.response?.data?.error?.message || 'ناموفق'}`))
    }

    const submitHandler = (v: any) => {
        mutate({ newPhoneNumber: '0' + v?.newPhoneNumber, token: `${v?.token}` })
            .then(() => {
                swrMutate(`${IDP_URL}/api/users/GetCurrentUserInfo`)
                setOpen(false)
                toast.success('با موفقیت شماره تلفن همراه شما عوض شد.')
            })
            .catch((err) => toast.error(`${err?.response?.data?.error?.message || 'ناموفق'}`))
    }
    return (
        <>
            <div className={'ml-2 cursor-pointer'} onClick={changeMobile}>
                <PencilIcon className={'h-5 w-5'} />
            </div>
            <Modal title={'ویرایش تلفن همراه'} setOpen={setOpen}
                open={open}>
                <Formik initialValues={{}} validationSchema={changeMobileSchema} validateOnChange={false}
                    onSubmit={submitHandler}>
                    {({ isSubmitting }) => (
                        <Form className={'justify-end space-y-10 grow flex flex-col'}>
                            <div className={'grid grid-cols-2 gap-4'}>
                                {
                                    form.map((item: any) => {
                                        return <InputComponent key={item.title}
                                            label={item.name}
                                            name={item.title}
                                            type={'number'}
                                        />
                                    })
                                }
                            </div>
                            <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                                <button className="button bg-red-500"
                                    type={'button'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setOpen(false)
                                    }}>لغو
                                </button>
                                <button type={"submit"} className="button bg-lime-600">
                                    <div className={'flex items-center mx-auto w-fit'}>
                                        تایید
                                        {isSubmitting && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>}
                                    </div>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}