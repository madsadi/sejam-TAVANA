import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {formatNumber, jalali} from "../../common/functions";
import {accountTypeEnums, tradingKnowledgeLevelEnums, transactionLevelPrivatePersonEnums} from "../../common/enums";
import ReactToPrint from "react-to-print";
import {PrinterIcon} from "@heroicons/react/24/outline";
import PageHeaderFooter from "./PageHeaderFooter";

export default function OnlineRegistrationAgreement() {
    const {userData, userDefaultBank} = useContext<any>(SejamContext)
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("old boring text");

    const componentRef = useRef(null);

    const onBeforeGetContentResolve = useRef(null);

    const handleAfterPrint = useCallback(() => {
        console.log("`onAfterPrint` called");
    }, []);

    const handleBeforePrint = useCallback(() => {
        console.log("`onBeforePrint` called");
    }, []);

    const handleOnBeforeGetContent = useCallback(() => {
        console.log("`onBeforeGetContent` called");
        setLoading(true);
        setText("Loading new text...");

        return new Promise<void>((resolve) => {
            // @ts-ignore
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText("New, Updated Text!");
                resolve();
            }, 2000);
        });
    }, [setLoading, setText]);

    useEffect(() => {
        if (
            text === "New, Updated Text!" &&
            typeof onBeforeGetContentResolve.current === "function"
        ) {
            // @ts-ignore
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, text]);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);
    const reactToPrintTrigger = () => {
        return (
            <button className={'flex item-center button bg-red-600 w-fit text-white float-left'}>
                چاپ
                {loading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> : <PrinterIcon className={'h-5 w-5 mr-2'}/>}
            </button>
        ); // eslint-disable-line max-len
    }

    return (
        <>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="تعهد نامه ثبت نام غیر حضوری"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <div ref={componentRef}>
                <table className={'w-full'} dir={'rtl'}>
                    <thead>
                    <tr>
                        <td>
                            <div className="page-header-space">&nbsp;</div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={'w-full content'}>
                            <div className={'relative leading-8 text-justify page'}>
                                <div className="text-center">
                                    <p>تعهد نامه ثبت نام غیر حضوری</p>
                                </div>

                                <div className="text-center">
                                    <h4 className="font-weight-bolder">
                                        فرم مشخصات اشخاص حقیقی ایرانی (مشتري / نماینده)
                                    </h4>
                                </div>
                                <div className="text-right mt-4">
                                    <ul>
                                        <li>اطلاعات این فرم محرمانه محسوب شده و در اختیار اشخاص غیر مجاز قرار داده
                                            نمی‌شود. تکمیل
                                            قسمت
                                            هاي
                                            ستاره‌دار
                                            الزامی و سایر قسمت‌ها اختیاري است.
                                        </li>
                                        <li className="mt-4">بخش‌های مشترك این فرم باید توسط مشتري یا نماینده تکمیل شود
                                            سایر بخش‌ها
                                            که
                                            با
                                            عبارت‌های
                                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                                            "اطلاعات مشتري" و"اطلاعات نماینده" مشخص شده است با توجه به نقش شخص تکمیل
                                            کننده (مشتري یا
                                            نماینده)
                                            بخش مربوط
                                            به شخص تکمیل گردد.
                                        </li>
                                    </ul>
                                    <p>
                                        نماینده شخص حقوقی و اشخاص مجاز به ارائه سفارش از طرف شخص حقوقی، طبق تبصره 1 بند
                                        4-2-1 ماده 4
                                        دستورالعمل
                                        شناسایی مشتریان در بازار سرمایه، باید طبق ضوابط مقرر در مورد اشخاص حقیقی مورد
                                        شناسایی قرار
                                        گیرند.
                                    </p>
                                </div>

                                <div className="text-right mt-4">

                                    <table className={'w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5>اطلاعات هویتی</h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className={'title'}>نام:</div>
                                                <div className={'titleValue'}>{userData?.privatePerson?.firstName}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>نام خانوادگی:</div>
                                                <div className={'titleValue'}>{userData?.privatePerson?.lastName}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>کد ملی:</div>
                                                <div className={'titleValue'}>{userData?.uniqueIdentifier}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>به شماره شناسنامه:</div>
                                                <div className={'titleValue'}>{userData?.uniqueIdentifier}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={'title'}> سریال شناسنامه:</div>
                                                <div
                                                    className={'titleValue'}>{`${userData?.privatePerson?.serial + `/` + userData?.privatePerson?.seriShChar + userData?.privatePerson?.seriSh}`}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>نام پدر:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.privatePerson?.fatherName}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>کد بورسی:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.privatePerson?.fatherName}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>تاریخ تولد:</div>
                                                <div
                                                    className={'titleValue'}>{jalali(userData?.privatePerson?.birthDate).date}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={'title'}>محل تولد:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.privatePerson?.placeOfBirth}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>محل صدور:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.privatePerson?.placeOfIssue}</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-right mt-4">
                                    <table className={'w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5>اطلاعات محل سکونت</h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className={'title'}>کشور:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.addresses?.[0]?.country.name}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>استان:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.addresses?.[0]?.city.name}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>کوچه:</div>
                                                <div className={'titleValue'}>{userData?.addresses?.[0]?.alley}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>خیابان:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.addresses?.[0]?.remnantAddress}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={'title'}> تلفن ثابت:</div>
                                                <div className={'titleValue'}>{userData?.addresses?.[0]?.tel}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}> پست الکترونیک:</div>
                                                <div className={'titleValue'}>{userData?.addresses?.[0]?.email}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>تلفن همراه:</div>
                                                <div className={'titleValue'}>{userData?.addresses?.[0]?.mobile}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}> کد پستی:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.addresses?.[0]?.postalCode}</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-right mt-4">

                                    <table className={'w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5>اطلاعات محل کار</h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className={'title'}> عنوان شغل:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.jobInfo?.companyName ? userData?.jobInfo?.companyName : 'ناموجود'}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>تلفن محل کار:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.jobInfo?.companyCityPrefix + '-' + userData?.jobInfo?.companyPhone}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}> نشانی محل کار:</div>
                                                <div className={'titleValue'}>{userData?.jobInfo?.companyAddress}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}> نمابر:</div>
                                                <div className={'titleValue'}>{userData?.jobInfo?.companyFax}</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-right mt-4">
                                    <table className={'w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5>اطلاعات حساب بانکی</h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className={'title'}> نام بانک:</div>
                                                <div className={'titleValue'}>{userDefaultBank.bank?.name}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>نام صاحب حساب:</div>
                                                <div
                                                    className={'titleValue'}>{userData?.privatePerson?.firstName + '-' + userData?.privatePerson?.lastName}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}> نوع حساب:</div>
                                                <div
                                                    className={'titleValue'}>{accountTypeEnums.find((item: any) => item.id === userDefaultBank?.type)?.faTitle}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}> نام شعبه:</div>
                                                <div className={'titleValue'}>{userDefaultBank?.branchName}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={'title'}> کد شعبه:</div>
                                                <div className={'titleValue'}>{userDefaultBank?.branchCode}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}>شماره‌حساب:</div>
                                                <div className={'titleValue'}>{userDefaultBank?.accountNumber}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}> شماره شبا:</div>
                                                <div className={'titleValue'}>{userDefaultBank?.sheba}</div>
                                            </td>
                                            <td>
                                                <div className={'title'}> نام شعبه:</div>
                                                <div className={'titleValue'}>{userDefaultBank?.branchName}</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-right mt-4">
                                    <p>
                    <span className="font-weight-bold">
                        * میزان آشنایی شما با مفاهیم مالی و سرمایه‌گذاری در اوراق بهادار:
                    </span>
                                        {tradingKnowledgeLevelEnums.find((item: { id: string, title: string }) => item.id === userData?.financialInfo?.tradingKnowledgeLevel)?.title}
                                    </p>
                                    <p>
                    <span className="font-weight-bold">
                        * متوسط درآمد ماهیانه شما از مشاغل و منابع مختلف در حال حاضر چقدراست؟
                    </span>
                                        {formatNumber(userData?.financialInfo?.inComingAverage)}
                                    </p>
                                    <p>
                    <span className="font-weight-bold">
                        * پیش‌ بینی می‌کنید سطح معاملات شما در بازار سرمایه طی یک سال چه مبلغی باشد؟
                    </span>
                                        {transactionLevelPrivatePersonEnums.find((item: { id: string, title: string }) => item.id === userData?.financialInfo?.transactionLevel)?.title}
                                    </p>
                                    <p><span
                                        className="font-weight-bold"> * نام شرکت کارگزاري که شما قبلاً از طریق آن معامله نموده‌اید، ذکر نمایید:</span>
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <div className="page-footer-space">&nbsp;</div>
                        </td>
                    </tr>
                    </tfoot>
                </table>
                <PageHeaderFooter/>
            </div>
        </>
    )
}