import React, {useContext, useEffect, useState} from "react";
import AccordionComponent from "../../common/component/Accordion.component";
import {getBankAccounts, getSejamInfo, registerBankAccount, updateAgentInfo} from "../../../api/sejam-info.api";
import {
    accountNumber,
    LegalPersonShareholderType,
    legalPersonStakeholdertype,
    SejamInfoType,
    tradingCode
} from "./types";
import {formatNumber, jalali} from "../../common/functions";
import LabelValue from "../../common/component/LabelValue";
import BankAccountCard from "./BankAccountCard";
import {
    accountTypeEnums,
    agentTypeEnums, LegalPersonShareholderViewModelEnums, LegalPersonStakeholderTypeEnums,
    legalPersonTypeCategoryEnums, legalPersonTypeSubCategory, tradingCodeTypeEnums,
    tradingKnowledgeLevelEnums, transactionLevelLegalPersonEnums,
    transactionLevelPrivatePersonEnums
} from "../../common/enums";
import ConfirmComponent from "../../common/component/Confirm.component";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import Modal from "../../common/component/Modal";
import AddAccountComponent from "./AddAccountComponent";
import {SejamContext} from "../../../pages/main";
import {Log} from "oidc-client-ts";
import setLevel = Log.setLevel;
import {toast} from "react-toastify";

