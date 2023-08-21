import React, { useEffect } from 'react'
import ProgressBar from "../../components/common/component/ProgressBar"
import {
    DevicePhoneMobileIcon,
    EnvelopeIcon,
    QrCodeIcon,
    UserIcon,
    IdentificationIcon,
    CalendarDaysIcon,
    FingerPrintIcon
} from "@heroicons/react/24/outline";
import { useSWRConfig } from 'swr'
import { IDP_URL } from "../../api/constants";
import { useState } from "react";
import { jalali } from "../../components/common/functions";
import { ChangeMobileNumber } from "../../components/profile/change-mobile-number";
import useSWR from "swr";
import useMutation from "../../hooks/useMutation";
import { toast } from "react-toastify";
import { SwitchToggle } from "../../components/common/component/switch-toggle";
import { PasswordModal } from "../../components/profile/password-modal";
import { EditInfoModal } from "../../components/profile/edit-info-modal";

export default function Profile() {
    const { data } = useSWR(`${IDP_URL}/api/users/GetCurrentUserInfo`, { revalidateOnMount: true })
    const [open, setOpen] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)

    const fields: any = [
        {
            id: 0,
            title: 'نام و نام خانوادگی:',
            icon: <UserIcon className={'h-4 min-w-4'} />,
            info: data?.result?.firstName + " " + data?.result?.lastName
        },
        {
            id: 2,
            title: 'ایمیل:',
            icon: <EnvelopeIcon className={'h-4 min-w-4'} />,
            info: data?.result?.email
        },
        {
            id: 3,
            title: 'تلفن همراه:',
            icon: <DevicePhoneMobileIcon className={'h-4 min-w-4'} />,
            info: data?.result?.phoneNumber,
            utility: <ChangeMobileNumber />
        },
        {
            id: 4,
            title: 'کدملی:',
            icon: <IdentificationIcon className={'h-4 min-w-4'} />,
            info: data?.result?.nationalId
        },
        {
            id: 5,
            title: 'تاریخ تولد:',
            icon: <CalendarDaysIcon className={'h-4 min-w-4'} />,
            info: data?.result?.birthdate ? jalali(data?.result?.birthdate).date : '-'
        },
        {
            id: 6,
            title: 'ورود دو عاملی:',
            icon: <QrCodeIcon className={'h-4 min-w-4'} />,
            info: <ToggleButton />
        }
    ]

    return (
        <div className="relative flex flex-col h-full md:py-0 pt-5 text-sm md:text-md">
            <ProgressBar showSteps={false} />
            <div className={'flex overflow-y-auto flex-col grow bg-content border-t-2 border-tavanaPurple'}>
                <div className={'container py-10 flex flex-col grow '}>
                    <div className={'lg:w-1/3 w-full border border-border rounded-lg overflow-hidden'}>
                        <div>
                            {fields.map((field: any) => {
                                return (
                                    <div className={'flex even:bg-gray-200 p-2'} key={field.id}>
                                        <div className={'flex flex-1 px-2'}>
                                            <div className={'bg-gray-400 rounded-full p-1 ml-3 h-fit'}>
                                                {field.icon}
                                            </div>
                                            <span className={'min-w-fit'}>{field.title}</span>
                                        </div>
                                        <div className={'min-w-fit flex items-center'}>
                                            {field?.utility ? field?.utility : null}
                                            <div>
                                                {data && field.info}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse p-2">
                            <button className={'button'} onClick={() => setOpen(true)}>
                                ویرایش حساب کاربری
                            </button>
                            <button className={'button bg-white text-black'} onClick={() => setPasswordModal(true)}>
                                تغییر رمز عبور
                            </button>
                        </div>

                        <PasswordModal setOpen={setPasswordModal} open={passwordModal} />
                        <EditInfoModal setOpen={setOpen} open={open} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ToggleButton = () => {
    const { data } = useSWR(`${IDP_URL}/api/users/GetCurrentUserInfo`, { revalidateOnMount: true })
    const { mutate } = useMutation({ url: `${IDP_URL}/api/account/2fa`, method: "PUT" })
    const [enabled, setEnabled] = useState(data?.result.twoFactorEnabled)

    const twoFactorHandler = async () => {
        await mutate({}, { enabled: !enabled })
            .then(() => setEnabled(!enabled))
            .catch((err) => toast.error(`${err?.response?.data?.error?.message || 'ناموفق'}`))
    }

    return (
        <SwitchToggle isChecked={enabled} onChange={twoFactorHandler} />
    )
}