import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { IDP_URL } from "../../api/constants";
import useMutation from "../../hooks/useMutation";
import InputComponent from "../common/component/input-generator";
import Modal from "../common/component/modal-";
import { changePasswordSchema } from "../common/shcema/schema";

const userInputs = [
    { title: 'currentPassword', name: 'رمز عبور', type: 'password' },
    { title: 'newPassword', name: 'رمز عبور جدید', type: 'password' },
]

export const PasswordModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
    const { mutate } = useMutation({ url: `${IDP_URL}/api/account/change-password` })

    const submitHandler = async (v: any) => {
        await mutate(v)
            .then(() => {
                toast.success('رمز عبور با موفقیت عوض شد');
                setOpen(false)
            })
            .catch((err) => toast.error(`${err?.response?.data?.error?.message || 'ناموفق'}`))
    }
    return (
        <Modal title={'تغییر رمز عبور'} setOpen={setOpen}
            open={open}>
            <Formik initialValues={{}} validationSchema={changePasswordSchema} validateOnChange={false}
                onSubmit={submitHandler}>
                {({ isSubmitting }) => (
                    <Form className={'justify-end space-y-10 grow flex flex-col'}>
                        <div className={'grid grid-cols-2 gap-4'}>
                            {
                                userInputs.map((item: any) => {
                                    return <InputComponent key={item.title}
                                        name={item.title}
                                        label={item.name}
                                        type={'password'}
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
                            <button type={"submit"} disabled={isSubmitting} className="button  bg-lime-600 disabled:opacity-80">
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
    )
}