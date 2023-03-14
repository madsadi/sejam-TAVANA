import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {jalali} from "../../common/functions";
import {accountTypeEnums} from "../../common/enums";
import {PrinterIcon} from "@heroicons/react/24/outline";
import ReactToPrint from "react-to-print";
import moment from "jalali-moment";

export default function OfflineTradingAgreement(){
    const {userData,userDefaultBank} = useContext<any>(SejamContext)
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
                </svg>:<PrinterIcon className={'h-5 w-5 mr-2'}/>}
            </button>
        ); // eslint-disable-line max-len
    }

    return(
        <>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="قرارداد معاملات اینترنتی "
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <div className={'leading-8 text-justify'}>
                <div className="text-center">
                    <h4>قرارداد معاملات اینترنتی </h4>
                </div>

                <div >
                    <p>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        این توافقنامه در اجراي ماده 24 آیین‌نامه "معاملات در بورس اوراق بهادار تهران" بین شرکت کارگزاري
                        توانا
                        (مشاوران سهام سابق) و مشتري حقیقی با مشخصات زیر:
                    </p>
                    <table className={'table table-compact w-full'}>
                        <tbody>
                        <tr>
                            <td>
                                <span> نام:</span>
                                <span>{userData.privatePerson?.firstName}</span>
                            </td>
                            <td>
                                <span>نام پدر:</span>
                                <span>{userData?.privatePerson?.fatherName}</span>
                            </td>
                            <td>
                                <span>شماره تلفن همراه:</span>
                                <span>{userData?.addresses?.[0]?.mobile}</span>
                            </td>
                            <td>
                                <span> نام خانوادگی:</span>
                                <span>{userData.privatePerson?.lastName}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>کد ملی:</span>
                                <span>{userData.uniqueIdentifier}</span>
                            </td>
                            <td>
                                <span>آدرس پست الکترونیکی:</span>
                                <span>{userData?.addresses?.[0]?.email}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <p>منعقد و شرایط آن به شرح زیر تعیین می‌شود. </p>
                </div>

                <div >
                    <h5>ماده 1 </h5>
                    <p>
                        موضوع توافقنامه عبارت است از توافق کارگزار و مشتري جهت خرید یا فروش اوراق بهادار براي مشتري بر اساس
                        سفارش‌هایی که مشتري به صورت الکترونیکی براي کارگزار ارسال می‌کند.
                    </p>
                </div>


                <div >
                    <h5>ماده 2 </h5>
                    <p>
                        مدت این توافقنامه از تاریخ امضاء به مدت نامحدود است و با انصراف هر یک از طرفین و اعلام الکترونیکی یا
                        کتبی
                        آن به طرف مقابل، قابل فسخ می‌باشد.
                    </p>
                </div>
                <div >
                    <h5>ماده 3 </h5>
                    <p>
                        کارگزار 48 ساعت پس از امضاي این توافقنامه، نام کاربر و رمز عبور براي ورود به سایت اینترنتی کارگزاري
                        را
                        با
                        مراجعه حضوري مشتري و یا از طریق اعلام پیامکی یا الکترونیکی در اختیار او قرار می‌دهد. مسئولیت حفظ و
                        مراقبت
                        از نام کاربري و رمز عبور بر عهده مشتري است. در صورت افشاي نام کاربر و رمز عبور، مشتري باید مراتب را
                        به
                        کارگزاري اطلاع داده و تقاضاي صدور نام کاربري و رمز جدید نماید. تا زمانی که این امر توسط مشتري اعلام
                        نشده،
                        کارگزار بابت انجام دستوراتی که از آن نام کاربر و رمز عبور دریافت می‌کند، هیچ مسئولیتی ندارد.
                    </p>
                </div>
                <div >
                    <h5>ماده 4 </h5>
                    <p>
                        در صورت تقاضاي مشتري به تغییر نام کاربر، کارگزار نام قبلی را ابطال و نام کاربر جدید در اختیار مشتري
                        قرار
                        می‌دهد. در هر مورد که کارگزار لازم بداند، تغییر نام کاربر و رمز عبور را اعمال می‌کند و مراتب را
                        بلافاصله
                        از طریق اعلام پیامکی یا الکترونیکی به اطلاع مشتري می‌رساند.
                    </p>
                </div>
                <div >
                    <h5>ماده 5 </h5>
                    <p>
                        مشتري حساب بانکی زیر را جهت واریز وجوه حاصل از فروش اوراق بهادار به کارگزاري اعلام می‌کند.
                    </p>
                    <table className={'table table-compact w-full'}>
                        <tbody>
                        <tr>
                            <td>
                                <span> نام بانک: </span>
                                <span>{userDefaultBank.bank?.name}</span>
                            </td>
                            <td>
                                <span> نوع حساب: </span>
                                <span>{accountTypeEnums.find((item:any)=>item.id===userDefaultBank?.type)?.faTitle}</span>
                            </td>
                            <td>
                                <span> نام شعبه: </span>
                                <span>{userDefaultBank?.branchName}</span>
                            </td>
                            <td>
                                <span> شماره حساب بانکی: </span>
                                <span>{userDefaultBank?.accountNumber}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span> شماره شبا:</span>
                                <span>{userDefaultBank?.sheba}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div >
                    <h5>ماده 6 </h5>
                    <p>
                        مشتري باید گواهینامه موقت اوراق بهادار خود را قبل از سفارش فروش در اختیار کارگزار قرار دهد و کارگزار
                        فقط
                        مجاز به فروش اوراق بهاداري است که گواهینامه موقت آن را در اختیار دارد.
                    </p>
                </div>


                <div >
                    <h5>
                        ماده 7
                    </h5>
                    <p>
                        مشتري می‌تواند گواهینامه موقت اوراق بهاداري را که از طریق الکترونیکی خریداري کرده است حضوري دریافت
                        نماید.
                        دریافت گواهینامه موقت جدید منوط به تحویل گواهینامه قبلی همان سهام به کارگزار است.
                    </p>
                </div>

                <div >
                    <h5>
                        ماده 8
                    </h5>
                    <p>
                        مشتري آدرس پست الکترونیک خود را به شرح فوق جهت ارسال صورت حساب و رمز اینترنتی و سایر موارد در اختیار
                        کارگزاری قرار داده و متعهد می‌شود که حداقل هر 48 ساعت یکبار آن را کنترل نماید.
                    </p>
                </div>

                <div >
                    <h5>
                        ماده 9
                    </h5>
                    <p>
                        در صورت انجام معامله، کارگزار حداقل در پایان هر هفته، گزارشی از صورت وضعیت معاملات مشتري، شامل
                        معاملات
                        انجام شده، وجوه دریافتی و پرداختی و نیز سفارش‌های اجرا نشده خریدوفروش را به طور الکترونیکی براي
                        مشتري
                        ارسال می‌نماید. همچنین، کارگزار باید صورت وضعیت حساب مشتري را حداکثر ظرف 24 ساعت بعد از پایان روزي
                        که
                        معامله براي مشتري انجام می‌شود، در اختیار وي قرار گیرد.
                    </p>
                </div>
                <div >
                    <h5>
                        ماده 10
                    </h5>
                    <p>
                        کارگزار پس از دریافت سفارش خرید یا فروش از مشتري، حداکثر ظرف 1 ساعت، پیام وصول سفارش را براي مشتري
                        ارسال
                        می‌کند. در مواردي که اجراي خرید یا فروش مشتري براي کارگزار غیرممکن باشد، کارگزار می‌باید حداکثر ظرف
                        1
                        روز
                        کاري، مراتب عدم امکان اجراي سفارش و علت آن را به مشتري اعلام نماید.
                    </p>
                </div>
                <div >
                    <h5>
                        ماده 11
                    </h5>
                    <p>
                        سفارش‌های ارسالی توسط مشتري به مدت 5 روز کاري اعتبار دارد و در صورت سپري شده مدت یادشده سفارش باطل
                        می‌شود.
                        تغییر یا اصلاح سفارش مشتري فقط از طریق دستور ابطال سفارش قبلی توسط مشتري ممکن است. در صورت دریافت
                        دستور
                        ابطال مشتري طی ساعات انجام معامله، کارگزار ملزم به اعمال دستور مشتري حداکثر در روز بعد است.
                    </p>
                </div>


                <div >
                    <h5>
                        ماده 12
                    </h5>
                    <p>
                        کارگزار موظف است، داده پیام ‌های دریافتی از مشتري و داده پیام ارسالی به مشتري را در سامانه اطلاعاتی
                        خود
                        ثبت و نگهداري نماید. در صورت بروز اختلاف بین کارگزار و مشتري در خصوص محتوا داده پیام ها، اطلاعات
                        مندرج
                        در
                        سامانه اطلاعاتی کارگزار معتبر و براي طرفین لازم الاتباع است، مشروط بر اینکه اطلاعات با گزارش‌های
                        دوره‌ای
                        ماده 9 مغایر نباشد.
                    </p>
                </div>

                <div >
                    <h5>
                        ماده 13
                    </h5>
                    <p>
                        دستورالعمل اجرایی سفارش‌های الکترونیکی اوراق بهادار مصوب 1383/09/04 هیات مدیره سازمان کارگزاران بورس
                        که در
                        سایت کارگزار انعکاس دارد، براي طرفین این قرارداد لازم الاجراست.
                    </p>
                </div>

                <div >
                    <h5>
                        ماده 14
                    </h5>
                    <p>
                        میزان تخصیص سهام که براي اولین بار عرضه می‌گردد بر اساس ضوابط تعیین شده از طرف سازمان و شرکت بورس و
                        حجم
                        معاملات مشتري نزد کارگزاري مشخص می‌گردد.
                    </p>
                </div>

                <div >
                    <h5>
                        ماده 15
                    </h5>
                    <p>
                        در شرایط فورس ماژور یا مواردي که در اختیار کارگزار نیست، مانند قطعی سیستم، ارتباط اینترنت و خرابی
                        سرور
                        چنانکه سفارشات مشتري انجام نگیرد کارگزار هیچ مسئولیتی نخواهد داشت.
                    </p>
                </div>

                <div >
                    <h5>ماده 16 </h5>
                    <p>
                        اطلاعات نام کاربري و رمز عبور سامانه معاملات اینترنتی شرکت کارگزاري توانا، در پاکت در بسته به شما
                        تحویل
                        می‌گردد و از این تاریخ به بعد مسئولیت کلیه معاملات با حساب اینترنتی شما، بر عهده شخص شما بوده و شرکت
                        کارگزاري توانا هیچ گونه مسئولیتی در خصوص سوءاستفاده از نام کاربري و رمز عبور فوق بر عهده ندارد؛ لذا
                        خواهشمند است در حفظ و نگهداري آن دقت کافی مبذول فرمایید.
                    </p>
                </div>

                <div >
                    اینجانب
                    <span>{userData.privatePerson?.firstName+' '+userData.privatePerson?.lastName}</span>
                    فرزند
                    <span>{userData?.privatePerson?.fatherName}</span>
                    به شماره شناسنامه
                    <span>{userData.uniqueIdentifier}</span>
                    و کد ملی
                    <span>{userData.uniqueIdentifier}</span>
                    متولد
                    <span>{userData?.privatePerson?.placeOfBirth}</span>
                    صادره
                    از
                    <span>{userData?.privatePerson?.placeOfIssue}</span>
                    در تاریخ
                    {moment().locale('fa').format("YYYY/MM/DD")}
                    شناسه کاربري و رمز عبور خود را در پاکت در بسته دریافت کردم.
                </div>
            </div>
        </>
    )
}