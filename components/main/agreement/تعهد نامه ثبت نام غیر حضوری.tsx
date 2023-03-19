import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {formatNumber, jalali} from "../../common/functions";
import {accountTypeEnums, tradingKnowledgeLevelEnums, transactionLevelPrivatePersonEnums} from "../../common/enums";
import ReactToPrint from "react-to-print";
import {PrinterIcon} from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import PageHeaderFooter from "./PageHeaderFooter";

import {Page, Text, Document, StyleSheet,PDFViewer} from "@react-pdf/renderer";
import TablePDF from "./TablePDF";
import {Table, TableBody, TableCell, TableHeader,DataTableCell} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        display:"flex",
        flexDirection: "column",
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'PelakFA'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'PelakFA'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'PelakFA'
    },
    list: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'PelakFA'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});
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
            {/*<Document>*/}
            {/*    <Page>*/}
            {/*        <Text style={styles.title}>تعهد نامه ثبت نام غیر حضوری</Text>*/}
            {/*        <Text style={styles.subtitle}>*/}
            {/*            فرم مشخصات اشخاص حقیقی ایرانی (مشتري / نماینده)*/}
            {/*        </Text>*/}
            {/*        <Text style={styles.list}>*/}
            {/*            اطلاعات این فرم محرمانه محسوب شده و در اختیار اشخاص غیر مجاز قرار داده نمی‌شود. تکمیل*/}
            {/*            قسمت*/}
            {/*            هاي*/}
            {/*            ستاره‌دار*/}
            {/*            الزامی و سایر قسمت‌ها اختیاري است.*/}
            {/*        </Text>*/}
            {/*        <Text style={styles.list}>*/}
            {/*            بخش‌های مشترك این فرم باید توسط مشتري یا نماینده تکمیل شود سایر بخش‌ها*/}
            {/*            که*/}
            {/*            با*/}
            {/*            عبارت‌های*/}
            {/*            /!* eslint-disable-next-line react/no-unescaped-entities *!/*/}
            {/*            "اطلاعات مشتري" و"اطلاعات نماینده" مشخص شده است با توجه به نقش شخص تکمیل کننده (مشتري یا*/}
            {/*            نماینده)*/}
            {/*            بخش مربوط*/}
            {/*            به شخص تکمیل گردد.*/}
            {/*        </Text>*/}
            {/*        <Text>*/}
            {/*            نماینده شخص حقوقی و اشخاص مجاز به ارائه سفارش از طرف شخص حقوقی، طبق تبصره 1 بند 4-2-1 ماده 4*/}
            {/*            دستورالعمل*/}
            {/*            شناسایی مشتریان در بازار سرمایه، باید طبق ضوابط مقرر در مورد اشخاص حقیقی مورد شناسایی قرار*/}
            {/*            گیرند.*/}
            {/*        </Text>*/}
            {/*        <Text style={styles.subtitle}>*/}
            {/*            اطلاعات هویتی*/}
            {/*        </Text>*/}
            {/*        <Table*/}
            {/*            data={[*/}
            {/*                {firstName: "John", lastName: "Smith", dob: new Date(2000, 1, 1), country: "Australia", phoneNumber: "xxx-0000-0000"}*/}
            {/*            ]}*/}
            {/*        >*/}
            {/*            <TableHeader>*/}
            {/*                <TableCell>*/}
            {/*                    First Name*/}
            {/*                </TableCell>*/}
            {/*                <TableCell>*/}
            {/*                    Last Name*/}
            {/*                </TableCell>*/}
            {/*                <TableCell>*/}
            {/*                    DOB*/}
            {/*                </TableCell>*/}
            {/*                <TableCell>*/}
            {/*                    Country*/}
            {/*                </TableCell>*/}
            {/*                <TableCell>*/}
            {/*                    Phone Number*/}
            {/*                </TableCell>*/}
            {/*            </TableHeader>*/}
            {/*            <TableBody>*/}
            {/*                <DataTableCell getContent={(r) => r.firstName}/>*/}
            {/*                <DataTableCell getContent={(r) => r.lastName}/>*/}
            {/*                <DataTableCell getContent={(r) => r.dob.toLocaleString()}/>*/}
            {/*                <DataTableCell getContent={(r) => r.country}/>*/}
            {/*                <DataTableCell getContent={(r) => r.phoneNumber}/>*/}
            {/*            </TableBody>*/}
            {/*        </Table>*/}
            {/*    </Page>*/}
            {/*</Document>*/}
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
                <div className={'leading-8 text-justify page'}>
                    <PageHeaderFooter/>
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
                            <li>اطلاعات این فرم محرمانه محسوب شده و در اختیار اشخاص غیر مجاز قرار داده نمی‌شود. تکمیل
                                قسمت
                                هاي
                                ستاره‌دار
                                الزامی و سایر قسمت‌ها اختیاري است.
                            </li>
                            <li className="mt-4">بخش‌های مشترك این فرم باید توسط مشتري یا نماینده تکمیل شود سایر بخش‌ها
                                که
                                با
                                عبارت‌های
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                "اطلاعات مشتري" و"اطلاعات نماینده" مشخص شده است با توجه به نقش شخص تکمیل کننده (مشتري یا
                                نماینده)
                                بخش مربوط
                                به شخص تکمیل گردد.
                            </li>
                        </ul>
                        <p>
                            نماینده شخص حقوقی و اشخاص مجاز به ارائه سفارش از طرف شخص حقوقی، طبق تبصره 1 بند 4-2-1 ماده 4
                            دستورالعمل
                            شناسایی مشتریان در بازار سرمایه، باید طبق ضوابط مقرر در مورد اشخاص حقیقی مورد شناسایی قرار
                            گیرند.
                        </p>
                    </div>

                    <div className="text-right mt-4">
                        <h5>اطلاعات هویتی</h5>
                        <table className={'table table-compact w-full'}>
                            <tbody>
                            <tr>
                                <td>
                                    <span>نام:</span>
                                    <span>{userData?.privatePerson?.firstName}</span>
                                </td>
                                <td>
                                    <span>نام خانوادگی:</span>
                                    <span>{userData?.privatePerson?.lastName}</span>
                                </td>
                                <td>
                                    <span>کد ملی:</span>
                                    <span>{userData?.uniqueIdentifier}</span>
                                </td>
                                <td>
                                    <span>به شماره شناسنامه:</span>
                                    <span>{userData?.uniqueIdentifier}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span> سریال شناسنامه:</span>
                                    <span>{`${userData?.privatePerson?.serial + `/` + userData?.privatePerson?.seriShChar + userData?.privatePerson?.seriSh}`}</span>
                                </td>
                                <td>
                                    <span>نام پدر:</span>
                                    <span>{userData?.privatePerson?.fatherName}</span>
                                </td>
                                <td>
                                    <span>کد بورسی:</span>
                                    <span>{userData?.privatePerson?.fatherName}</span>
                                </td>
                                <td>
                                    <span>تاریخ تولد:</span>
                                    <span>{jalali(userData?.privatePerson?.birthDate).date}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>محل تولد:</span>
                                    <span>{userData?.privatePerson?.placeOfBirth}</span>
                                </td>
                                <td>
                                    <span>محل صدور:</span>
                                    <span>{userData?.privatePerson?.placeOfIssue}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-right mt-4">
                        <h5>اطلاعات محل سکونت</h5>
                        <table className={'table table-compact w-full'}>
                            <tbody>
                            <tr>
                                <td>
                                    <span>کشور:</span>
                                    <span>{userData?.addresses?.[0]?.country.name}</span>
                                </td>
                                <td>
                                    <span>استان:</span>
                                    <span>{userData?.addresses?.[0]?.city.name}</span>
                                </td>
                                <td>
                                    <span>کوچه: </span>
                                    <span>{userData?.addresses?.[0]?.alley}</span>
                                </td>
                                <td>
                                    <span>خیابان:</span>
                                    <span>{userData?.addresses?.[0]?.remnantAddress}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span> تلفن ثابت:  </span>
                                    <span>{userData?.addresses?.[0]?.tel}</span>
                                </td>
                                <td>
                                    <span>	 پست الکترونیک:</span>
                                    <span>{userData?.addresses?.[0]?.email}</span>
                                </td>
                                <td>
                                    <span>تلفن همراه:  </span>
                                    <span>{userData?.addresses?.[0]?.mobile}</span>
                                </td>
                                <td>
                                    <span>	 کد پستی:  </span>
                                    <span>{userData?.addresses?.[0]?.postalCode}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-right mt-4">
                        <h5>اطلاعات محل کار</h5>
                        <table className={'table table-compact w-full'}>
                            <tbody>
                            <tr>
                                <td>
                                    <span> عنوان شغل:  </span>
                                    <span>{userData.jobInfo?.companyName ? userData.jobInfo?.companyName : 'ناموجود'}</span>
                                </td>
                                <td>
                                    <span>تلفن محل کار:  </span>
                                    <span>{userData?.jobInfo?.companyCityPrefix + '-' + userData?.jobInfo?.companyPhone}</span>
                                </td>
                                <td>
                                    <span> نشانی محل کار:  </span>
                                    <span>{userData?.jobInfo?.companyAddress}</span>
                                </td>
                                <td>
                                    <span> نمابر:  </span>
                                    <span>{userData?.jobInfo?.companyFax}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-right mt-4">
                        <h5>اطلاعات حساب بانکی</h5>
                        <table className={'table table-compact w-full'}>
                            <tbody>
                            <tr>
                                <td>
                                    <span> نام بانک:  </span>
                                    <span>{userDefaultBank.bank?.name}</span>
                                </td>
                                <td>
                                    <span>نام صاحب حساب:  </span>
                                    <span>{userData?.privatePerson?.firstName + '-' + userData?.privatePerson?.lastName}</span>
                                </td>
                                <td>
                                    <span> نوع حساب:  </span>
                                    <span>{accountTypeEnums.find((item: any) => item.id === userDefaultBank?.type)?.faTitle}</span>
                                </td>
                                <td>
                                    <span>  نام شعبه:  </span>
                                    <span>{userDefaultBank?.branchName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span> کد  شعبه:  </span>
                                    <span>{userDefaultBank?.branchCode}</span>
                                </td>
                                <td>
                                    <span>شماره‌حساب:  </span>
                                    <span>{userDefaultBank?.accountNumber}</span>
                                </td>
                                <td>
                                    <span>  شماره شبا:  </span>
                                    <span>{userDefaultBank?.sheba}</span>
                                </td>
                                <td>
                                    <span>  نام شعبه:  </span>
                                    <span>{userDefaultBank?.branchName}</span>
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
            </div>
        </>
    )
}