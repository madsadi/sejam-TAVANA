import React, { useEffect, useState } from "react";
import useMutation from "../../hooks/useMutation";
import { useSWRConfig } from "swr";
import { IDP_URL } from "../../api/constants";
import { toast } from "react-toastify";
import Modal from "../common/component/modal";
import InputComponent from "../common/component/input-generator";
import { Form, Formik } from "formik";

const userInputs = [
    { title: 'firstName', name: 'نام', type: 'input' },
    { title: 'lastName', name: 'نام خانوادگی', type: 'input' },
    { title: 'nationalId', name: 'کدملی', type: 'input', valueType: 'number' },
    { title: 'email', name: 'ایمیل', type: 'input' },
]

export const EditInfoModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
    const { cache, mutate: swrMutate } = useSWRConfig()
    let data: any = cache.get(`${IDP_URL}/api/users/GetCurrentUserInfo`)?.result

    const { mutate } = useMutation({ url: `${IDP_URL}/api/account`, method: 'PUT' })
    const [query, setQuery] = useState<any>({})
    const submitHandler = async (v: any) => {
        await mutate(v, {}, { 'withCredentials': true })
            .then(() => {
                swrMutate(`${IDP_URL}/api/users/GetCurrentUserInfo`)
                toast.success('با موفقیت ویرایش شد')
                setOpen(false)
            })
            .catch((err) => toast.error(`${err?.response?.data?.error?.message || 'ناموفق'}`))
    }

    useEffect(() => {
        if (data) {
            let _query: any = {}
            Object.keys(data)?.map((item: string) => {
                if (!['ip', 'isSimoultaneousLogin', 'message', 'twoFactorEnabled'].includes(item)) {
                    _query[item] = data[item]
                }
            })
            setQuery(_query)
        }
    }, [data])

    return (
        <Modal title={'ویرایش حساب کاربری'} setOpen={setOpen}
            open={open}>
            <div className="field mt-4">
                <Formik initialValues={query} validateOnChange={false}
                    onSubmit={submitHandler}>
                    {({ isSubmitting }) => (
                        <Form className={'justify-end space-y-10 grow flex flex-col'}>
                            <div className="grid grid-cols-2 gap-4">
                                {
                                    userInputs.map((item: any) => {
                                        return <InputComponent key={item.title}
                                            name={item.title}
                                            label={item.name}
                                            type={'text'}
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
            </div>
        </Modal>
    )
}