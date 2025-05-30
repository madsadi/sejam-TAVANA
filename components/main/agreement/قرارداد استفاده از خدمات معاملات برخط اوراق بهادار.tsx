import React, { useCallback, useContext, useRef, useState } from "react";
import { SejamContext } from "../../../pages/main";
import { jalali } from "../../common/functions";
import { legalPersonTypeCategoryEnums } from "../../common/enums";
import ReactToPrint from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import PageHeaderFooter from "./page-header-footer";
import LabelValue from "../../common/component/label-value";
import { useSWRConfig } from "swr";
import { IDP_URL } from "../../../api/constants";

export default function OnlineTradingAgreement() {
  const { userData, userDefaultBank } = useContext<any>(SejamContext);
  const { cache } = useSWRConfig();
  const [loading, setLoading] = useState(false);
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
              stroke-width="4"
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

  return (
    <>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="قرارداد استفاده از خدمات معاملات برخط اوراق بهادار"
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
                    <h4>قرارداد استفاده از خدمات معاملات برخط اوراق بهادار</h4>
                  </div>

                  <div>
                    <p>
                      قرارداد حاضـر بین شـرکت کـارگزاري توانـا (مشاوران سـهام
                      سابق) و مشتري به شـرح ذیل منعقـد گردیـد. تعاریف
                      دسـتورالعمل اجرایی معاملات برخط اوراق بهادار در بورس اوراق
                      بهادار تهران و فرا بورس ایران در این قرارداد به همان
                      مفاهیم به کار رفته است.{" "}
                    </p>
                  </div>

                  <div>
                    <h5>ماده 1- طرفین قرارداد عبارتند از</h5>
                    <p>
                      این قرارداد بین شرکت کارگزاري به مشخصات زیر که از این پس
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      در این قرارداد "کارگزاري" نامیده می‌شود:
                    </p>

                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      "شرکت کارگزاري توانـا" (مشاوران سـهام سابق) به شماره ثبت:
                      159302 و نمایندگی: آقاي حمیدرضا طریقی با سمت مدیرعامل، طبق
                      روزنامه رسمی: 21794، مورخ: 1398/10/18، محــل ثبــت: تهران،
                      تاریــخ ثبــت: 1378/11/09، شـــماره تلفــن: 42906-021،
                      شـــماره نمــابر: 89774797-021، آدرس ســـایت:
                      www.tavanaco.ir آدرس: تهران، خیابــان میرعمــاد، نبش کـوچه
                      سـوم, روبروی فرمانــداری پلاـک 10 طبقــه ی دوم شـــرقی ،
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      کد پستی1587946317، که از این پس در این قرارداد "کارگزاری"
                      نامیده می شود، و مشتري حقیقی به مشخصات زیر که از این پس در
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      این قرارداد "مشتری" نامیده می شود:
                    </p>
                  </div>
                  <div className="my-4">
                    <table className={"table table-compact w-full"}>
                      <thead>
                        <tr>
                          <td>
                            <h5>الف) مشتري حقیقی: </h5>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <LabelValue
                              title={"نام و نام خانوادگی"}
                              value={
                                userData?.privatePerson?.firstName +
                                " " +
                                userData?.privatePerson?.lastName
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"نام پدر"}
                              value={userData?.privatePerson?.fatherName}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"شماره شناسنامه"}
                              value={
                                userData?.privatePerson?.serial +
                                `/` +
                                userData?.privatePerson?.seriShChar +
                                userData?.privatePerson?.seriSh
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"کد ملی"}
                              value={userData?.uniqueIdentifier}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <LabelValue
                              title={"تلفن ثابت"}
                              value={userData?.addresses?.[0]?.tel}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"کد پستی منزل"}
                              value={userData?.addresses?.[0]?.fax}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"شماره تلفن همراه"}
                              value={idpInfo.result?.phoneNumber}
                            />
                          </td>
                          <td>
                            <LabelValue
                              valueClassName="font-english"
                              title={"آدرس پست الکترونیکی"}
                              value={idpInfo.result?.email}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <LabelValue
                              title={" نام بانک"}
                              value={
                                userDefaultBank?.bank?.name +
                                " " +
                                (userDefaultBank?.branchCode
                                  ? userDefaultBank?.branchCode
                                  : "")
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"شماره‌حساب بانکی"}
                              value={userDefaultBank?.accountNumber}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <LabelValue
                              valueClassName="break-words"
                              title={"آدرس منزل"}
                              value={
                                userData?.addresses?.[0]?.city.name +
                                " " +
                                userData?.addresses?.[0]?.province.name +
                                " " +
                                userData?.addresses?.[0]?.section.name +
                                " " +
                                userData?.addresses?.[0]?.remnantAddress +
                                " " +
                                userData?.addresses?.[0]?.alley +
                                " " +
                                userData?.addresses?.[0]?.plaque
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className={"table table-compact w-full"}>
                      <thead>
                        <tr>
                          <td>
                            <h5>ب) مشتري حقوقی:</h5>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <LabelValue
                              title={"نام"}
                              value={userData?.legalPerson?.companyName}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"شماره ثبت"}
                              value={userData?.legalPerson?.registerNumber}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"محل ثبت"}
                              value={userData?.legalPerson?.registerPlace}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"تاریخ ثبت"}
                              value={userData?.legalPerson?.registerDate}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <LabelValue
                              title={"نوع شخصیت"}
                              value={
                                legalPersonTypeCategoryEnums.find(
                                  (item: any) =>
                                    item.id ===
                                    userData?.legalPerson
                                      ?.legalPersonTypeCategory
                                )?.title
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              valueClassName="font-english"
                              title={"آدرس پست الکترونیکی"}
                              value={
                                userData?.legalPerson
                                  ? idpInfo.result?.email
                                  : ""
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <LabelValue
                              title={"شماره حساب بانکی"}
                              value={
                                userData?.legalPerson
                                  ? userDefaultBank?.accountNumber
                                  : ""
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"شماره شبا"}
                              value={
                                userData?.legalPerson
                                  ? userDefaultBank?.sheba
                                  : ""
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className={"table table-compact w-full"}>
                      <thead>
                        <tr>
                          <td>
                            <h5>ج) نماینده حقوقی:</h5>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <LabelValue
                              title={"نام و نام خانوادگی"}
                              value={
                                userData?.agent
                                  ? userData?.agent?.firstName +
                                    " " +
                                    userData?.agent?.lastName
                                  : ""
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"کد ملی"}
                              value={userData?.agent?.uniqueIdentifier}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/*<div className=" mt-4">*/}
                  {/*    <h5>ج) اشخاص خارجی (حقیقی/حقوقی): </h5>*/}
                  {/*    <table className={'table table-compact w-full'}>*/}
                  {/*        <tbody>*/}
                  {/*        <tr>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>نام: </span>*/}
                  {/*                /!*<div className='title>*!/*/}
                  {/*                /!*        {userData.userGender === 'Male' ? 'مرد' : 'زن'}*!/*/}
                  {/*                /!*    </span>*!/*/}
                  {/*            </td>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>شماره پاسپورت/شماره ثبت:</span>*/}
                  {/*                /!*<div className='title>{userData?.privatePerson?.fatherName}</span>*!/*/}
                  {/*            </td>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>شماره تلفن ثابت/شماره دفتر مرکزی:</span>*/}
                  {/*                /!*<div className='title>{userData?.addresses?.[0]?.mobile}</span>*!/*/}
                  {/*            </td>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>تابعیت:</span>*/}
                  {/*                /!*<div className='title>ناموجود</span>*!/*/}
                  {/*            </td>*/}
                  {/*        </tr>*/}
                  {/*        <tr>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>شماره سرمایه‌گذاری خارجی:</span>*/}
                  {/*                /!*<div className='title>{userData?.privatePerson?.lastName}</span>*!/*/}
                  {/*            </td>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>نشانی پست الکترونیک:</span>*/}
                  {/*                /!*<div className='title>{userData.uniqueIdentifier}</span>*!/*/}
                  {/*            </td>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>نام بانک:</span>*/}
                  {/*                /!*<div className='title>{userData?.addresses?.[0]?.email}</span>*!/*/}
                  {/*            </td>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>نوع حساب:</span>*/}
                  {/*                /!*<div className='title>{userData?.privatePerson?.placeOfBirth}</span>*!/*/}
                  {/*            </td>*/}
                  {/*        </tr>*/}
                  {/*        <tr>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>نام شعبه:</span>*/}
                  {/*                /!*<div className='title>{userData?.privatePerson?.placeOfIssue}</span>*!/*/}
                  {/*            </td>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>شماره حساب بانکی:</span>*/}
                  {/*                /!*<div className='title>{userData?.privatePerson?.placeOfIssue}</span>*!/*/}
                  {/*            </td>*/}
                  {/*            <td>*/}
                  {/*                <div className='title>شماره شبا:</span>*/}
                  {/*                /!*<div className='title>{userData?.privatePerson?.placeOfIssue}</span>*!/*/}
                  {/*            </td>*/}
                  {/*        </tr>*/}
                  {/*        </tbody>*/}
                  {/*    </table>*/}
                  {/*</div>*/}
                  <div className=" mt-4">
                    <div className="row">
                      {userData?.agent ? (
                        <table className={"table table-compact w-full"}>
                          <thead>
                            <td>
                              <tr>
                                <h5>
                                  ب) مشخصات نماینده قانونی (حقیقی/ حقوقی) در
                                  مواردي که مشتري داراي نماینده است، قرارداد
                                  توسط وي امضاء می‌شود.{" "}
                                </h5>
                                <div className="col-12 custom-border">
                                  نوع نمایندگی قانونی: وکالتنامه رسمی
                                </div>
                              </tr>
                            </td>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className={"title"}>نام شخصیت حقیقی:</div>
                                <div className={"titleValue"}>
                                  {userData?.privatePerson?.firstName}
                                </div>
                              </td>
                              <td>
                                <div className={"title"}>نام خانوداگی:</div>
                                <div className={"titleValue"}>
                                  {userData?.privatePerson?.lastName}
                                </div>
                              </td>
                              <td>
                                <div className={"title"}>نام پدر:</div>
                                <div className={"titleValue"}>
                                  {userData?.privatePerson?.fatherName}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className={"title"}>
                                  تلفن ثابت نماینده قانونی:
                                </div>
                                <div className={"titleValue"}>
                                  {userData?.agent?.tel}
                                </div>
                              </td>
                              <td>
                                <div className={"title"}>
                                  تلفن همراه نماینده قانونی:
                                </div>
                                <div className={"titleValue"}>
                                  {userData?.agent?.mobile}
                                </div>
                              </td>
                              <td>
                                <div className={"title"}>کد ملی:</div>
                                <div className={"titleValue"}>
                                  {userData?.agent?.uniqueIdentifier}
                                </div>
                              </td>
                              {/*<td>*/}
                              {/*    <div className={'title'}>آدرس محل سکونت:</div>*/}
                              {/*    <div*/}
                              {/*        className={'titleValue'}>{userData?.addresses?.[0]?.remnantAddress}</div>*/}
                              {/*</td>*/}
                              <td>
                                <div className={"title"}>نوع شخصیت حقوقی:</div>
                                <div className={"titleValue"}>
                                  {
                                    legalPersonTypeCategoryEnums.find(
                                      (item: any) =>
                                        item.id === userData?.agent?.type
                                    )?.title
                                  }
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className={"title"}>نام نماینده:</div>
                                <div className={"titleValue"}>
                                  {userData?.agent?.firstName +
                                    " " +
                                    userData?.agent?.lastName}
                                </div>
                              </td>
                              <td>
                                <div className={"title"}>
                                  شماره قیم‌نامه/ وکالتنامه:
                                </div>
                                {/*<div className='titleValue>{userData?.privatePerson?.placeOfIssue}</span>*/}
                              </td>
                              <td>
                                <div className={"title"}>
                                  تاریخ انقضاء قیم‌نامه/ وکالتنامه:
                                </div>
                                {/*<div className='titleValue>{userData?.privatePerson?.placeOfIssue}</span>*/}
                              </td>
                              <td>
                                <div className={"title"}>
                                  شماره چاپی فرم وکالتنامه:
                                </div>
                                {/*<div className='titleValue>{userData?.privatePerson?.placeOfIssue}</span>*/}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className={"title"}>
                                  آدرس دفتر اسناد رسمی:
                                </div>
                                {/*<div className='titleValue>{userData?.privatePerson?.placeOfIssue}</span>*/}
                              </td>
                              <td>
                                <div className={"title"}>تلفن ثابت:</div>
                                {/*<div className='titleValue>{userData?.privatePerson?.placeOfIssue}</span>*/}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : null}
                      <div className="col-12 custom-border">
                        آیا وکیل حق دریافت وجه حاصل از فروش را دارد؟
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 ">
                    <p>
                      در این قرارداد سازمان بورس و اوراق بهادار اختصاراً
                      «سازمان» و کانون کارگزاران بورس و اوراق بهادار اختصاراً
                      «کانون» نامیده شده اند.
                    </p>
                    <p>
                      1. در این قرارداد «دستورالعمل اجرایی معاملات برخط»
                      اختصاراً «دستورالعمل» نامیده می‌شود و اصطلاحات تعریف شده
                      در آن به همان مفاهیم در قرارداد حاضر به کار رفته‌اند.
                    </p>
                    <p>
                      2. منظور از «کارگزار» در این قرارداد، «کارگزار یا کارگزار/
                      معامله‌گر» موضوع بند 9 دستورالعمل اجرایی معاملات بر خط
                      است.
                    </p>
                    <p>
                      3. کلیه مصوبات هیات وزیران، شورای عالی بورس و اوراق بهادار
                      و سازمان بورس و اوراق بهادار در خصوص بازار سرمایه و فعالان
                      آن در این قرارداد «مقررات» نامیده می‌شود.
                    </p>
                  </div>
                  <div>
                    <p>
                      4. زیرساخت برخطی که امور مربوط به پیش از انجام معامله، حین
                      انجام معامله و پس از انجام معامله از طریق آن صورت می‌گیرد
                      از قبیل «زیر ساختن برخط دریافت و ثبت سفارش» یا «زیرساخت بر
                      خط ارسال سفارش بدون واسطه معامله‌گر» موضوع بندهای 4 و 5 و
                      ماده 1 دستورالعمل اجرایی معاملات برخط، در این قرارداد
                      «سامانه» نامیده می‌شود.
                    </p>
                  </div>
                  <div>
                    <h5>ماده 2-موضوع قرارداد</h5>
                    <p>
                      موضوع این قرارداد عبارت است از استفاده از خدمات برخط
                      (online) کارگزار از طریق سامانه در بورس اوراق بهادار
                      تهران، فرا بورس ایران، بورس کالاي ایران و بورس انرژي ایران
                    </p>
                    <h5>ماده 3-مدت قرارداد</h5>
                    <p>
                      این قرارداد از تاریخ
                      {moment().locale("fa").format("YYYY/MM/DD")}
                      به مدت نامحدود معتبر است.
                    </p>
                  </div>

                  <div>
                    <h5>ماده 4-حقوق و تعهدات کارگزار</h5>
                    <p>
                      1. کارگزار باید نام کاربري و رمز عبور استفاده از سامانه را
                      از طریق یکی از شیوه‌های زیر، ظرف حداکثر یک هفته پس از
                      امضاي قرارداد در اختیار مشتري حقیقی یا نماینده قانونی وي
                      (ولی یا قیم) قرار دهد و استفاده از خدمات آغاز گردد:
                    </p>
                    <p>الف. به صورت چاپی (رمز چاپ)؛</p>
                    <p>
                      ب. ارسال از طریق پیام کوتاه به شماره همراهِ ثبت شده مشتري
                      در سامانه سجام یا شماره همراهِ ثبت شده مشتري در مقدمه
                      قرارداد؛
                    </p>
                    <p>
                      ج. تأیید رمز عبور تعیین شده توسط مشتري در زمان ثبت نام
                      اولیه براي دسترسی به سامانه.
                    </p>
                    <p>
                      2. کارگزار باید نام کاربري و رمز عبور استفاده از سامانه را
                      از طریق یکی از شیوه‌های زیر، ظرف حداکثر یک هفته پس از
                      امضاي قرارداد در اختیار نماینده معرفی شده توسط صاحبان
                      امضاي مجاز مشتري حقوقی قرار دهد و استفاده از خدمات آغاز
                      گردد:
                    </p>
                    <p>الف. به صورت چاپی (رمز چاپ)؛</p>
                    <p>
                      ب. ارسال از طریق پیام کوتاه به شماره همراهِ ثبت شده
                      نماینده مشتري در معرفی نامه کتبی ارسالی توسط صاحبان امضاي
                      مجاز؛
                    </p>
                    <p>
                      ج. تأیید رمز عبور تعیین شده توسط مشتري در زمان ثبت نام
                      اولیه براي دسترسی به سامانه.
                    </p>
                    <p>
                      3. کارگزار متعهد به ثبت و نگهداري کلیه سوابق تراکنش‌های
                      دریافتی از مشتري و ارسالی به وي در سامانه است. همچنین
                      کارگزار موظف است نتیجه اجراي سفارشات ثبت شده توسط مشتري در
                      سامانه را به وي نمایش دهد.
                    </p>
                    <p>
                      4. در صورت وجود شواهد و قرائنی مبنی بر نقض قوانین و مقررات
                      یا ایجاد مخاطره در شفافیت و منصفانه بودن بازار، کارگزار
                      می‌تواند اقدامات پیشگیرانه‌ای از قبیل محدود کردن دسترسی
                      مشتریان یا سفارش‌های آن‌ها به عمل آورد. در صورت اعمال این
                      محدودیت‌ها، کارگزار مسئولیتی در قبال خسارات وارده به مشتري
                      نخواهد داشت.
                    </p>
                    <p>
                      5. اعمال هرگونه محدودیت بر معاملات مشتري یا دسترسی وي به
                      سامانه توسط کارگزار باید مستند به قوانین و مقررات مرتبط یا
                      اعلام سازمان یا بورس باشد. در صورت اعمال این محدودیت‌ها،
                      کارگزار مسئولیتی در قبال خسارات وارده به مشتري نخواهد
                      داشت. در صورت اعمال هر گونه محدودیت موضوع این ماده،
                      کارگزار موظف به اطلاع‌رسانی به مشتري مطابق با روش‌های
                      مندرج در این قرارداد است.
                    </p>
                    <p>
                      6. کارگزار موظف است امکان ارائه خدمات پشتیبانی سامانه را
                      فراهم و چگونگی ارائه خدمات را از طریق تارنماي رسمی خود به
                      مشتري اعلام نماید و حسب درخواست مشتري جهت رفع مشکل اقدام
                      کند.
                    </p>
                  </div>
                  <p>
                    7. کارگزار موظف است در زمانی که تکالیف مقرراتی ایجاب می‌کند،
                    امکان حذف یا ویرایش سفارش‌های ثبت شده را از مشتري سلب نماید.
                    همچنین کارگزار اختیار حذف سفارش‌های وارد شده توسط مشتري را
                    در چارچوب قوانین و مقررات دارد و در این صورت موظف به نگهداري
                    دلایل و مستندات مربوطه است. در هر دو مورد کارگزار موظف به
                    اعلام موضوع به همراه دلایل به مشتري است.
                  </p>

                  <p>
                    8. کارگزار متعهد است داده ها و اطلاعات مربوط به مشتري را
                    محرمانه نگه دارد.
                  </p>
                  <p>
                    <span className="font-bold">تبصره: </span> کارگزاري مجاز است
                    با رعایت قوانین و مقررات موجود، اطلاعات مشتریان را در اختیار
                    سازمان یا سایر مراجع ذیصلاح قرار دهد.
                  </p>
                  <p>
                    9. کارگزار متعهد است از طریق سامانه، همواره جزئیات وضعیت
                    حساب، قدرت خرید و سوابق سفارش‌ها و معاملات مشتري را در
                    اختیار وي قرار دهد و در صورت اعلام مغایرت از سوي مشتري، در
                    اسرع وقت نسبت به بررسی موضوع و اعلام نتیجه بررسی به وي اقدام
                    نماید.
                  </p>
                  <p>
                    10. در صورت وقوع هر گونه اختلال در دسترسی به سامانه در موارد
                    قابل پیش‌بینی، کارگزار موظف به اطلاع‌رسانی به مشتري قبل از
                    وقوع اختلال است و در موارد غیرقابل پیش‌بینی باید بلافاصله پس
                    از وقوع اختلال نسبت به اطلاع‌رسانی به مشتري اقدام نماید.
                  </p>
                  <p>
                    11 .کارگزار موظف است موارد زیر را از طریق سامانه یا تارنمای
                    رسمی خود به اطالع مشتری برساند:
                  </p>
                  <ul>
                    <li>لیست نسخههای سامانه و راهنمای استفاده از هر نسخه؛</li>
                    <li>
                      {" "}
                      رو یههای واریز و برداشت وجوه و مدت زمان های آن )مطابق
                      مقررات سازمان(؛
                    </li>
                    <li> مخاطرات استفاده از سامانه؛</li>
                    <li>
                      {" "}
                      اطالعات الزم در مورد نحوه مدیریت سفارشها در زمان اتمام
                      مجوز، تعلی ق یا محرومیت کارگزار که بر دسترسی مشتری به
                      سامانه موثر باشد؛
                    </li>
                    <li>
                      {" "}
                      رو یههایی برای و یرایش یا حذف سفارش های ثبت شده و ثبت
                      سفارش جدید در زمانی که اختاللی در سامانه وجود داشته باشد؛
                    </li>
                    <li>
                      قوانین و مقررات جدید و محدودیتهای ابالغی توسط سازمان در
                      خصوص انجام معامالت برخط.
                    </li>
                  </ul>
                  <p>
                    12 .کارگزار مسئولیتی در قبال سود یا زیان ناشی از اقدامات
                    انجام شده توسط مشتری از طریق سامانه از جمله انجام معامالت
                    برخط ندارد.
                  </p>
                  <p>
                    13 .کارگزار بابت ارائه خدمات برخط از طریق سامانه وجهی را از
                    مشتری دریافت نمینماید بنابراین امضای این قرارداد تکلیفی برای
                    کارگزار جهت ارائه خدمات برخط به مشتری از طریق سامانه ایجاد
                    نمیکند و چنانچه در نتیجه قطعی، کندی یا بروز اختالل در سامانه
                    بنا به هر دلیل، دسترسی به سامانه یا استفاده از آن برای مشتری
                    ممکن نباشد، کارگزار مسئول جبران خسارت های وارده به مشتری در
                    نتیجه قطعی، کندی یا بروز اختالل در سامانه نخواهد بود و در
                    صورت قطعی، کندی یا بروز اختالل در سامانه، مشتری می تواند با
                    مراجعه حضوری به کارگزار یا طبق رویه اعالمی کارگزار بر اساس
                    بند 11 این ماده، نسبت به و یرایش یا حذف سفارش های ثبت شده یا
                    ثبت سفارش جدید اقدام نماید.
                  </p>

                  <h5>ماده 5 )حقوق و تعهدات مشتری</h5>
                  <p>
                    1 .مشتری باید اطالعات و مستندات الزم را جهت احراز هویت مطابق
                    قوانین و مقررات مربوطه در هر زمانی که الزم باشد به کارگزار
                    ارائه نماید.
                  </p>
                  <p>
                    2 .مشتری مکلف است رمز عبوری که توسط کارگزار در اختیار وی
                    قرار می گیرد را در اولین دفعه ورود به سامانه تغییر دهد.
                  </p>
                  <p>
                    3 .مشتری تعهد میکند از انجام هرگونه اقدام که منجر به نقض
                    قوانین و مقررات گردد از جمله دست کاری بازار و معامالت مبتنی
                    بر اطالعات نهانی خودداری نماید.
                  </p>
                  <p>
                    4 .مشتری متعهد است در تمامی مراحل اجرای این قرارداد، استفاده
                    از سامانه، ثبت سفارش های خرید و فروش، انجام معامله، تمامی
                    واریزها و برداشت ها و تمامی اقدامات مربوط به پیش یا پس از
                    انجام معامله، کلی ه قوانین و مقررات و الزامات ابالغی توسط
                    سازمان و سایر مراجع ذیصالح و شرایط اعالمی توسط کارگزار را
                    رعایت نماید. در هر حال مشتری مسئول جبران کلیه خسارت هایی است
                    که در نتیجه عدم رعایت قوانین و مقررات و مفاد این قرارداد
                    توسط و ی حادث شود.
                  </p>
                  <p>
                    5 .مشتری باید شماره حساب بانکی به نام خود در بانکی که
                    کارگزار اعالم می کند، جهت دریافت وجوه معرفی نماید. هرگونه
                    پرداخت به مشتری صرفاً از طریق واریز وجه به حساب یادشده امکان
                    پذیر است.
                  </p>
                  <p>
                    6 .مسئولیت استفاده و حفاظت از رمز عبور و نام کاربری و نیز
                    مسئولیت انجام هرگونه معامله و ضرر و زیان حاصله که از طریق
                    نام کاربری و یا رمز عبور مشتری صورت می گیرد، بر عهده مشتری
                    است.
                  </p>
                  <p>
                    7 .تمامی سفارش ها، معامالت و کلیه اقداماتی که در فرآیندهای
                    پیش، حین یا پس از انجام معامله )نظیر تأیید، پذیرش یا امضای
                    تعهدنامه ها، بیانیه ها، اطالعیه ها، واریز وجه به حساب
                    کارگزار، درخواست دریافت وجه از کارگزار، ثبت، ویرایش و حذف
                    سفارش ها، معامالت انجام شده، درخواست تسویه نقدی یا تسویه
                    فیزیکی در اوراق مشتقه، بارگذاری کلیه اسناد و مدارک مورد نیاز
                    جهت انجام امور تسویه، صدور حواله و تحویل کاال، تعیین باربری
                    و مقصد حمل کاال، اعالم تأخیر در تحویل کاال، درخواست تحویل
                    کاال با تأخیر، درخواست انفساخ قرارداد به دلیل تأخیر در تحویل
                    کاال و ...( از طریق سامانه و با استفاده از نام کاربری و رمز
                    عبور مشتری صورت می گیرد، به منزله اقدام توسط شخص مشتری است و
                    مشتری تحت هیچ عنوان نمیتواند سفارش ها، معامالت یا به طور کلی
                    هیچ یک از اقدامات انجام شده از طریق سامانه را انکار نماید یا
                    ثبت سفارش، انجام معامله یا هرگونه اقدام انجام گرفته از طریق
                    سامانه را به شخص دیگری منتسب نماید.{" "}
                  </p>
                  <p>
                    8 .مشتری با امضا ذیل این قرارداد صحت و اصالت کلیه اطالعات،
                    اسناد و مدارکی را که با استفاده از نام کاربری و رمز عبور وی
                    در سامانه بارگذاری میشود، تأیید می نماید. در هر حال کلیه
                    تبعات و مسئولیتهای کیفری و حقوقی ناشی از بارگذاری اسناد و
                    مدارک غیرواقعی یا ارائه اطالعات به نحو غیرصحیح در سامانه،
                    تماماً بر عهده مشتری خواهد بود.
                  </p>
                  <p>
                    9 .مشتری متعهد میگردد اطالعات احراز هویت خود در سامانه ) از
                    جمله نام کاربری، رمز عبور، رمز یکبار مصرف( را در اختی ار
                    اشخاص ثالث قرار ندهد. در غیر این صورت هرگونه مسئولیت ناشی از
                    این امر بر عهده مشتری خواهد بود.
                  </p>
                  <p>
                    10 .مشتری متعهد است سفارش های خرید و فروش روزانة خود را در
                    چارچوب قوانین و مقررات و سقف های اعالمی توسط سازمان یا بورس
                    به سامان ه ارسال کند.
                  </p>
                  <p>
                    11. مشتري کلیه مسئولیت‌ها و تبعات ناشی از استفاده‌ی نادرست
                    از سامانه را بر عهده می‌گیرد.
                  </p>
                  <p>
                    12. در صورت عدم انجام معامله توسط مشتري به مدت 90 روز متوالی
                    از طریق سامانه، کارگزار می‌تواند دسترسی مشتري را غیرفعال
                    نماید.
                  </p>
                  <p>
                    13. مشتري متعهد می‌شود، اصول امنیت سخت‌افزاری و نرم‌افزاری و
                    محافظت از اطلاعات از جمله استفاده از نرم‌افزارهای ضد ویروس
                    مناسب، محافظت از شناسه کاربر، کلیدواژه‌ها، کدهاي رمزي و کلیه
                    اطلاعات دریافتی از کارگزار را به منظور جلوگیري از دسترسی‌های
                    غیرمجاز به سامانه، رعایت نماید.
                  </p>
                  <p>
                    14. مشتري متعهد به پرداخت وجوه کلیه معاملات انجام شده از
                    طریق سامانه و کارمزدهاي مربوطه در چارچوب قوانین و مقررات
                    است.
                  </p>
                  <p>
                    15. مشتري مکلف است در صورت وقوع هرگونه سرقت یا استفاده
                    غیرمجاز از نام کاربري و رمز عبور یا حساب ( هاي) بانکی خود،
                    موضوع را فوراً به کارگزار اطلاع دهد.
                  </p>
                  <p>
                    15. مشتري مکلف است در صورت وقوع هرگونه سرقت یا استفاده
                    غیرمجاز از نام کاربري و رمز عبور یا حساب ( هاي) بانکی خود،
                    موضوع را فوراً به کارگزار اطلاع دهد.
                  </p>
                  <p>
                    16. مشتري مجاز به هیچ گونه دخل و تصرف در سامانه و نحوه
                    دسترسی به آن به هر دلیل از جمله به منظور هر گونه بهره برداري
                    تجاري یا غیرتجاري توسط خود یا به واسطه دیگري نیست و
                    نمی‌تواند حق استفاده از این خدمات را به شخص دیگري واگذار
                    کند.
                  </p>
                  <p>
                    17. مشتري اقرار می‌نماید که از دانش کافی در خصوص قوانین و
                    مقررات معاملاتی و سایر قوانین و مقررات مرتبط با بازار سرمایه
                    برخوردار است.
                  </p>
                  <p>
                    18. مشتري متعهد می‌گردد در صورت اختلال در سامانه، از راه‌های
                    جایگزین اعلام شده توسط کارگزار براي ثبت و ارسال سفارش (حداقل
                    مراجعه حضوري به کارگزاري) استفاده نماید.
                  </p>
                  <div className=" mt-4">
                    <h5>ماده 6- حدود مسئولیت طرفین</h5>
                    <ul>
                      <li>
                        تنها دارندة نام کاربري و رمز عبور، مشتري است. مسئولیت
                        استفاده و حفاظت از رمز عبور و نام کاربري و نیز مسئولیت
                        انجام هرگونه معامله در این حساب که از طریق نام کاربري و
                        یا رمز عبور مشتري صورت می‌گیرد بر عهده وي می‌باشد. مشتري
                        همچنین مسئول خسارت‌هایی است که در نتیجۀ عدم رعایت قوانین
                        و مقررات و مفاد این قرارداد توسط وي حادث شود.
                      </li>
                      <li>
                        عضو مسئول حوادثی که خارج از حیطۀ اختیار و بدون تقصیر وي
                        رخ می‌دهد، نمی‌باشد.
                      </li>
                      <li>
                        در صورتی که به واسطۀ اعمال حقوق متعلق به عضو در این
                        قرارداد، مشتري متحمل ضرر و زیان گردد، عضو مسئول جبران
                        خسارت‌های وارده نخواهد بود.
                      </li>
                      <li>
                        انعقاد این قرارداد به منظور ارایۀ خدمات دسترسی برخط
                        بازار از سوي عضو به مشتري می‌باشد و شامل ارایۀ سایر
                        خدمات از قبیل خدمات مشاورة سرمایه‌گذاری، قانونی،
                        مالیاتی، مالی و حسابداري نخواهد بود.
                      </li>
                      <li>
                        عضو مسئولیتی در قبال سودآوري و مخاطرات انجام معاملات
                        برخط توسط مشتري ندارد.
                      </li>
                    </ul>
                  </div>

                  <div className=" mt-4">
                    <h5>ماده 7- قابلیت استناد داده پیام‌ ها </h5>
                    <p>
                      داده پیام‌ ها و سوابق کلیۀ تراکنش‌های دریافتی از مشتري و
                      ارسالی به وي که با رعایت قوانین و مقررات و در چارچوب مفاد
                      این قرارداد ایجاد و نگهداري شده است در حکم اسناد معتبر و
                      قابل استناد در مراجع قضایی و حقوقی است. در صورت بروز
                      اختلاف بین کارگزار و مشتري در خصوص این سوابق و داده پیام
                      ها، اطلاعات مندرج در سامانه، معتبر و براي طرفین لازم
                      الاتباع است.
                    </p>
                  </div>
                  <div className=" mt-4">
                    <h5>ماده 8- فورس ماژور (قوه قاهره) </h5>
                    <p>
                      هرگاه اجراي تمام یا بخشی از قرارداد به واسطه یک امر خارجیِ
                      غیرقابل رفع و غیرقابل پیش‌بینی، غیرممکن شود یا به تأخیر
                      افتد، کارگزار مسئول جبران خسارات ناشی از عدم اجرا یا تأخیر
                      در اجراي قرارداد نیست. در این صورت کارگزار مکلف است از
                      طریق سایت اینترنتی خود در اسرع وقت مراتب را به مشتري اطلاع
                      دهد.
                    </p>
                  </div>

                  <div className=" mt-4">
                    <h5>ماده 9- نحوه برقراري ارتباط بین مشتري و کارگزار </h5>
                    <p>
                      در مواردي که کارگزار بر اساس این قرارداد یا دستورالعمل
                      ملزم به اطلاع‌رسانی به مشتري است، کلیه اطلاع‌رسانی‌ها و
                      مکاتبات به یکی از طرق زیر به انتخاب مشتري انجام می‌گردد:
                    </p>
                    <ul>
                      <li>
                        ارسال پیامک به شماره موبایل درج شده مشتري در مقدمه این
                        قرارداد (صرفاً در خصوص مشتریان حقیقی)
                      </li>
                      <li>
                        ارسال به پست الکترونیکی درج شده مشتري در مقدمه این
                        قرارداد
                      </li>
                      <li>اعلام در سامانه</li>
                      <li>اعلام در سایت اینترنتی کارگزار</li>
                    </ul>
                  </div>
                  <h5>ماده 10- انحلال قرارداد</h5>
                  <p>1 -در موارد زیر قرارداد منفسخ می گردد:</p>
                  <p>
                    - تخلف مشتری از قوانین و مقررات مربوطه و با اعالم مراجع ذی
                    صالح
                  </p>
                  <p>- تعلیق به مدت بیش از یک ماه یا لغو مجوز کارگزار</p>
                  <p>
                    2 -هر یک از طرفین در هر زمان اختیار فسخ قرارداد را با اعالم
                    کتبی از سه روز پ یش خواهند داشت.
                  </p>
                  <p>
                    تبصره 1 :همزمان با فسخ قرارداد هر ی ک از طرفین موظف به اعالم
                    کتبی مراتب با ذکر دقیق تاریخ فسخ به طرف مقابل است.
                  </p>
                  <p>
                    تبصره 2 :در صورت فسخ یا انفساخ قرارداد، مشتری مکلف است فوراً
                    نسبت به تسویة کلیة دیون و تعهدات ناشی از معامالت برخط اقدام
                    نماید.
                  </p>
                  <p>
                    <span className="font-bold">تبصره 1: </span> در صورتی که
                    مشتري بیش از یکی از روش‌های فوق را انتخاب نماید، اطلاع‌رسانی
                    از طریق هر یک از روش‌های انتخاب شده توسط مشتري معتبر خواهد
                    بود.
                  </p>
                  <p>
                    <span>تبصره 2: </span> در صورت فسخ یا انفساخ قرارداد، مشتري
                    مکلف است فوراً نسبت به تسویۀ کلیۀ دیون و تعهدات ناشی از
                    معاملات برخط اقدام نماید.
                  </p>
                  <div className=" mt-4">
                    <h5>ماده 11 -حل و فصل اختلافات </h5>
                    <p>
                      در صورت بروز اختلاف در تفسیر یا اجراي مفاد تمام یا بخشی از
                      این قرارداد، اختلاف مزبور با مراجعه به هیئت سه نفره داوري
                      منتخب کانون و مطابق ضوابط مصوب هیئت مدیره کانون و در
                      چارچوب باب هفتم قانون آئین دادرسی مدنی حل و فصل خواهد شد.
                    </p>
                  </div>

                  <div className=" mt-4">
                    <h5>ماده 12 - اقامتگاه قانونی و اطلاعات تماس طرفین </h5>
                    <p>
                      نشانی و اطلاعات تماس طرفین همان است که در مقدمه قرارداد
                      ذکر شده است. هر یک از طرفین در صورت تغییر نشانی و اطلاعات
                      تماس موظف است نشانی و اطلاعات تماس جدید خود را ظرف مدت
                      حداکثر 7 روز پس از تغییر کتباً به طرف دیگر اطلاع دهد. تا
                      زمانی که نشانی و اطلاعات تماس جدید اعلام نشده، مکاتبات به
                      نشانی قبلی ارسال و برقراري ارتباط از طریق اطلاعات تماس
                      قبلی انجام می‌شود.
                    </p>

                    <p>
                      <span className="font-bold">تبصره: </span> اعلام نشانی و
                      اطلاعات تماس جدید کارگزار بر روي سایت اینترنتی کارگزار به
                      منزله اعلام آن به مشتري خواهد بود.
                    </p>
                  </div>
                  <div>
                    <h5>ماده 13 -تعهدنامه استفاده از زیرساخت برخط </h5>
                    <p>
                      &lrm;<span>اینجانب</span>&lrm; &lrm;
                      <span className={"mx-1"}>
                        {userData?.privatePerson?.firstName +
                          " " +
                          userData?.privatePerson?.lastName}
                      </span>
                      &lrm; به شماره شناسنامه
                      <span>{userData?.privatePerson?.shNumber}</span>
                      &lrm;، صادره از&lrm; &lrm;
                      <span>{userData?.privatePerson?.placeOfIssue}</span>&lrm;
                      متولد
                      <span>
                        {jalali(userData?.privatePerson?.birthDate).date}
                      </span>
                      ، نام پدر
                      <span>{userData?.privatePerson?.fatherName}</span>، با کد
                      ملی
                      <span>{userData?.uniqueIdentifier}</span>
                      &lrm;متولد&lrm; &lrm;
                      <span>{userData?.privatePerson?.placeOfBirth}</span>&lrm;
                      به نمایندگی از شخص حقوقی به نام
                      .............................. به شناسه ملی
                      ................................ ، که اصالتاً به عنوان
                      نماینده قانونی (ولی / قیم / وصی) آقاي/خانم با کد ملی یا و
                      شماره ثبت ......................... نزد اداره ثبت شرکت‌ها
                      و مؤسسات غیرتجاري شهرستان .............................
                      متقاضی استفاده از زیرساخت‌های موضوع 4 و 5 ماده 1
                      دستورالعمل اجرایی معاملات برخط هستم، اقرار و تعهد
                      می‌نمایم:
                    </p>
                    <ul>
                      <li>
                        از دانش و مهارت لازم در خصوص نحوه‌ی استفاده از
                        زیرساخت‌ها و همچنین نحوه انجام معامله اوراق بهادار/کالا
                        برخوردار می‌باشم
                      </li>
                      <li>
                        با قوانین و مقررات مرتبط با معامله اوراق بهادار/کالا
                        آشنایی کافی دارم.
                      </li>
                      <li>
                        مشمول هیچگونه حکم منع معاملاتی که توسط سازمان بورس و
                        اوراق بهادار یا سایر مراجع ذي صلاح اعلام شده باشد،
                        نیستم.
                      </li>
                      <li>
                        از انجام معاملات مبتنی بر اطلاعات محرمانه و دستکاري در
                        بازار خودداري نموده و در مقابل مراجع قانونی پاسخگو باشم.
                      </li>
                      <li>
                        از ایجاد اخلال یا هرگونه اقدام به اخلال ( سوء استفاده)
                        در سامانه معاملات آنلاین و زیرساخت هاي معاملات بر خط
                        متعلق به کارگزار یا کارگزار/معامله‌گر خودداري نموده و در
                        مقابل مراجع قانونی پاسخگو باشم.
                      </li>
                      <li>
                        امکان استفاده از زیرساخت‌های برخط اختصاص یافته به
                        اینجانب را در اختیار هیچ فرد دیگري تحت هر عنوان از قبیل
                        نماینده، وکیل یا غیره ندهم و به شخص دیگري اجازه نخواهم
                        داد از مجوز صادره استفاده و اقدام به انجام معامله نماید
                        و در هر صورت مسئولیت کلیه معاملات انجام شده از طریق
                        دسترسی به زیرساخت برخط که توسط کارگزار در اختیار اینجانب
                        قرار داده شده است را می پذیرم.
                      </li>
                      <li>
                        مسئولیت صحت موارد مندرج در فرم مشخصات مشتري بر عهده
                        اینجانب بوده و در صورت ارائه اطلاعات خلاف واقع و مستندات
                        جعلی، مسئولیت هرگونه عواقب ناشی از آن بر عهده اینجانب
                        می‌باشد.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5>
                      ماده 14 -رسید دریافت نام کاربري و رمز عبور در سامانه
                      معاملات برخط
                    </h5>
                    <p>
                      اطلاعات نام کاربري و رمز عبور سامانه معاملات برخط شرکت
                      کارگزاري توانا، در پاکت در بسته به شما تحویل می‌گردد و از
                      این تاریخ به بعد مسئولیت کلیه معاملات با حساب برخط شما، بر
                      عهده شخص شما بوده و شرکت کارگزاري توانا هیچ گونه مسئولیتی
                      در خصوص سوء استفاده از نام کاربري و رمز عبور فوق بر عهده
                      ندارد؛ لذا خواهشمند است در حفظ و نگهداري آن دقت کافی مبذول
                      فرمایید.
                    </p>

                    <p>
                      &lrm;اینجانب آقاي/خانم&lrm; &lrm;
                      <span>
                        {userData?.privatePerson?.firstName +
                          " " +
                          userData?.privatePerson?.lastName}
                      </span>
                      &lrm; فرزند
                      <span>{userData?.privatePerson?.fatherName}</span>
                      به شماره شناسنامه{" "}
                      <span>{userData?.privatePerson?.shNumber}</span>و کد ملی
                      <span>{userData?.uniqueIdentifier}</span>
                      &lrm;متولد&lrm; &lrm;
                      <span>{userData?.privatePerson?.placeOfBirth}</span>&lrm;
                      &lrm; صادره از&lrm; &lrm;
                      <span>{userData?.privatePerson?.placeOfIssue}</span>&lrm;
                      که اصالتاً / بعنوان نماینده قانونی (ولی/قیم/وصی) آقاي/خانم
                      ........................ در تاریخ
                      {moment().locale("fa").format("YYYY/MM/DD")}
                      شناسه کاربري و رمز عبور خود را در پاکت در بسته دریافت
                      کردم.
                    </p>

                    <p>
                      این قرارداد در 14 ماده و دو نسخه تنظیم گردیده و در تاریخ
                      {moment().locale("fa").format("YYYY/MM/DD")}
                      به امضاي طرفین رسیده است. هرگونه تغییر در مفاد آن، منوط به
                      تأیید سازمان بورس اوراق بهادار می‌باشد. در صورتی که در
                      قوانین و مقررات مربوط به معاملات برخط، تغییراتی حاصل شود
                      که تغییر در شرایط و مفاد قرارداد حاضر را ایجاب نماید،
                      تغییرات مذکور، بدون نیاز به توافق ثانوي جزء لاینفک این
                      قرارداد خواهد بود.
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