export default function SejamInfoLevel() {
    const {setUserData,regInfo} = useContext<any>(SejamContext)
    const [data, setData] = useState<SejamInfoType | any>({})
    const [banks, setBanks] = useState<accountNumber | any>([])
    const [addModal, setAddModal] = useState<boolean>(false)
    const [info, setInfo] = useState<any>({uniqueId: '', agentUniqueId: ''})

    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;
        setInfo({...info, ..._info})
    }
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

    const updateAgent = async () => {
        await updateAgentInfo(info)
            .then(() => setLevel(0.5))
            .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
    }

    const setDefaultBank = async (defaultBank: accountNumber) => {
        let restOfAccounts = banks.map((b: accountNumber) => {
            return ({
                "accountNumber": b.accountNumber,
                "iban": b.sheba,
                "type": accountTypeEnums.find((item: any) => item.enTitle === b.type)?.id,
                "cityId": b.branchCity.id,
                "isDefault": b.accountNumber===defaultBank.accountNumber
            })
        })
        await registerBankAccount({bankAccounts: [...restOfAccounts]})
            .then(() => bankAccounts())
    }

    useEffect(() => {
        bankAccounts()
        sejamInfo()
    }, [])

    return (
        <>
            <div className="grow bg-white/50 p-5 rounded-md backdrop-blur-md">
                {data?.legalPerson ?
                    <AccordionComponent title={'اطلاعات هویتی حقوقی'}>
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
                            <LabelValue title={'نام شخص حقوقی'} value={data?.legalPerson?.companyName}/>
                            <LabelValue title={'شماره ثبت شخص حقوقی'} value={data?.legalPerson?.registerNumber}/>
                            <LabelValue title={' تاریخ ثبت'} value={jalali(data?.legalPerson?.registerDate).date}/>
                            <LabelValue title={'محل ثبت'} value={data?.legalPerson?.registerPlace}/>
                            <LabelValue title={'کد اقتصادی'} value={data?.legalPerson?.economicCode}/>
                            <LabelValue title={'سازمان صادرکننده مجوز'}
                                        value={data?.legalPerson?.evidenceReleaseCompany}/>
                            <LabelValue title={'تاریخ صدور مجوز '}
                                        value={data?.legalPerson?.evidenceReleaseDate}/>
                            <LabelValue title={'تاریخ انقضاء مجوز '} value={data?.legalPerson?.evidenceExpirationDate}/>
                            <LabelValue title={'نوع شرکت'}
                                        value={legalPersonTypeCategoryEnums.find((item: any) => item.id === data?.legalPerson?.legalPersonTypeCategory)?.title}/>
                            <LabelValue title={'زیر مجموعه نوع شرکت'}
                                        value={legalPersonTypeSubCategory.find((item: any) => item.id === data?.legalPerson?.legalPersonTypeSubCategory)?.title}/>
                        </div>
                    </AccordionComponent>
                    : <AccordionComponent title={'اطلاعات هویتی'}>
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
                            <LabelValue title={'نام'} value={data?.privatePerson?.firstName}/>
                            <LabelValue title={'نام خانوادگی'} value={data?.privatePerson?.lastName}/>
                            <LabelValue title={'تاریخ تولد'}
                                        value={data?.privatePerson?.birthDate ? jalali(data?.privatePerson?.birthDate).date : ''}/>
                            <LabelValue title={'نام پدر'} value={data?.privatePerson?.fatherName}/>
                            <LabelValue title={'محل تولد'} value={data?.privatePerson?.placeOfBirth}/>
                            <LabelValue title={'صادره از'} value={data?.privatePerson?.placeOfIssue}/>
                            <LabelValue title={'سریال شناسنامه'}
                                        value={`${data?.privatePerson?.serial + `/` + data?.privatePerson?.seriShChar + data?.privatePerson?.seriSh}`}/>
                            <LabelValue title={'شماره شناسنامه'} value={data?.privatePerson?.shNumber}/>
                        </div>
                    </AccordionComponent>}
                <AccordionComponent title={'اطلاعات شغلی'}>
                    <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                        <LabelValue title={'نام شرکت'} value={data?.jobInfo?.companyName}/>
                        <LabelValue title={'ایمیل کاری'} value={data?.jobInfo?.companyEmail}/>
                        <LabelValue title={'شماره شرکت'}
                                    value={data?.jobInfo?.companyCityPrefix + data?.jobInfo?.companyPhone}/>
                        <LabelValue title={'کد پستی شرکت'} value={data?.jobInfo?.companyPostalCode}/>
                        <LabelValue title={'سایت شرکت'} value={data?.jobInfo?.companyWebSite}/>
                        <LabelValue title={'تاریخ استخدام'}
                                    value={data?.jobInfo?.employmentDate ? jalali(data?.jobInfo?.employmentDate)?.date : ''}/>
                        <LabelValue title={'عنوان شغل'} value={data?.jobInfo?.job?.title}/>
                        <LabelValue title={'سمت کاری'} value={data?.jobInfo?.position}/>
                        <LabelValue title={'آدرس شرکت'} value={data?.jobInfo?.companyAddress}/>
                    </div>
                </AccordionComponent>
                {data?.legalPersonShareholders?.length ? <AccordionComponent title={'اطلاعات اعضای هیت مدیره'}>
                    {
                        data?.legalPersonShareholders?.map((item: LegalPersonShareholderType) => {
                            return (
                                <div className="grid md:grid-cols-4 grid-cols-2  gap-3" key={item?.uniqueIdentifier}>
                                    <LabelValue title={'نام'} value={item?.firstName}/>
                                    <LabelValue title={'نام خانوادگی'} value={item?.lastName}/>
                                    <LabelValue title={'کد ملی'}
                                                value={item?.uniqueIdentifier}/>
                                    <LabelValue title={'کد پستی'} value={item.postalCode}/>
                                    <LabelValue title={'نشانی کامل'} value={item.address}/>
                                    <LabelValue title={'سمت'}
                                                value={LegalPersonShareholderViewModelEnums.find((item: any) => item.id === item.positionType)?.title}/>
                                    <LabelValue title={'درصد سهامداری'} value={`% ${item.percentageVotingRight}`}/>
                                </div>
                            )
                        })
                    }
                </AccordionComponent> : null}
                {data?.legalPersonStakeholders?.length ? <AccordionComponent title={'اطلاعات ذی نفعان'}>
                    {
                        data?.legalPersonStakeholders?.map((item: legalPersonStakeholdertype) => {
                            return (
                                <div className="grid md:grid-cols-4 grid-cols-2  gap-3" key={item?.uniqueIdentifier}>
                                    <LabelValue title={'نام'} value={item?.firstName}/>
                                    <LabelValue title={'نام خانوادگی'} value={item?.lastName}/>
                                    <LabelValue title={'کد ملی'} value={item?.uniqueIdentifier}/>
                                    <LabelValue title={'نوع ذینفع شخصیت حقوقی'}
                                                value={LegalPersonStakeholderTypeEnums.find((i: any) => i.id === item.type)?.title}/>
                                    <LabelValue title={'تاریخ شروع دوره تصدی'} value={item.startAt}/>
                                    <LabelValue title={'تاریخ پایان دوره تصدی'} value={item.endAt}/>
                                    <LabelValue title={'سمت'}
                                                value={LegalPersonShareholderViewModelEnums.find((item: any) => item.id === item.positionType)?.title}/>
                                    <LabelValue title={' فیلد مشخص کننده صاحب امضا بودن فرد'}
                                                value={item.isOwnerSignature ? 'بله' : 'خیر'}/>
                                </div>
                            )
                        })
                    }
                </AccordionComponent> : null}
                {data?.tradingCodes?.length && <AccordionComponent title={'کد های بورسی'}>
                    {
                        data?.tradingCodes?.map((item: tradingCode) => {
                            return (
                                <div className={'grid md:grid-cols-4 grid-cols-2 gap-3'} key={item.code}>
                                    <LabelValue title={'کد'} value={item?.code}/>
                                    <LabelValue title={'نوع کد بورسی'}
                                                value={tradingCodeTypeEnums.find((i: any) => i.id === item?.type)?.title}/>
                                </div>
                            )
                        })
                    }
                </AccordionComponent>}
                {data?.agent ? <AccordionComponent title={'وکیل / نماینده'}>
                    <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                        <LabelValue title={'مشخص کننده نوع نماینده'}
                                    value={agentTypeEnums.find((item: any) => item.id === data?.agent?.type)?.title}/>
                        <LabelValue title={'تاریخ انقضای نمایندگی'}
                                    value={data?.agent?.expirationDate ? jalali(data?.agent?.expirationDate).date : ''}/>
                        <LabelValue title={'توضیحات'} value={data?.agent?.description}/>
                        <LabelValue title={'کد ملی'} value={data?.agent?.uniqueIdentifier}/>
                        <LabelValue title={'نام'} value={data?.agent?.firstName}/>
                        <LabelValue title={'نام خانوادگی'} value={data?.agent?.lastName}/>
                        <LabelValue title={'مشخص کننده تایید نماینده'}
                                    value={data?.agent?.isConfirmed ? 'تایید شده' : 'تایید نشده'}/>
                    </div>
                    {regInfo?.registrationState===8 ? <div className={'border border-dashed p-2 mt-5 rounded-lg'}>
                        <p className={'text-red-400'}>کد ملی وکیل با اطلاعات دریافت شده از سجام تطابق ندارد.</p>
                        <p className={'my-1 '}>در صورت تمایل اطلاعات زیر را اصلاح نموده و فرایند ثبت نام را تکرار
                            نمایید.</p>
                        <div className={'grid md:grid-cols-3 grid-cols-2 gap-3'}>
                            <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                                <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                                    کد ملی وکیل:
                                </label>
                                <input className={`input`}
                                       dir={'ltr'}
                                       value={info.agentUniqueId}
                                       onChange={(e) => infoUpdate('agentUniqueId', e.target.value)}
                                />
                            </div>
                            <div className={'flex flex-col md:flex-row space-y-3 md:space-y-0 w-full'}>
                                <label className={'flex items-center mb-1 ml-0 md:ml-3 min-w-[110px]'}>
                                    کد ملی :
                                </label>
                                <input className={`input`}
                                       dir={'ltr'}
                                       value={info.uniqueId}
                                       onChange={(e) => infoUpdate('uniqueId', e.target.value)}
                                />
                            </div>
                            <button className={'button w-fit px-5'} type={'button'} onClick={updateAgent}>ویرایش
                            </button>
                        </div>
                    </div>:null}
                </AccordionComponent> : null}
                <AccordionComponent title={'اطلاعات ارتباطی'}>
                    {
                        data?.addresses?.map((item: any, index: number) => {
                            return (
                                <div className={'grid md:grid-cols-4 grid-cols-2  gap-3 w-full'}
                                     key={item?.alley + item?.plaque}>
                                    <LabelValue key={index} title={'ایمیل'} value={item?.email}/>
                                    <LabelValue key={index} title={'شماره همراه'} value={item?.mobile}/>
                                    <LabelValue key={index} title={'شماره ثابت'} value={item?.tel}/>
                                    <LabelValue key={index} title={'شماره تماس اضطراری'}
                                                value={((item?.emergencyTelCityPrefix ? item?.emergencyTelCityPrefix : '') + '-' + (item?.emergencyTel ? item?.emergencyTel:''))}/>
                                    <LabelValue key={index} title={'کد پستی'} value={item?.postalCode}/>
                                    <LabelValue key={index} title={'آدرس'}
                                                value={item?.country.name + ' ' + item?.city?.name + ' ' + item?.section?.name + ' ' + item?.remnantAddress + ' ' + item?.alley + ' ' + item?.plaque}/>
                                </div>
                            )
                        })
                    }
                </AccordionComponent>
                <AccordionComponent title={'حساب های بانکی'}>
                    <Modal title={'حساب جدید'} setOpen={setAddModal} open={addModal}>
                        <AddAccountComponent fetch={bankAccounts} banks={banks} setAddModal={setAddModal}/>
                    </Modal>
                    <div className="flex overflow-x-auto space-x-reverse space-x-4 p-4">
                        {
                            banks?.map((item: any) => {
                                return (
                                    <BankAccountCard accountInfo={item} setDefaultBank={setDefaultBank}
                                                     key={item?.accountNumber}/>
                                )
                            })
                        }
                    </div>
                    <button className={'float-left'} onClick={() => setAddModal(true)}>
                        <PlusCircleIcon className={'h-7 w-7 text-tavanaGreen'}/>
                    </button>
                </AccordionComponent>
                <AccordionComponent title={'اطلاعات مالی'}>
                    <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
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
                                    value={data?.legalPerson ? transactionLevelLegalPersonEnums.find((item: { id: string, title: string }) => item.id === data?.financialInfo?.transactionLevel)?.title : transactionLevelPrivatePersonEnums.find((item: { id: string, title: string }) => item.id === data?.financialInfo?.transactionLevel)?.title}/>
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
            <ConfirmComponent banks={banks}/>
        </>
    )
}