import React, {useCallback, useContext, useRef, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {
    accountTypeEnums,
    legalPersonTypeCategoryEnums
} from "../../common/enums";
import ReactToPrint from "react-to-print";
import {PrinterIcon} from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import PageHeaderFooter from "./PageHeaderFooter";
import LabelValue from "../../common/component/LabelValue";

export default function PhoneTradingAgreement(){
    const {userData,userDefaultBank} = useContext<any>(SejamContext)
    const [loading, setLoading] = useState(false);

    const componentRef = useRef(null);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);
    const reactToPrintTrigger = () => {
        return (
            <button className={'flex item-center button bg-red-600 w-fit text-white float-left m-5'}>
                چاپ
                {loading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>:<PrinterIcon className={'h-5 w-5 mr-2'}/>}
            </button>
        ); // eslint-disable-line max-len
    }

    return(
        <>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="قرارداد معاملات تلفنی"
                removeAfterPrint={false}
                trigger={reactToPrintTrigger}
            />
            <div ref={componentRef} className={'mobileAgreement'} >
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
                            <div className={'leading-8 text-justify page'}>
                                <div className="text-center">
                                    <h4>قرارداد معاملات تلفنی</h4>
                                </div>
                                <div>
                                    <div className="mt-5">
                                        <h5>ماده 1- طرفین قرارداد</h5>
                                        <p>
                                            ثبت: 159302 و نمایندگی: آقاي حمیدرضا طریقی با سمت مدیرعامل طبق روزنامه رسمی: 21794، مورخ:
                                            1398/10/18،
                                            محل ثبت: تهران، تاریخ ثبت: 09/11/1378، شماره تلفن: 021-42906، شماره نمابر: 89774797-021، آدرس
                                            سایت
                                            www.tavana.net ، آدرس: تهران،خیابان میرعماد، نبش کوچه ی سوم , روبروی فرمانداری پلاک 10 طبقه ی
                                            دوم
                                            شرقی:
                                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                                            1587946317 و مشتري حقیقی به مشخصات زیر که از این پس در این قرارداد "مشتري" نامیده می‌شود:
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <table className={'table table-compact w-full'}>
                                            <thead>
                                            <tr>
                                                <td><h5>الف) مشتري حقیقی: </h5></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <LabelValue title={'نام و نام خانوادگی'} value={userData?.privatePerson?.firstName + ' ' + userData?.privatePerson?.lastName}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'نام پدر'} value={userData?.privatePerson?.fatherName}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'شماره شناسنامه'} value={userData?.privatePerson?.serial + `/` + userData?.privatePerson?.seriShChar + userData?.privatePerson?.seriSh}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'کد ملی'} value={userData?.uniqueIdentifier}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <LabelValue title={'تلفن ثابت'} value={userData?.addresses?.[0]?.tel}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'کد پستی منزل'} value={userData?.addresses?.[0]?.fax}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'شماره تلفن همراه'} value={userData?.addresses?.[0]?.mobile}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'آدرس پست الکترونیکی'} value={userData?.addresses?.[0]?.email}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <LabelValue title={' نام بانک'} value={userDefaultBank?.bank?.name + ' ' + (userDefaultBank?.branchCode ? userDefaultBank?.branchCode : '')}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'شماره‌حساب بانکی'} value={userDefaultBank?.accountNumber}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'آدرس منزل'} value={userData?.addresses?.[0]?.remnantAddress}/>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <table className={'table table-compact w-full'}>
                                            <thead>
                                            <tr>
                                                <td><h5>ب) مشتري حقوقی:</h5></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <LabelValue title={'نام'} value={userData?.legalPerson?.companyName}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'شماره ثبت'} value={userData?.legalPerson?.registerNumber}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'محل ثبت'} value={userData?.legalPerson?.registerPlace}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'تاریخ ثبت'} value={userData?.legalPerson?.registerDate}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <LabelValue title={'نوع شخصیت'} value={legalPersonTypeCategoryEnums.find((item: any) => item.id === userData?.legalPerson?.legalPersonTypeCategory)?.title}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'نشانی پست الکترونیک'} value={userData?.legalPerson ? userData?.addresses?.[0]?.email:''}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <LabelValue title={'شماره حساب بانکی'} value={userData?.legalPerson ? userDefaultBank?.accountNumber:''}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'شماره شبا'} value={userData?.legalPerson ? userDefaultBank?.sheba:''}/>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <table className={'table table-compact w-full'}>
                                            <thead>
                                            <tr>
                                                <td><h5>ج) نماینده حقوقی:</h5></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <LabelValue title={'نام و نام خانوادگی'} value={userData?.agent ? (userData?.agent?.firstName + ' '+ userData?.agent?.lastName):''}/>
                                                </td>
                                                <td>
                                                    <LabelValue title={'کد ملی'} value={userData?.agent?.uniqueIdentifier}/>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className={'mt-12 break-inside-avoid'}>
                                    <p>به شرح مواد آتی منعقد می‌گردد: </p>
                                    <h5>ماده 2-موضوع قرارداد :</h5>
                                    <p>
                                        موضوع قرارداد عبارت است از؛ ثبت و اجراي سفارشات مشتري به منظور خرید و فروش اوراق بهادار، کالا و
                                        اوراق
                                        بهادار مبتنی بر کالا در بورس و بازارهاي خارج از بورس توسط شرکت کارگزاري.
                                    </p>

                                    <p>
                                        <span className="font-weight-bold">تبصره: </span> اجراي موضوع در قالب دستور امضا شده و یا سایر
                                        اشکال؛ اعم
                                        از
                                        تلفنی، آنلاین، اینترنتی، یا...و اعم از
                                        نقدي یا اعتباري بوده و حسب مورد به تشخیص شرکت کارگزار یا الزامات قانونی، انعقاد قرارداد جداگانه نیز
                                        ضروري
                                        است.
                                    </p>


                                    <h5>ماده 3 - مدت قرارداد </h5>
                                    <p>
                                        مدت این قرارداد از تاریخ انعقاد نامحدود است. شرایط خاتمه قرارداد مطابق ماده 11 این قرارداد می‌باشد.
                                    </p>

                                    <h5>
                                        ماده 4-تعهدات شرکت کارگزار
                                    </h5>
                                    <p>4-1- شرکت کارگزار متعهد می‌گردد در صورتی که مشتري کد سهامداري ندارد، پس از تکمیل مدارك درخواستی، توسط
                                        مشتري ظرف مدت سه روز کاري براي وي کد ایجاد نماید. </p>
                                    <p>
                                        4-2- شرکت کارگزار مکلف است نسخه‌ای از کلیه دستورات، فیش‌ها و سایر مدارك مشتري را شده ارائه با رعایت
                                        محرمانه بودن آن طبق مقررات مربوطه، ثبت نماید.
                                    </p>
                                    <p>
                                        4-3- در صورتیکه ارائه برخی خدمات به مشتري، حسب تشخیص شرکت کارگزار یا مقررات مربوطه، مستلزم انعقاد
                                        قرارداد
                                        مجزایی باشد، ارائه آن خدمات منوط به انعقاد قرارداد مربوطه بوده قبل از انعقاد آن شرکت کارگزار تکلیفی
                                        در
                                        ارائه خدمات مربوطه نخواهد داشت.
                                    </p>
                                </div>
                                <p>
                                    4-4- پس از دریافت دستور مشتري، شرکت کارگزار مکلف است حسب دستور واصله، با توجه به شرایط بازار، بر اساس
                                    اولویت‌ها مقرر و شرایط قانونی آن را اجرا نماید.
                                </p>
                                <p>
                                    4-5- شرکت کارگزار مکلف است دستورات شده ارائه از سوي نماینده قانونی یا وکیل رسمی مشتري را، مطابق
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    دستورالعمل "نحوه انجام معاملات وکالتی اوراق بهادار" اجرا نماید.
                                </p>
                                <p>
                                    4-6- در صورت درخواست مشتري، شرکت کارگزار مکلف است به نحو مقتضی، وضعیت حساب مشتري و عملیات انجام شده را
                                    در
                                    بازه زمانی مورد درخواست، در اختیار وي قرار دهد.
                                </p>
                                <p>
                                    4-7- شرکت کارگزار مکلف به حفظ اسرار مشتري که حسب اجراي این قرارداد از آن مطلع شده یا در اختیار وي
                                    قرارگرفته، بوده یو نمی‌تواند آن را بدون مجوز قانونی افشا نماید، مگر حسب درخواست مراجع ذیصلاح.
                                </p>
                                <p>
                                    4-8- شرکت کارگزار باید در اجراي موضوع قرارداد کلیه قوانین و مقررات مربوط به انجام معاملات اوراق بهادار
                                    مصوب ارکان ذیصلاح بازار سرمایه ایران را رعایت کند.
                                </p>

                                <h5>
                                    ماده 5-تعهدات مشتري
                                </h5>
                                <p>
                                    1-5- مشتري مکلف به پرداخت مبلغ قرارداد مطابق مفاد ماده 6 این قرارداد و تبصره‌های آن‌هاي می‌باشد.
                                </p>
                                <p>
                                    2-5- مشتري مکلف است وجوه مربوط به هریک از دستورهاي خود را قبل از صدور دستور به حساب شرکت کارگزار واریز
                                    نماید. در صورت ارائه هرگونه دستور فاقد اعتبار یا محل، شرکت کارگزاري می‌تواند از اجراي آن امتناع ورزد.
                                </p>
                                <p>
                                    <span className="font-weight-bold">تبصره: </span> در مورد ماده فوق، با فرض قبول شرکت کارگزار، مشتري به
                                    شرکت
                                    کارگزار وکالت می‌دهد بلافاصله پس از خرید
                                    نقدي اوراق بهادار شده پذیرفته در بورس تهران و فرا بورس ایران، آن را در قالب بیع مرابحه مدت دار به وي
                                    بفروشد. در این حالت با عنایت به حکومت قالب مرابحه، علاوه بر مبلغ قرارداد، مبلغ خرید اوراق بهادار و سود
                                    مرابحه نیز باید به شرکت کارگزار پرداخت گردد.
                                </p>
                                <p>
                                    3-5- مشتري مکلف است کلیه اسناد، مدارك، اطلاعات و مستندات مورد نیاز شرکت کارگزار را جهت احراز هویت و
                                    درج در
                                    سوابق شناسایی مشتري، اجراي قرارداد و یا ارائه به مراجع ذیصلاح قانونی در اختیار شرکت کارگزار قرار دهد.
                                </p>
                                <p>
                                    4-5- کد سهامداري متعلق به مشتري بوده و مسئولیت و صیانت وعدم سوءاستفاده از آن توسط سایرین به هر نحو بر
                                    عهده
                                    مشتري می‌باشد. مشتري همچنین مسئول خسارت‌هایی است که در نتیجه عدم رعایت قوانین و مقررات و مفاد این
                                    قرارداد
                                    توسط وي حادث شود.
                                </p>
                                <p>
                                    5-5- مشتري باید برگه سهام اوراق بهاداري که قصد فروش آن‌ها را دارد در اختیار شرکت کارگزار قرار دهد.
                                </p>
                                <p>
                                    6-5- در مورد معاملاتی که به صورت تلفنی انجام می‌گردند، لازم است مشتري ظرف 48 ساعت پس از انجام معامله
                                    در
                                    محل دفتر شرکت کارگزار حاضر و دستورات مربوطه را امضا نماید.
                                </p>

                                <p>
                                    7-5- درصورتی‌که در شرایط خاصی، چه حسب قرارداد مجزا و چه بدون آن، شرکت کارگزار طبق دستور مشتري اقدام به
                                    انجام معامله بدون واریز وجه نماید، مشتري مکلف است ظرف مهلت 3 روز کاري پس از انجام معامله وجوه مربوطه
                                    را به
                                    حساب شرکت کارگزار واریز نماید. در غیر این صورت شرکت کارگزار می‌تواند پس از انقضاي مهلت قبل از اطلاع از
                                    واریز وجه، جهت تسویه کلیه بدهی‌های مربوطه اقدام به فروش سهام خریداري شده نماید.
                                </p>


                                <p>
                                    <span className="">تبصره:</span> در مورد خریدهاي اعتباري، مهلت 3 روزه از تاریخ ارسال اخطاریه کسري حساب
                                    تضمین
                                    موضوع ماده 11
                                    دستورالعمل خرید اعتباري اوراق بهادار در بورس اوراق بهادار تهران و فرا بورس ایران آغاز می‌گردد و خاتمه
                                    مدت
                                    قرارداد مربوطه مانع از اجراي مفاد این ماده نخواهد بود.
                                </p>
                                <p>
                                    8-5- مشتري متعهد می‌گردد تا قبل از تسویه کلیه بدهی‌های مربوط به اوراق بهادار خریداري شده نزد شرکت
                                    کارگزار،
                                    از تغییر کارگزار ناظر آن اوراق خودداري نموده و در غیر این صورت شرکت کارگزار می‌تواند جهت تسویه بدهی‌های
                                    مشتري سایر اوراق بهادار وي را به فروش رسانده و آن را تسویه نماید.
                                </p>
                                <p>
                                    9-5- کلیه قراردادهایی که مشتریان شرکت با اشخاص حقیقی و یا حقوقی دیگر و مدیران و کارکنان شرکت کارگزاري
                                    تحت
                                    عناوینی مثل سبد گردانی، مشارکت در سرمایه‌گذاری و ... منعقد می‌کنند نسبت به شرکت کارگزاري فاقد اثر و
                                    اعتبار
                                    بوده و مسئولیت شرکت تنها در خصوص اسنادي است که مطابق با آخرین اصلاحات روزنامه رسمی به امضاء صاحبان مجاز
                                    رسیده و ممهور به مهر شرکت باشد.
                                </p>
                                <p>
                                    10-5- کلیه ضررها و خسارات احتمالی ناشی از دستورات مشتري، با توجه به ریسک ها و نوسانات قیمت اوراق بهادار،
                                    متوجه مشتري بوده و حق هیچگونه اعتراض یا طرح دعوا نسبت به شرکت کارگزار نداشته و شرکت کارگزار از این بابت
                                    هیچگونه مسئولیتی ندارد.
                                </p>
                                <p>
                                    11-5- مشتري با امضاي این قرارداد، حق واگذاري موضوع قرارداد را به اشخاص ثالث به نحو کلی یا از خود سلب و
                                    ساقط نموده در صورتی که خلاف این موضوع محقق شود، خسارات وارد شده به شرکت کارگزاري و مسئولیت‌های مربوط به
                                    آن
                                    را به طور کامل به عهده خواهد داشت.
                                </p>
                                <div>
                                    <h5>
                                        ماده 6-مبلغ قرارداد و نحوه پرداخت آن
                                    </h5>
                                    <p>
                                        مبلغ قرارداد عبارت است از کلیه کارمزدهاي قانونی، مالیات‌ها و وجوه قانونی مربوطه، جرائم و خسارت‌ها
                                        احتمالی که در ازاي اجراي موضوع قرارداد، توسط مشتري به شرکت کارگزار پرداخت می‌گردد.
                                    </p>
                                    <p>
                                        <span className="font-weight-bold">تبصره 1: </span> مبالغ مندرج در این ماده و تبصره هاي آن، رأساً
                                        توسط
                                        شرکت
                                        کارگزار طبق قرارداد از وجوه متعلق به
                                        مشتري کسر شده و مشتري حق هرگونه اعتراض یا ادعا را در این خصوص به طور کامل از خود ساقط می‌نماید.
                                    </p>
                                    <p>
                                        <span className="font-weight-bold"> تبصره 2: </span> در صورت تنظیم قراردادهاي جداگانه؛ موضوع بند 3
                                        ماده 4
                                        علاوه قرارداد حاضر، علاوه بر لازم الرعایه
                                        بودن موارد اختصاصی مندرج در آن و مفاد دستورالعمل‌های مربوطه، مفاد این ماده و تبصره‌های آن ماده آن
                                        نیز
                                        لازم الاّتباع است.
                                    </p>
                                </div>

                                <div>
                                    <h5>
                                        ماده 7-سایر شرایط
                                    </h5>
                                    <p>
                                        7-1- مشتري به منظور خرید اوراق بهادار و کالا و پرداخت هزینه‌های معاملات به یکی از حساب‌های بانکی
                                        مشخص
                                        شرکت کارگزار واریز و اصل فیش مربوطه به شرکت کارگزار ارائه می‌گردد.
                                    </p>
                                    <p>
                                        7-2- تمامی وجوه حاصل از فروش اوراق بهادار مشتري توسط شرکت کارگزار به حساب بانکی مشتري با مشخصات زیر
                                        واریز می‌گردد:
                                    </p>
                                    <table className={'table table-compact w-full'}>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <LabelValue title={"نام بانک"} value={userDefaultBank?.bank?.name}/>
                                            </td>
                                            <td>
                                                <LabelValue title={"نوع حساب"} value={accountTypeEnums.find((item:any)=>item.id===userDefaultBank?.type)?.faTitle}/>
                                            </td>
                                            <td>
                                                <LabelValue title={"نام شعبه"} value={userDefaultBank?.branchName}/>
                                            </td>
                                            <td>
                                                <LabelValue title={"شماره حساب بانکی"} value={userDefaultBank?.accountNumber}/>
                                            </td>
                                            <td>
                                                <LabelValue title={"شماره شبا"} value={userDefaultBank?.sheba}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <h5>
                                        ماده 8-فورس ماژور
                                    </h5>
                                    <p>
                                        در صورت بروز حوادث خارج از اراده شرکت کارگزار از قبیل هرگونه ایرادات یا اشکالات سیستمی، بسته بودن
                                        نمادها،
                                        محدودیت‌های شرکت کارگزار یا ناشر و دستورات مراجع ذیصلاح، سایر موانع قانونی و... شرکت کارگزار تعهدي
                                        در
                                        اجراي موضوع قرارداد نداشته و هیچگونه مسئولیتی متوجه وي نخواهد بود.
                                    </p>
                                </div>

                                <div>
                                    <h5>ماده 9-اقامتگاه قانونی </h5>
                                    <p>
                                        اقامتگاه قانونی شرکت کارگزاری و مشتري همان است که در ماده 1 قرارداد نوشته شده است. در صورتیکه که یکی
                                        از
                                        طرفین، اقامتگاه خود را تغییر دهد باید نشانی خود را ظرف مدت 3 روز کاري پیش از تغییر به طرف دیگر اطلاع
                                        دهد.
                                    </p>
                                    <p>
                                        <span className="font-weight-bold">تبصره: </span> در صورت تغییر اقامتگاه هر یک از طرفین قرارداد وعدم
                                        اطلاع
                                        به طرف مقابل هرگونه اخطاریه، اوراق و
                                        اسناد ارسالی که در ارتباط با این قرارداد به آخرین اقامتگاه اعلامی مطابق این ماده ارسال شود، به منزله
                                        ابلاغ رسمی تلقی شود.
                                    </p>
                                </div>

                                <div>
                                    <h5>
                                        ماده 10 -خاتمه قرارداد
                                    </h5>
                                    <p>
                                        قرارداد در موارد ذیل خاتمه می‌یابد:
                                    </p>
                                    <p>
                                        1-10- ابطال یا لغو مجوز شرکت کارگزار توسط مراجع ذیصلاح؛
                                    </p>
                                    <p>
                                        2-10- ممنوعیت مشتري از انجام معامله با حکم مراجع ذیصلاح؛
                                    </p>
                                    <p>
                                        3-10- موت، حجر یا ورشکستگی مشتري شخص حقیقی / انحلال یا ورشکستگی مشتري شخص حقوقی؛
                                    </p>
                                    <p>
                                        4-10- فسخ قرارداد توسط مشتري با اعلام کتبی از 3 روز کاري قبل.
                                    </p>
                                    <p>
                                        <span className="font-weight-bold">تبصره: </span> در این صورت تاریخ فسخ، 3 روز کاري پس از ابلاغ کتبی
                                        تصمیم
                                        مشتري مبنی بر فسخ قرارداد به شرکت کارگزار می‌باشد.
                                    </p>
                                </div>

                                <div>
                                    <h5>
                                        ماده 11 -حل اختلاف
                                    </h5>
                                    <p>
                                        رسیدگی به اختلافات بین مشتري و شرکت کارگزار مطابق قانون بازار اوراق بهادار مصوب آذرماه سال 1384 در
                                        صورت
                                        عدم سازش در کانون‌های مربوطه در صلاحیت هیئت داوري موضوع مادة 36 قانون فوق خواهد بود.
                                    </p>
                                </div>
                                <div>
                                    <h5>
                                        ماده 12 -قانون حاکم بر قرارداد
                                    </h5>
                                    <p>
                                        این قرارداد مطابق ماده 10 قانون مدنی تنظیم و تابع شرایط مندرج در متن قرارداد و سایر قوانین و مقررات
                                        جاري
                                        کشور می‌باشد. این قرارداد در 12 ماده و در 2 نسخه واحد الاعتبار در تاریخ
                                        {moment().locale('fa').format("YYYY/MM/DD")}
                                        توسط طرفین قرارداد منعقد شد و یک نسخه به شرکت کارگزاري و یک نسخه به مشتري
                                        تحویل
                                        گردید.
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