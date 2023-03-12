import React, {useContext, useEffect, useState} from "react";
import AccordionComponent from "../../common/component/Accordion.component";
import {getBankAccounts, getSejamInfo} from "../../../api/sejam-info.api";
import {accountNumber, SejamInfoType} from "./types";
import {formatNumber, jalali} from "../../common/functions";
import LabelValue from "../../common/component/LabelValue";
import BankAccountCard from "./BankAccountCard";
import {tradingKnowledgeLevelEnums, transactionLevelPrivatePersonEnums} from "../../common/enums";
import ConfirmComponent from "../../common/component/Confirm.component";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import Modal from "../../common/component/Modal";
import AddAccountComponent from "./AddAccountComponent";
import {SejamContext} from "../../../pages/main";

export default function SejamInfoLevel() {
    const {setUserData}=useContext<any>(SejamContext)
    const [data, setData] = useState<SejamInfoType | any>({})
    const [banks, setBanks] = useState<accountNumber | any>([])
    const [addModal, setAddModal] = useState<boolean>(false)

    const sejamInfo = async () => {
        await getSejamInfo()
            .then((res) => {
                setData(JSON.parse(res?.result?.sejamProfile))
                setUserData(JSON.parse(res?.result?.sejamProfile))
            })
    }
    const bankAccounts = async () => {
        await getBankAccounts()
            .then((res) => {
                setBanks(res?.result?.bankAccounts)
            })
    }

    useEffect(() => {
        bankAccounts()
        sejamInfo()
    }, [])

    return (
        <>
            <div className="grow bg-white p-5">
                <AccordionComponent title={'اطلاعات هویتی'}>
                    <div className="grid grid-cols-4 gap-3">
                        <LabelValue title={'نام'} value={data?.privatePerson?.firstName}/>
                        <LabelValue title={'نام خانوادگی'} value={data?.privatePerson?.lastName}/>
                        <LabelValue title={'تاریخ تولد'} value={jalali(data?.privatePerson?.birthDate).date}/>
                        <LabelValue title={'نام پدر'} value={data?.privatePerson?.fatherName}/>
                        <LabelValue title={'محل تولد'} value={data?.privatePerson?.placeOfBirth}/>
                        <LabelValue title={'صادره از'} value={data?.privatePerson?.placeOfIssue}/>
                        <LabelValue title={'سریال شناسنامه'}
                                    value={`${data?.privatePerson?.serial + `/` + data?.privatePerson?.seriShChar + data?.privatePerson?.seriSh}`}/>
                        <LabelValue title={'شماره شناسنامه'} value={data?.privatePerson?.shNumber}/>
                    </div>
                </AccordionComponent>
                <AccordionComponent title={'اطلاعات شغلی'}>
                    <div className="grid grid-cols-4 gap-3">
                        <LabelValue title={'نام شرکت'} value={data?.jobInfo?.companyName}/>
                        <LabelValue title={'ایمیل کاری'} value={data?.jobInfo?.companyEmail}/>
                        <LabelValue title={'شماره شرکت'}
                                    value={data?.jobInfo?.companyCityPrefix + data?.jobInfo?.companyPhone}/>
                        <LabelValue title={'کد پستی شرکت'} value={data?.jobInfo?.companyPostalCode}/>
                        <LabelValue title={'سایت شرکت'} value={data?.jobInfo?.companyWebSite}/>
                        <LabelValue title={'تاریخ استخدام'} value={jalali(data?.jobInfo?.employmentDate)?.date}/>
                        <LabelValue title={'عنوان شغل'} value={data?.jobInfo?.job?.title}/>
                        <LabelValue title={'سمت کاری'} value={data?.jobInfo?.position}/>
                        <LabelValue title={'آدرس شرکت'} value={data?.jobInfo?.companyAddress}/>
                    </div>
                </AccordionComponent>
                <AccordionComponent title={'اطلاعات ارتباطی'}>
                    <div className="grid grid-cols-4 gap-3">
                        {
                            data?.addresses?.map((item: any, index: number) => {
                                return (
                                    <>
                                        <LabelValue key={index} title={'ایمیل'} value={item?.email}/>
                                        <LabelValue key={index} title={'شماره همراه'} value={item?.mobile}/>
                                        <LabelValue key={index} title={'شماره ثابت'} value={item?.tel}/>
                                        <LabelValue key={index} title={'شماره تماس اضطراری'}
                                                    value={item?.emergencyTelCityPrefix +'-'+ item?.emergencyTel}/>
                                        <LabelValue key={index} title={'کد پستی'} value={item?.postalCode}/>
                                        <LabelValue key={index} title={'آدرس'}
                                                    value={item?.country.name + ' ' + item?.city?.name + ' ' + item?.section?.name + ' ' + item?.remnantAddress + ' ' + item?.alley + ' ' + item?.plaque}/>
                                    </>
                                )
                            })
                        }
                    </div>
                </AccordionComponent>
                <AccordionComponent title={'حساب های بانکی'}>
                    <Modal title={'حساب جدید'} setOpen={setAddModal} open={addModal}>
                        <AddAccountComponent fetch={bankAccounts} banks={banks} setAddModal={setAddModal}/>
                    </Modal>
                    <div className="flex overflow-x-auto space-x-reverse space-x-4">
                        {
                            banks?.map((item: any) => {
                                return (
                                    <BankAccountCard accountInfo={item} key={item?.accountNumber}/>
                                )
                            })
                        }
                    </div>
                    <button className={'float-left'} onClick={()=>setAddModal(true)}>
                        <PlusCircleIcon className={'h-7 w-7 text-tavanaGreen'}/>
                    </button>
                </AccordionComponent>
                <AccordionComponent title={'اطلاعات مالی'}>
                    <div className="grid grid-cols-4 gap-3">
                        <LabelValue title={'ارزش دارایی'} value={formatNumber(data?.financialInfo?.assetsValue)}/>
                        <LabelValue title={'متوسط درآمد ماهیانه'}
                                    value={formatNumber(data?.financialInfo?.inComingAverage)}/>
                        <LabelValue title={'مبلغ معاملات بورسهای اوراق بهادار و فرابورس'}
                                    value={formatNumber(data?.financialInfo?.sExchangeTransaction)}/>
                        <LabelValue title={'مبلغ معاملات بورسهای کالایی'}
                                    value={formatNumber(data?.financialInfo?.cExchangeTransaction)}/>
                        <LabelValue title={'مبلغ معاملات بورسهای خارج از کشور (یورو)'}
                                    value={formatNumber(data?.financialInfo?.outExchangeTransaction)}/>
                        <LabelValue title={'پیش بینی سطح ارزش ریالی معاملات'}
                                    value={transactionLevelPrivatePersonEnums.find((item:{id:string,title:string})=>item.id===data?.financialInfo?.transactionLevel)?.title}/>
                        <LabelValue title={' میزان آشنایی با مفاهیم مالی'}
                                    value={tradingKnowledgeLevelEnums.find((item: { id: string, title: string }) => item.id === data?.financialInfo?.tradingKnowledgeLevel)?.title}/>
                        <LabelValue title={'هدف از سرمایه گذاری در بورس کالای ایران'}
                                    value={data?.financialInfo?.companyPurpose}/>
                        <LabelValue title={'نام مرجع رتبه بندی کننده'}
                                    value={data?.financialInfo?.referenceRateCompany}/>
                        <LabelValue title={'تاریخ رتبه بندی'} value={data?.financialInfo?.rateDate}/>
                        <LabelValue title={'رتبه اخذ شده'} value={data?.financialInfo?.rate}/>
                        <div>
                            <LabelValue title={'کارگزاری ها'} value={null}/>
                            {
                                (data?.financialInfo?.financialBrokers)?.map((item: any) => {
                                    return <LabelValue key={item.broker?.id} title={''} value={item?.broker?.title}/>
                                })
                            }
                        </div>
                    </div>
                </AccordionComponent>
            </div>
            <ConfirmComponent/>
        </>
    )
}