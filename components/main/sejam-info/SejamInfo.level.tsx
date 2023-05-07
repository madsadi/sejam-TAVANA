import React, {useState} from "react";
import AccordionComponent from "../../common/component/Accordion.component";
import {
    accountNumber,
    SejamInfoType,
} from "./types";
import {jalali} from "../../common/functions";
import LabelValue from "../../common/component/LabelValue";
import BankAccountCard from "./BankAccountCard";
import {
    agentTypeEnums
} from "../../common/enums";
import ConfirmComponent from "../../common/component/Confirm.component";
import {PlusCircleIcon} from "@heroicons/react/24/outline";

export default function SejamInfoLevel() {
    const [data, setData] = useState<SejamInfoType | any>({})
    const [banks, setBanks] = useState<accountNumber | any>([])

    return (
        <>
            <div className="grow bg-white/50 p-5 rounded-md backdrop-blur-md">
                    <AccordionComponent title={'Authorization'}>
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
                            <LabelValue title={'Name'} value={data?.privatePerson?.firstName}/>
                            <LabelValue title={'Last Name'} value={data?.privatePerson?.lastName}/>
                            <LabelValue title={'Birthday'}
                                        value={data?.privatePerson?.birthDate ? jalali(data?.privatePerson?.birthDate).date : ''}/>
                            <LabelValue title={'Father Name'} value={data?.privatePerson?.fatherName}/>
                            <LabelValue title={'Place Of Birth'} value={data?.privatePerson?.placeOfBirth}/>
                            <LabelValue title={'Issued From'} value={data?.privatePerson?.placeOfIssue}/>
                            <LabelValue title={'Passport ID'} value={data?.privatePerson?.shNumber}/>
                        </div>
                    </AccordionComponent>
                <AccordionComponent title={'Career Information'}>
                    <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                        <LabelValue title={'Company Name'} value={data?.jobInfo?.companyName}/>
                        <LabelValue title={'Job Email'} value={data?.jobInfo?.companyEmail}/>
                        <LabelValue title={'Company NO.'}
                                    value={data?.jobInfo?.companyCityPrefix + data?.jobInfo?.companyPhone}/>
                        <LabelValue title={'Postal Code'} value={data?.jobInfo?.companyPostalCode}/>
                        <LabelValue title={'Website'} value={data?.jobInfo?.companyWebSite}/>
                        <LabelValue title={'Hiring Date'}
                                    value={data?.jobInfo?.employmentDate ? jalali(data?.jobInfo?.employmentDate)?.date : ''}/>
                        <LabelValue title={'Job Name'} value={data?.jobInfo?.job?.title}/>
                        <LabelValue title={'Position'} value={data?.jobInfo?.position}/>
                        <LabelValue title={'Address'} value={data?.jobInfo?.companyAddress}/>
                    </div>
                </AccordionComponent>
                {data?.agent ? <AccordionComponent title={'Agent'}>
                    <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                        <LabelValue title={'Agent Type'}
                                    value={agentTypeEnums.find((item: any) => item.id === data?.agent?.type)?.title}/>
                        <LabelValue title={'Expiration Date'}
                                    value={data?.agent?.expirationDate ? jalali(data?.agent?.expirationDate).date : ''}/>
                        <LabelValue title={'Description'} value={data?.agent?.description}/>
                        <LabelValue title={'National ID'} value={data?.agent?.uniqueIdentifier}/>
                        <LabelValue title={'Name'} value={data?.agent?.firstName}/>
                        <LabelValue title={'Last Name'} value={data?.agent?.lastName}/>
                        <LabelValue title={'Is Confirmed'}
                                    value={data?.agent?.isConfirmed ? 'تایید شده' : 'تایید نشده'}/>
                    </div>
                </AccordionComponent> : null}
                <AccordionComponent title={'Contact'}>
                    {
                        data?.addresses?.map((item: any, index: number) => {
                            return (
                                <div className={'grid md:grid-cols-4 grid-cols-2  gap-3 w-full'}
                                     key={item?.alley + item?.plaque}>
                                    <LabelValue key={index} title={'Email'} value={item?.email}/>
                                    <LabelValue key={index} title={'Phone Number'} value={item?.mobile}/>
                                    <LabelValue key={index} title={'Register NO.'} value={item?.tel}/>
                                    <LabelValue key={index} title={'Emergency Number'}
                                                value={((item?.emergencyTelCityPrefix ? item?.emergencyTelCityPrefix : '') + '-' + (item?.emergencyTel ? item?.emergencyTel:''))}/>
                                    <LabelValue key={index} title={'Postal Code'} value={item?.postalCode}/>
                                    <LabelValue key={index} title={'Address'}
                                                value={item?.country.name + ' ' + item?.city?.name + ' ' + item?.section?.name + ' ' + item?.remnantAddress + ' ' + item?.alley + ' ' + item?.plaque}/>
                                </div>
                            )
                        })
                    }
                </AccordionComponent>
                <AccordionComponent title={'Bank Accounts'}>
                    <div className="flex overflow-x-auto space-x-reverse space-x-4 p-4">
                        {
                            banks?.map((item: any) => {
                                return (
                                    <BankAccountCard accountInfo={item} setDefaultBank={()=>null}
                                                     key={item?.accountNumber}/>
                                )
                            })
                        }
                    </div>
                    <button className={'float-left'}>
                        <PlusCircleIcon className={'h-7 w-7 text-tavanaGreen'}/>
                    </button>
                </AccordionComponent>
            </div>
            <ConfirmComponent banks={banks}/>
        </>
    )
}