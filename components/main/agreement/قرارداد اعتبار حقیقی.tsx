import React, { useCallback, useContext, useRef, useState } from "react";
import { SejamContext } from "../../../pages/main";
import ReactToPrint from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import PageHeaderFooter from "./page-header-footer";
import { useSWRConfig } from "swr";
import { IDP_URL } from "../../../api/constants";

export default function PrivatePersonValue() {
  const { userData } = useContext<any>(SejamContext);
  const [loading, setLoading] = useState(false);
  const { cache } = useSWRConfig();
  const idpInfo = cache.get(`${IDP_URL}/api/users/GetCurrentUserInfo`);

  const componentRef = useRef(null);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = () => {
    return (
      <button
        className={
          "flex item-center button bg-red-600 w-fit text-white float-left m-5"
        }
      >
        چاپ
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <PrinterIcon className={"h-5 w-5 mr-2"} />
        )}
      </button>
    ); // eslint-disable-line max-len
  };

  console.log(userData);

  return (
    <>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="قرارداد خرید اعتباری "
        removeAfterPrint={false}
        trigger={reactToPrintTrigger}
      />
      <div ref={componentRef} className={"mobileAgreement"}>
        <table className={"w-full"} dir={"rtl"}>
          <thead>
            <tr>
              <td>
                <div className="page-header-space">&nbsp;</div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={"w-full content"}>
                <div className={"leading-8 text-justify page"}>
                  <div className="text-center">
                    <h4 className={"mb-5"}>قرارداد خرید اعتباری </h4>
                    <p className={"mb-5"}>مقدمه</p>
                  </div>
                  <p>
                    بر مبنای دستورالعمل خرید اعتباری اوراق بهادار در بورس اوراق
                    بهادار تهران و فرابورس ایران مصوب 09/10/1391 هیأت &lrm;
                    مدیرة سازمان، این قرارداد بین &lrm;
                    <span className="font-bold">
                      شرکت کارگزاری توانا(سهامی خاص)
                    </span>
                    &lrm; به شماره ثبت 159302 به نمایندگی آقای &lrm;
                    <span className="font-bold ml-2">
                      حمیدرضا طریقی (مدیرعامل)
                    </span>
                    و آقای &lrm;
                    <span className="font-bold">
                      {" "}
                      سعید اسمعیلی (نائب رئیس هیات مدیره)
                    </span>
                    ، به نشانی : خیابان مطهری، خیابان میر عماد، نبش کوچه سوم،
                    پلاک 10 کدپستی 1587946317 ، شماره تلفن: 42906 ، شماره نمابر:
                    89774797 ،
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    نشانی سایت اینترنتیtavanaco.ir ، که از این پس در این قرارداد
                    `کارگزار اعتبار دهنده` &lrm; نامیده می‌شود به عنوان طرف اول
                    و &lrm; &lrm;آقاي/خانم:&lrm; &lrm;
                    <span className="font-bold">
                      {userData?.privatePerson?.firstName +
                        " " +
                        userData?.privatePerson?.lastName}
                    </span>{" "}
                    و &lrm; فرزند: {userData?.privatePerson?.fatherName}&lrm;
                    &lrm; به شماره شناسنامه: {userData?.privatePerson?.shNumber}
                    &lrm; &lrm; محل صدور:{" "}
                    {userData?.privatePerson?.placeOfBirth}&lrm; &lrm; دارای
                    کدملی: {userData?.uniqueIdentifier}&lrm; &lrm; ، دارای کد
                    بورسی:{" "}
                    {
                      userData?.tradingCodes.find(
                        (item: any) => item.type === "StockExchange"
                      )?.code
                    }
                    &lrm; &lrm; به نشانی :{" "}
                    {userData?.addresses?.[0]?.province.name +
                      ", " +
                      userData?.addresses?.[0]?.city.name +
                      ", " +
                      userData?.addresses?.[0]?.section.name +
                      ", " +
                      userData?.addresses?.[0]?.remnantAddress +
                      ", " +
                      userData?.addresses?.[0]?.alley +
                      ", " +
                      userData?.addresses?.[0]?.plaque}
                    &lrm; &lrm; کدپستی: {userData?.addresses?.[0]?.postalCode}
                    &lrm; &lrm; شماره تماس: {userData?.addresses?.[0]?.tel}&lrm;
                    &lrm; نشانی پست الکترونیکی:{" "}
                    <span className="font-english">
                      {idpInfo?.result?.email}
                    </span>
                    &lrm; که از این پس در این قرارداد مشتری نامیده می شود از طرف
                    دیگر به شرح منعقد می گردد.
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      2 . در این قرارداد سازمان بورس و اوراق بهادار اختصاراً
                      `سازمان`، شرکت بورس اوراق
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      بهادار تهران اختصاراً "بورس "، شرکت فرابورس ایران اختصاراً
                      `فرابورس ` ، شرکت
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      سپرده‌گذاری مرکزی اوراق بهادار و تسویه وجوه ایران اختصاراً
                      `شرکت سپرده‌گذاری
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      مرکزی"،کانون کارگزاران بورس و اوراق بهادار اختصاراً
                      `کانون`، قوانین، مصوبات هيأت وزيران، شورای عالی بورس و
                      اوراق بهادار، سازمان، بورس، فرابورس، کانون، کمیته پایش
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      ریسک بازار و سایر مراجع ذیصلاح اختصاراً "مقررات" نامیده
                      شده‌اند.
                    </p>
                    <p>
                      3 . دستورالعمل خرید اعتباری اوراق بهادار در بورس اوراق
                      بهادار تهران و فرابورس ایران، مصوب 09/10/1391 هیأت مدیرة
                      سازمان و اصلاحات بعدی آن و سایر مصوبات هیات مدیره سازمان
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      و کمیته پایش ریسک بازار در این خصوص، در این قرارداد
                      `دستورالعمل خرید اعتباری` نامیده می‌شود و تعاریف آن در این
                      قرارداد به همان مفاهیم به کار رفته‌اند.
                    </p>
                  </p>
                  <div className="text-right">
                    <div>
                      <h5>ماده 1 - موضوع قرارداد</h5>
                      <p>
                        موضوع قرارداد، تخصیص اعتبار به مشتری توسط کارگزار
                        اعتباردهنده صرفاً به منظور خرید سهام و واحدهای
                        سرمایه‌گذاری صندوق‌های سرمایه‌گذاری قابل معامله (با
                        درآمد ثابت، در سهام و مختلط) در بورس و بازارهای اول، دوم
                        و بازار ابزارهای نوین مالی فرابورس و مطابق مفاد
                        دستورالعمل خرید اعتباری است.
                      </p>
                    </div>
                  </div>
                  <p>
                    انعقاد این قرارداد مشتري را مکلف نمی‌سازد تا صرفاً از خدمات
                    کارگزار طرف این قراردادتبصره 1: اعتبار تخصیص یافته به موجب
                    این قرارداد صرفاً قابل استفاده برای خرید اوراق بهادار قابل
                    معامله در بورس و فرابورس خواهد بود و به هیچ وجه به صورت نقد
                    به حساب مشتری منظور نخواهد شد.
                  </p>
                  <p>
                    تبصره 2: چنانچه پس از انعقاد این قرارداد و طبق مقررات، اوراق
                    بهاداری که می‌توان مطابق این قرارداد برای خرید آنها اعتبار
                    تخصیص داد، تغییر کند، تغییرات مزبور در خصوص موضوع این ماده
                    نیز اعمال خواهد شد.
                  </p>

                  <div>
                    <h5>مادۀ 2 - مدت قرارداد</h5>
                    <p>
                      این قرارداد از تاریخ امضاء توسط طرفین به مدت نامحدود
                      اعتبار دارد.
                    </p>
                    <p>
                      تبصره: چنانچه قرارداد فسخ یا منفسخ گردد، مشتری و یا قائم
                      مقام او باید حداکثر یک روز کاری پس از تاریخ فسخ یا انفساخ،
                      نسبت به بازپرداخت کلیه بدهی‌های ناشی از این قرارداد اقدام
                      نماید. در غیر اینصورت کارگزار اعتباردهنده باید از محل
                      تضامین موضوع این قرارداد نسبت به تسویه مطالبات خود اقدام
                      کند.
                    </p>
                  </div>

                  <h5>مادۀ 3 - مبلغ موضوع قرارداد</h5>
                  <p>
                    سقف اعتبار تخصیصی به مشتری بابت خرید اعتباری در مدت قرارداد،
                    حداکثر معادل ماندۀ حساب تضمین مشتری که طبق دستورالعمل خرید
                    اعتباری محاسبه می‌شود یا سقف مندرج در ماده 4 دستورالعمل خرید
                    اعتباری، هر کدام کمتر باشد، خواهد بود.
                  </p>
                  <p>
                    تبصره 1: کارگزار اعتباردهنده می‌تواند با صلاحدید و بر اساس
                    رویه‌های داخلی خود و با رعایت سقف‌های مندرج در این ماده
                    میزان اعتبار تخصیصی به هر مشتری را در هر زمان تعیین یا تعدیل
                    نماید.{" "}
                  </p>
                  <p>
                    تبصره 2: از تاریخ انعقاد این قرارداد، چنانچه به هنگام ارائه
                    سفارش خرید از سوی مشتری منابع مالی لازم توسط مشتری تامین
                    نشده باشد، کارگزار اعتباردهنده چنین درخواستی را تابع مفاد
                    این قرارداد تلقی می‌کند و احکام این قرارداد و دستورالعمل
                    خرید اعتباری در خصوص آن سفارش خرید اعمال خواهد شد.
                  </p>
                  <p>
                    تبصره 3: نظر به اینکه کارگزار اعتباردهنده از محل تسهیلات اخذ
                    شده از بانکها و موسسات مالی و اعتباری مجاز اقدام به تخصیص
                    اعتبار به مشتری مینماید، به هنگام بازپرداخت، هزینه اخذ
                    تسهیلات مزبور و سایر هزینه‌های مربوطه به مبلغ این قرارداد
                    افزوده میشود و مشتری ضمن عقد خارج لازم در خصوص مبالغ مزبور
                    حق هرگونه اعتراض و طرح هرگونه دعوی و شکایتی را از خود سلب و
                    اسقاط مینماید.{" "}
                  </p>

                  <div>
                    <h5>مادۀ 4 - حقوق و تعهدات طرفین </h5>
                    <p>
                      1-مشتری موظف است مانده بدهی خود را بابت خرید اعتباری
                      حداکثر تا تاریخ بیستم شهریور ماه هر سال یا حداکثر ظرف دو
                      هفته از تاریخ ایجاد بدهی ناشی از اولین خرید اعتباری اوراق
                      بهادار، هر کدام زودتر باشد، به کارگزار اعتباردهنده پرداخت
                      نماید. همچنین در صورتی که در مورد خرید اعتباری خاصی، پیش
                      از خرید توسط کارگزار اعتباردهنده کتباً مهلت تسویه بدهی
                      کمتر از این مدت معین شده باشد، مشتری باید در موعد مقرر،
                      بدهی مورد نظر را پرداخت نماید. در صورت عدم تسویه بدهی در
                      موعد مقرر، کارگزار اعتباردهنده اختیارات مندرج در
                      دستورالعمل خرید اعتباری را برای تسویه بدهی خود از طریق
                      تضامین مشتری خواهد داشت. در صورتی که کارگزار اعتباردهنده
                      از این اختیار خود ظرف مدت 5 روز کاری به جز در موارد فورس
                      ماژور استفاده نکند، این امر به منزله تمدید دوره تسویه
                      اعتبار مندرج در این بند برای یک دوره خواهد بود.
                    </p>
                    <p>
                      2-امضای این قرارداد به معنی الزام کارگزار اعتباردهنده به
                      پذیرش درخواست بدون قید و شرط خرید اعتباری مشتری نیست و در
                      هر درخواست خرید اعتباری، کارگزار اعتباردهنده اختیار دارد
                      نسبت به خرید یا عدم خرید اعتباری به نام مشتری، به صلاحدید
                      خود تصمیم‌گیری نماید. کارگزار اعتباردهنده در صورت تصمیم به
                      عدم اجرای درخواست خرید اعتباری مشتری از محل اعتبار تخصیصی
                      و یا تعیین موعد بازپرداخت کمتر از آنچه به موجب بند قبل این
                      ماده تعیین شده است، باید موضوع را از طرق مندرج در ماده 5
                      این قرارداد به اطلاع مشتری برساند.{" "}
                    </p>
                    <p>
                      3-کارگزار اعتباردهنده، میزان بدهی و ماندۀ به روزرسانی شدۀ
                      حساب تضمین و کسری یا اضافۀ تضامین مشتری را در پایان هر روز
                      کاری، از طریق سایت اینترنتی و با رمز و نام کاربری که در
                      اختیار مشتری می‌گذارد، در دسترس مشتری قرار می‌دهد.
                    </p>
                    <p>
                      4-مشتری با امضای این قرار داد کلیه خرید و فروش های صورت
                      گرفته و نیز تشریفات قانونی آن از قبیل گردش حساب معاملاتی،
                      دستورهای خرید و فروش، تغییر ناظر، فریز، رفع فریز و ...تا
                      این تاریخ را مورد قبول قرار داده و محاسبات کارگزاری در
                      تمامی موارد، قطعی و غیر قابل اعتراض می باشد.
                    </p>
                    <p>
                      5-تکلیف کارگزار صرفاً اجرای سفارش ها و دستورات مشتری در
                      حدود قانون است و کارگزار در مورد نتایج و تبعات اقتصادی
                      معاملاتی که به درخواست مشتری و به نام او انجام می دهد،
                      مسئولیتی ندارد.ضمناً مشتری با علم و آگاهی کامل از قوانین و
                      مقررات و دانش کافی در خصوص معاملات بورسی اقدام به ارائه
                      سفارش می کند و از این بابت کارگزار تعهدی نسبت به اطلاع
                      رسانی و ارائه مشاوره ندارد.
                    </p>
                    <p>
                      6-سهام و حق تقدم سهام و سایر اوراق بهادار پذیرفته شده در
                      بازار بورس تهران ویا بازار اول یا بازار ابزارهای نوین مالی
                      فرابورس ایران با رعایت شرایط مربوط مندرج در ماده 6
                      دستورالعمل خرید اعتباری اوراق بهادار در بورس اوراق بهادار
                      تهران و فرابورس ایران به عنوان تضامین بدهی تجاری مشتری
                      قابل قبول می باشد.
                    </p>
                    <p>
                      7-اوراق بهادار خریداری شده مشتریان بدون واریز وجه و به
                      واسطه اعتبار استفاده شده از وجوه کارگزار، در حکم اوراق
                      بهادار وثیقه به نفع کارگزار اعتبار دهنده محسوب می شود و
                      شرکت سپرده گذاری مرکزی در خصوص ادعاهای اشخاص ثالث صرفاً به
                      توقیف مازاد اوراق بهادار هر مالک نسبت به حساب تضمین مالک
                      مزبور اقدام خواهد کرد. مشتری اختیار تغییر کارگزار ناظر
                      اوراق بهادار را که مطابق دستورالعمل خرید اعتباری یا به
                      موجب این توافق به عنوان تضامین بدهی تجاری وی منظور شده
                      است، از خود سلب می نماید.
                    </p>
                    <p>
                      8-مشتری تعهد می نماید برگه سهام اوراق بهاداری را که به
                      واسطه اعتبار نزد کارگزار اعتبار دهنده خریداری نموده است
                      ولی به هر دلیلی ناظر آن اوراق بهادار به کارگزار دیگر
                      انتقال یافته است را حداکثر ظرف یک روز کاری به کارگزار
                      اعتبار دهنده ارائه و فرم تغییر ناظر را تکمیل نماید.
                    </p>
                    <p>
                      9-مشتری اقرار می نماید اوراق بهادار موضوع تضامین بدهی
                      تجاری، در تملک وی بوده و حقوق مالکانه آن به عللی از جمله
                      وثیقه شدن، مسدود شدن یا ممنوع المعامله شدن، محدود نشده
                      باشد. در صورتی که اوراق بهادار منظور شده به عنوان تضامین
                      بدهی تجاری مشتری فاقد اوصاف ذکر شده باشند، کارگزار
                      اعتباردهنده خرید اعتباری برای مشتری را تا جایگزین کردن
                      اوراق بهادار جدید متوقف نماید. مشتری در این صورت مکلف است
                      تا ظرف 24 ساعت از تاریخ اخطار کارگزار اعتباردهنده، نسبت به
                      جایگزینی اوراق بهادار دارای اوصاف مندرج در این بند اقدام
                      نماید. در غیر این صورت حساب تضمین مشتری، بدون احتساب اوراق
                      مزبور محاسبه میگردد و در صورت کسری حساب تضمین، به ترتیب
                      مندرج در دستورالعمل و قرارداد اعتباری اقدام خواهد شد.
                      بدیهی است در اینصورت مشتری مسئول جبران کلیه خسارات وارده
                      ناشی از اظهارات خلاف واقع خود خواهد بود.
                    </p>
                    <p>
                      -درصورتیکه ارزش تضامین فریزشده مشتری به هر دلیل از جمله
                      فروش، کاهش ارزش بازار و یا اقدامات شرکتی (افزایش سرمایه یا
                      توزیع سود)، از حداقل موردانتظار کارگزاری کمتر شود، و یا
                      نماد معاملاتی تضامین فریز شده مشتری متوقف شود، شرکت
                      کارگزاری به انتخاب خود از میان دارایی های تشکیل دهنده
                      پرتفوی مشتری، شرط حداقل فریز مورد انتظار خود را تامین
                      خواهد کرد.
                    </p>
                    <p>
                      11-مشتری نمی تواند تازمان تسویه کامل بدهی خود از طریق شرکت
                      سپرده گذاری مرکزی اوراق بهادار در مورد اوراق بهاداری که
                      مازاد بر حساب تضمین وی می باشد اقدام به تغییر کارگزار ناظر
                      نماید.
                    </p>
                    <p>
                      -در راستای اجرای مفاد این قرارداد و تا زمانی که بدهی مشتری
                      به طور کامل تسویه نشده است، کارگزار اعتباردهنده می‌تواند
                      نسبت به جلوگیری از تغییر کارگزار ناظر هر یک از اوراق
                      بهادار مشتری(فریز کردن) اقدام نماید و مشتری با امضای این
                      قرارداد ضمن عقد خارج لازم ملتزم می‌گردد تا چنانچه کارگزار
                      اعتباردهنده نسبت به جلوگیری از تغییر کارگزار ناظر هر یک از
                      اوراق بهادار مشتری(فریز کردن) اقدام نماید، اعتراضی نداشته
                      باشد. این اوراق تا زمانی که مشتری نسبت به تسویه حساب بدهی
                      خود اقدام نکرده است، فریز باقی خواهند ماند.
                    </p>
                    <p>
                      13-مشتری ضمن عقد خارج لازم، کارگزار اعتباردهنده را به
                      عنوان وکیل و وصی پس از فوت خود قرار می‌دهد تا در صورت عدم
                      ایفای تعهدات مشتری مطابق مفاد این قرارداد و دستورالعمل
                      خرید اعتباری، کارگزار اعتباردهنده نسبت به استیفای طلب خود
                      از محل تضامین مشتری از جمله فروش اوراق بهادار ، سهام بازار
                      پایه و ... متعلق به مشتری اقدام نماید.
                    </p>
                    <p>
                      14-اختیار تفویض شده در بند قبل مانع از فروش سهام و تسویه
                      اعتبار توسط خود مشتری نبوده و چنانچه کارگزار از اختیار و
                      حق فروش خود استفاده ننماید کلیه خسارات وارده از قبیل خسارت
                      مقطوع قراردادی تا زمان تسویه کامل بدهی های مشتری بر عهده
                      مشتری بوده و به حساب وی شارژ خواهد شد.
                    </p>
                    <p>
                      15-چنانچه مشتری سهامی جهت فروش و تسویه بدهی نزد کارگزار
                      نداشته باشد یا دارایی موجود نزد کارگزار کفاف جبران بدهی وی
                      را ننماید، خسارات وارده ناشی از فعالیت مشتری به هر طریق
                      ممکن قابل پیگیری می باشد.
                    </p>
                    <p>
                      16-کارگزار حق دارد از کلیه تضامین مشتری از قبیل چک، سفته و
                      ... که به هر دلیل و حتی ناشی از قراردادهای دیگر یا سابق که
                      در اختیار دارد استفاده نماید. بدیهی است در این مورد،
                      تضامینی که در اختیار شرکت کارگزاری قرار دارد با انقضای
                      قراردادهای سابق و یا انعقاد قراردادها جدید و مادامیکه به
                      مشتری مسترد نشده است قابلیت استفاده و ارائه به مراجع ذی
                      صلاح جهت احقاق حقوق از دست رفته کارگزار را خواهد داشت.
                    </p>
                    <p>
                      17-مشتری ضمن عقد خارج لازم، کارگزار اعتباردهنده را به
                      عنوان وکیل و وصی پس از فوت خود قرار می‌دهد تا چنانچه مشتری
                      یک روز کاری قبل از پایان مهلت اعمال حق تقدم متعلق به
                      مشتری، نسبت به تأدیه مبلغ پذیره‌نویسی سهام جدید به منظور
                      اعمال آن اقدام نکند، کارگزار اعتباردهنده نسبت به فروش حق
                      تقدم موضوع حساب تضمین اقدام نماید یا مبلغ پذیره‌نویسی را
                      رأساً پرداخت و اقدامات لازم را برای صدور سهام جدید به نام
                      مشتری انجام دهد. در صورت پرداخت مبلغ پذیره‌نویسی از سوی
                      کارگزار اعتباردهنده، مبلغ مزبور به مانده بدهی مشتری نزد
                      کارگزار اعتباردهنده افزوده می‌شود.
                    </p>
                    <p>
                      18-مشتری ضمن عقد خارج لازم، کارگزار اعتباردهنده را به
                      عنوان وکیل و وصی پس از فوت خود قرار می‌دهد تا در خصوص
                      اوراق بهاداری که متولی پرداخت مبلغ اسمی آن در سررسید، شرکت
                      سپرده‌گذاری مرکزی است، نسبت به دریافت مبلغ اسمی از شرکت
                      سپرده‌گذاری مرکزی اقدام نماید. این وجوه طبق شرایط مندرج در
                      این قرارداد به حساب مشتری منظور خواهد شد.
                    </p>
                    <p>
                      19-تا زمانی که مشتری بابت اعتبار تخصیصی به کارگزار
                      اعتباردهنده بدهکار باشد، کلیه مبالغ ناشی از فروش اوراق
                      بهادار مشتری و همچنین مبالغ اسمی اوراق بهادار مشتری که در
                      سررسید آن اوراق توسط شرکت سپرده‌گذاری مرکزی به کارگزار
                      اعتباردهنده پرداخت می‌شود، صرف تسویه مانده بدهی مشتری
                      خواهد شد.
                    </p>
                    <p>
                      20-در کلیه مواردی که کارگزار براساس دستورالعمل های سازمان
                      بورس و شرکت های تابعه نسبت به تسویه بدهی مشتری می پردازد
                      براساس مواد و مفاد این توافق کارگزار از طرف مشتری مأذون
                      تلقی می گردد.
                    </p>
                    <p>
                      21-در صورتیکه کارگزار نتواند رأساً نسبت به فروش، تبدیل به
                      نقد کردن و استفاده از تضامین اقدام کند یا در صورتیکه
                      تضامین مشتری موضوع این بند جهت تسویه کفایت ننماید، یا
                      امکان فروش، نقد کردن و استفاده از آن ممکن نباشد موضوع را
                      در مرجع ذیصلاح طرح و پیگیری خواهد نمود.
                    </p>
                    <p>
                      22-تمامی وجوه مشتری باید به حساب های کارگزار واریز گردد و
                      کارگزار مسئول وجوه واریزی مشتریان به حساب اشخاص ثالث، حتی
                      کارکنان یا مدیران کارگزار نمی باشد.
                    </p>
                    <p>
                      23-پرداخت وجه از سوی مشتری یا وجوه ناشی از فروش اوراق
                      بهادار مشتری یا مبالغ اسمی اوراق بهادار مشتری که در سررسید
                      آن اوراق توسط شرکت سپرده‌گذاری مرکزی به کارگزار
                      اعتباردهنده پرداخت می‌شود، ابتدا به عنوان بازپرداخت هزینه
                      های اخذ تسهیلات بانکی و سایر هزینه‌هایمربوطه منظور خواهد
                      شد و نهایتاً به تسویه اصل اعتبار تخصیص خواهد یافت. چنانچه
                      کارگزار اعتباردهنده برای وصول مطالبات خود مجبور به طرح
                      دعوا و انجام پیگیریهای قضایی و ثبتی گردد، مطالبات کارگزار
                      اعتباردهنده در این خصوص بر سایر مطالبات او تقدم داشته و در
                      ابتدا تسویه خواهد شد.
                    </p>
                    <p>
                      24-در صورتی که به علت تعلیق و توقف نماد معاملاتی و یا هر
                      دلیل دیگری از قبیل لغو یا تعلیق پذیرش برای بیش از 30 روز
                      کاری متوالی امکان معامله بر روی اوراق بهادار موجود در حساب
                      تضمین مشتری وجود نداشته باشد، کارگزار اعتباردهنده می‌تواند
                      اوراق بهادار مزبور را از حساب تضمین مشتری کسر ‌کند. در
                      صورتی که حذف اوراق بهادار مزبور منجر به کسری حساب تضمین
                      مشتری شود، کارگزار اعتباردهنده مطابق دستورالعمل خرید
                      اعتباری و مفاد این قرارداد نسبت به ارسال اخطاریه کسری حساب
                      تضمین اقدام می‌نماید. در صورت بازگشایی نماد اوراق بهادار
                      مزبور و به شرط دارا بودن شرایط مندرج در مقررات لازم الاجرا
                      در زمان بازگشایی، اوراق بهادار مزبور مجدداً در ارزیابی
                      حساب تضمین محاسبه خواهد شد.
                    </p>
                    <p>
                      25-این قرارداد قائم به شخص بوده و مشتری به هر نحو حق
                      انتقال یا واگذاری موضوع قرارداد به شخص یا اشخاص ثالث را
                      ندارد. در صورتی که مشخص شود مشتری این تعهد خود را به هر
                      نحوی نقض نموده، علاوه بر فسخ قرارداد از سوی کارگزار، مشتری
                      متعهد خواهد بود تا شخصاً نسبت به تسویه فوری اعتبارات اخذ
                      شده به موجب این قرارداد و جبران کلیه خسارات وارده به
                      کارگزار اعتباردهنده اقدام نماید.
                    </p>
                    <p>
                      26-کلیه قراردادهایی که مشتریان کارگزار با اشخاص حقیقی یا
                      حقوقی دیگر یا حتی کارکنان و مدیران کارگزار تحت عناوینی مثل
                      سبدگردانی، مشارکت در سرمایه گذاری و... منعقد می کنند نسبت
                      به کارگزار فاقد اثر و اعتبار بوده و مسئولیت شرکت تنها در
                      خصوص اسنادی است که مطابق با آخرین اصلاحات روزنامه رسمی به
                      امضاء صاحبان مجاز رسیده و ممهور به مهر کارگزار باشد.
                    </p>
                    <p>
                      27-در خصوص مشتریان حقوقی، صرف نظر از مستندات مربوط به
                      اشخاص حقوقی از قبیل روزنامه رسمی و .... رویه ای که تاکنون
                      جهت تأیید دستورهای این دسته از مشتریان یا قراردادهای فی
                      مابین جاری بوده مورد تأیید مشتریان حقوقی بوده و مادامی که
                      به صورت رسمی این رویه را تغییر ندهند وتغیرات مذبور را به
                      اطلاع شرکت نرسانده باشد حق اعتراض را از خود سلب و ساقط می
                      نمایند.
                    </p>
                    <p>
                      28-در صورتی که مشتری از سیستم خرید و فروش اینترنتی سامانه
                      معاملات برخط (online) استفاده می نماید، به موجب این بند
                      اظهار می دارد رمز عبور الکترونیکی خود را در پاکت در بسته
                      دریافت نموده و مسئولیت واگذاری آن به سایر اشخاص حقیقی یا
                      حقوقی به عهده مشتری می باشد.
                    </p>
                    <p>
                      29-در صورت عدم خرید و فروش اینترنتی سامانه معاملات برخط
                      (online) مشتری ملزم به دریافت نام کاربری و رمز عبور
                      معاملات اینترنتی می باشد.
                    </p>
                    <p>
                      30-به موجب این قرارداد مشتری ملزم می گردد پس از انجام هر
                      معامله به سامانه معاملات اینترنتی خود مراجعه نماید و
                      مراجعه مشتری به سامانه معاملات اینترنتی و مشاهده حساب خود
                      به منزله تایید معاملات است.
                    </p>
                    <p>
                      31-کارگزار مستحق دریافت کارمزد در معاملات می باشد و مواردی
                      از قبیل فسخ، انفساخ یاابطال معاملات صورت گرفته در تماس
                      سامانه های معاملاتی بورس و فرابورس مانع از این امر نمی
                      باشد و تمامی مشتریان اعم از حقیقی یا حقوقی ملزم به پرداخت
                      کارمزد معاملات و عندالزوم خسارات وارده به کارگزار می
                      باشند.
                    </p>
                    <p>
                      32-چنانچه مشتری به موجب این قرار داد و مادامیکه قرار داد
                      فی مابین پایان نیافته باشد از اعتبار کارگزار استفاده نماید
                      و نسبت به تسویه و واریز وجوه پرداختی توسط کارگزار اقدام
                      ننماید طرفین این قرار داد به موجب این بند خسارت مقطوع قرار
                      داد، ماهانه 9/1 درصد بااحتساب عوارض و مالیات بر ارزش
                      افزوده محاسبه می شود را از زمان استفاده اعتبار تا زمان
                      واریز ویا فروش سهام و تسویه اعتبارات مورد توافق قرار
                      دادند.
                    </p>
                    <p>
                      33-نظر به اینکه کارگزار مطابق با ماده 32 این قرار داد
                      خسارتی را به صورت مقطوع از زمان اخذ اعتبار لغایت تسویه به
                      حساب مشتری شارژ می نماید لذا به هنگام باز پرداخت به هر
                      دلیلی پس از اتمام قرار داد نسبت به تسویه اعتبار و واریز
                      وجه اقدام ننماید خسارت قراردادی روزانه 1/0 درصد مانده
                      بدهی(از زمان اتمام قرار داد لغایت تسویه) افزایش می یابد.
                    </p>
                    <p>
                      34-چنانچه به هر دلیلی اعم از فسخ، انفساخ و یا انقضاء مدت و
                      ... این قرار داد پایان پذیرد کلیه حقوق شرکت کارگزاری توانا
                      به ویژه حق فروش سهام و تضامین مشتری و وجه التزام مقرر در
                      این ماده و نیز تمامی تعهدات و تکالیف مشتری از قبیل تسویه
                      اصل اعتبار و هزینه های تبعی آن و پرداخت وجه التزام مورد
                      توافق تا زمان تسویه اعتبار و بدهی های مشتری باقی می ماند.
                    </p>
                    <p>
                      35-مشتری یک فقره چک به شماره
                      .................................... به مبلغ
                      ..................................... ریال بابت تضمین
                      موضوع این قرار داد صادر و تسلیم کارگزار نموده و شرکت
                      کارگزاری توانا حق دارد جهت تسویه بدهکاری مشتری که با
                      محاسبات شرکت کارگزاری صورت می پذیرد از طریق این چک یا سایر
                      تضامین اقدام نماید.
                    </p>
                    <p>
                      36-سایر حقوق و تعهدات طرفین که در این قرارداد به آن اشاره
                      نشده است بر اساس دستورالعمل خرید اعتباری تعیین شده و مفاد
                      دستورالعمل خرید اعتباری شروط ضمنی این قرارداد محسوب
                      می‌شود. در هر صورت هیچ‌یک از مواد و بندهای این قرارداد
                      نمی‌تواند با مفاد دستورالعمل خرید اعتباری مغایر باشد و در
                      صورت برداشت‌های متفاوت، مفاد دستورالعمل خرید اعتباری حاکم
                      خواهد بود.{" "}
                    </p>
                  </div>

                  <div>
                    <h5>مادۀ 5 - نحوۀ ارسال اخطاریه‌های موضوع این قرارداد</h5>
                    <p>
                      مشتری موظف است به ترتیب مقرر در بند 3 مادۀ 4 این قرارداد،
                      رأساً ماندۀ حساب تضمین، ماندۀ حساب بدهی و کسری تضمین خود
                      را بررسی نموده و نسبت به رفع کسری تضمین در موعد مقرر اقدام
                      نماید. چنانچه مشتری به وظیفه خود در این زمینه اقدام
                      ننماید، کارگزار اعتباردهنده مطابق این قرارداد و دستورالعمل
                      خرید اعتباری اقدام می‌کند. علاوه بر این کارگزار
                      اعتباردهنده به یکی از طرق ذیل که توسط مشتری و کارگزار
                      اعتباردهنده انتخاب شده است، اخطاریه تضمین موضوع دستورالعمل
                      خرید اعتباری را به مشتری ابلاغ می‌کند:
                    </p>
                    <ol className={"list-disc"}>
                      <li> -ابلاغ حضوری</li>
                      <li>
                        - پست الکترونیکی به نشانی:{" "}
                        <span className="font-english">
                          {idpInfo?.result?.email}
                        </span>
                      </li>
                      <li>
                        - ارسال پیامک به شماره : {idpInfo?.result?.phoneNumber}
                      </li>
                      <li>- اعلام در سامانه معاملات بر خط مشتری</li>
                    </ol>
                    <p>
                      تبصره 1- در صورتی که مشتری بیش از یکی از روشهای فوق را
                      انتخاب نماید، ابلاغ اخطاریه به هر یک از روشهای انتخاب شده
                      از سوی مشتری در این قرارداد معتبر خواهد بود.
                    </p>
                    <p>
                      تبصره 2- در صورت ابلاغ اخطاریه به بیش از یک روش تاریخ
                      احتساب مهلت ها موضوع این قرارداد و دستورالعمل خرید اعتباری
                      تاریخ نخستین ابلاغ است.
                    </p>
                    <p>
                      تبصره 3- در صورتی که مشتری روشی غیر از روش حضوری را انتخاب
                      کرده باشد، ارسال داده پیام به نشانی پست الکترونیکی او، یا
                      تماس با شماره اعلام شده توسط مشتری، ارسال پیامک به شماره
                      اعلام شده توسط مشتری یا اعلام در سامانه معاملات برخط
                      مشتری، ابلاغ و دریافت توسط مشتری تلقی خواهد شد، حتی اگر به
                      علتی خارج از اراده کارگزار اعتباردهنده تماس یا ارسال داده
                      پیام منجر به اطلاع واقعی مشتری نشود.
                    </p>
                    <p>
                      تبصره 4- سایر مکاتبات و اخطاریه‌های موضوع این قرارداد و
                      دستورالعمل خرید اعتباری مطابق مفاد و روش مندرج در این ماده
                      ارسال و ابلاغ می‌شود.
                    </p>
                  </div>
                  <div>
                    <h5>مادۀ 6 - فورس ماژور</h5>
                    <p>
                      هرگاه اجرای تمام یا بخشی از قرارداد، به استثنای بازپرداخت
                      تسهیلات در موعد مقرر، به واسطه یک امر خارجی، غیر قابل رفع
                      و غیر قابل پیش‌بینی، غیرممکن شود یا به تأخیر افتد، طرفی که
                      در این وضعیت قرار گرفته است{" "}
                    </p>
                    <p>
                      مسئول جبران خسارات ناشی از عدم اجرا یا تأخیر در اجرای
                      قرارداد نیست. در این صورت وی مکلف است در اسرع وقت (حداکثر
                      7 روز) مراتب را کتباً به طرف مقابل اطلاع دهد.{" "}
                    </p>
                    <p>
                      تبصره: عدم پرداخت بدهی مشتری در موعد مقرر به هر دلیل ولو
                      فورس ماژور از مصادیق نقض قرارداد محسوب می‌شود و در این
                      صورت کارگزار اعتباردهنده از کلیه اختیارات مندرج در ماده 4
                      این قرارداد برخوردار خواهد بود.
                    </p>
                  </div>

                  <div>
                    <h5>مادۀ 7 - فسخ و انفساخ قرارداد</h5>
                    <p>1. در موارد ذیل قرارداد منفسخ می‌شود:</p>
                    <ul>
                      <li>
                        تعلیق یا محرومیت بیش از 30 روز کاری یا لغو مجوز کارگزار
                        توسط مراجع ذی‌صلاح،
                      </li>
                      <li>
                        توقف یا تعلیق مجوز فعالیت کارگزار اعتباردهنده در زمینه
                        خرید اعتباری بیش از 30 روز کاری،
                      </li>
                      <li>
                        غیر فعال شدن کد بورسی مشتری به مدت حداقل ده روز کاری
                        متوالی،
                      </li>
                      <li>ورشکستگی یا انحلال شخصیت حقوقی مشتری،</li>
                    </ul>
                    <p>
                      2. هر یک از طرفین در هر زمان اختیار فسخ قرارداد را با
                      اعلام کتبی از سه روز پیش خواهند داشت.{" "}
                    </p>
                    <p>
                      تبصره 1: همزمان با فسخ قرارداد، هر یک از طرفین موظف به
                      اعلام کتبی مراتب با ذکر دقیق تاریخ فسخ، حسب مورد به طرف
                      مقابل می‌باشد.{" "}
                    </p>
                    <p>
                      تبصره 2: در صورت فسخ یا انفساخ، مفاد این قرارداد،
                      مسئولیت‌ها و وظایف هر یک از طرفین در مورد تعهداتی که از
                      بابت خرید اعتباری قبل از فسخ یا انفساخ قرارداد برای هر یک
                      از طرفین ایجاد شده، تا ایفای کامل آن‌ها بر جای خود باقی
                      است.
                    </p>
                  </div>

                  <div>
                    <h5>مادۀ 8 - حل اختلافات</h5>
                    <p>
                      در صورت بروز اختلاف در تفسیر یا اجرای مفاد تمام یا بخشی از
                      قرارداد ترتیبات مقرر در مواد 36 و 37 قانون بازار اوراق
                      بهادار در مورد حل اختلاف لازم‌الاجرا است.
                    </p>
                  </div>

                  <div>
                    <h5>مادۀ 9 - اقامتگاه قانونی و اطلاعات تماس طرفین</h5>
                    <p>
                      نشانی و اطلاعات تماس طرفین همان است که در مقدمه قرارداد
                      ذکر شده است. هر یک از طرفین در صورت تغییر نشانی و اطلاعات
                      تماس موظف است، نشانی و اطلاعات تماس جدید خود را ظرف مدت
                      حداکثر 7 روز پس از تغییر کتباً به طرف دیگر اطلاع دهد. تا
                      زمانی که نشانی و اطلاعات تماس جدید اعلام نشده، مکاتبات به
                      نشانی قبلی و برقراری ارتباط از طریق اطلاعات تماس قبلی
                      انجام می‌شوند.
                    </p>
                    <p>
                      تبصره: اعلام نشانی و اطلاعات تماس جدید کارگزار اعتباردهنده
                      بر روی سایت اینترنتی کارگزار اعتباردهنده به منزله اعلام آن
                      به مشتری خواهد بود.
                    </p>
                    <p>
                      این قرارداد شامل 9 ماده و 14 تبصره، در دو نسخه که هر دو
                      اعتبار واحد دارند، تنظیم شد و در تاریخ{" "}
                      {moment().locale("fa").format("YYYY/MM/DD")} به امضای
                      طرفین رسید و هریک از طرفین، با امضای نسخه طرف مقابل به
                      دریافت نسخه خود اقرار می‌نماید.
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
        <PageHeaderFooter />
      </div>
    </>
  );
}
