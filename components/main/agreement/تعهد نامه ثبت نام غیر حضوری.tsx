import React, { useCallback, useContext, useRef, useState } from "react";
import { SejamContext } from "../../../pages/main";
import { formatNumber, jalali } from "../../common/functions";
import {
  accountTypeEnums,
  legalPersonTypeCategoryEnums,
  tradingKnowledgeLevelEnums,
  transactionLevelPrivatePersonEnums,
} from "../../common/enums";
import ReactToPrint from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import PageHeaderFooter from "./page-header-footer";
import LabelValue from "../../common/component/label-value";
import { useSWRConfig } from "swr";
import { IDP_URL } from "../../../api/constants";

export default function OnlineRegistrationAgreement() {
  const { userData, userDefaultBank } = useContext<any>(SejamContext);
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

  return (
    <>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="تعهد نامه ثبت نام غیر حضوری"
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
                <div className={"relative leading-8 text-justify page"}>
                  <div className="text-center">
                    <p>تعهد نامه ثبت نام غیر حضوری</p>
                  </div>

                  <div className="text-center">
                    <h4 className="font-weight-bold">
                      فرم مشخصات اشخاص حقیقی ایرانی (مشتري / نماینده)
                    </h4>
                  </div>
                  <div className="text-right mt-4">
                    <ul>
                      <li>
                        اطلاعات این فرم محرمانه محسوب شده و در اختیار اشخاص غیر
                        مجاز قرار داده نمی‌شود. تکمیل قسمت هاي ستاره‌دار الزامی
                        و سایر قسمت‌ها اختیاري است.
                      </li>
                      <li className="mt-4">
                        بخش‌های مشترك این فرم باید توسط مشتري یا نماینده تکمیل
                        شود سایر بخش‌ها که با عبارت‌های
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        "اطلاعات مشتري" و"اطلاعات نماینده" مشخص شده است با توجه
                        به نقش شخص تکمیل کننده (مشتري یا نماینده) بخش مربوط به
                        شخص تکمیل گردد.
                      </li>
                    </ul>
                    <p>
                      نماینده شخص حقوقی و اشخاص مجاز به ارائه سفارش از طرف شخص
                      حقوقی، طبق تبصره 1 بند 4-2-1 ماده 4 دستورالعمل شناسایی
                      مشتریان در بازار سرمایه، باید طبق ضوابط مقرر در مورد اشخاص
                      حقیقی مورد شناسایی قرار گیرند.
                    </p>
                  </div>

                  <div className="text-right mt-4">
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
                              value={idpInfo?.result?.phoneNumber}
                            />
                          </td>
                          <td>
                            <LabelValue
                              valueClassName="font-english"
                              title={"آدرس پست الکترونیکی"}
                              value={idpInfo?.result?.email}
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
                              title={"نشانی پست الکترونیک"}
                              value={
                                userData?.legalPerson
                                  ? idpInfo?.result?.email
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

                  <div className="text-right mt-4">
                    <table className={"w-full"}>
                      <thead>
                        <tr>
                          <td>
                            <h5>اطلاعات محل سکونت</h5>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <LabelValue
                              title={"کشور"}
                              value={userData?.addresses?.[0]?.country.name}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"استان"}
                              value={userData?.addresses?.[0]?.city.name}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"کوچه"}
                              value={userData?.addresses?.[0]?.alley}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"خیابان"}
                              value={userData?.addresses?.[0]?.remnantAddress}
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
                              title={"پست الکترونیک"}
                              value={userData?.addresses?.[0]?.email}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"تلفن همراه"}
                              value={userData?.addresses?.[0]?.mobile}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"کد پستی"}
                              value={userData?.addresses?.[0]?.postalCode}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text-right mt-4">
                    <table className={"w-full"}>
                      <thead>
                        <tr>
                          <td>
                            <h5>اطلاعات محل کار</h5>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <LabelValue
                              title={"عنوان شغل"}
                              value={
                                userData?.jobInfo?.companyName
                                  ? userData?.jobInfo?.companyName
                                  : ""
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"تلفن محل کار"}
                              value={
                                userData?.jobInfo?.companyCityPrefix +
                                "-" +
                                userData?.jobInfo?.companyPhone
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"نشانی محل کار"}
                              value={userData?.jobInfo?.companyAddress}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"نمابر"}
                              value={userData?.jobInfo?.companyFax}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text-right mt-4">
                    <table className={"w-full"}>
                      <thead>
                        <tr>
                          <td>
                            <h5>اطلاعات حساب بانکی</h5>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <LabelValue
                              title={"نام بانک"}
                              value={userDefaultBank?.bank?.name}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"نام صاحب حساب"}
                              value={
                                userData?.privatePerson?.firstName +
                                "-" +
                                userData?.privatePerson?.lastName
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"نوع حساب"}
                              value={
                                accountTypeEnums.find(
                                  (item: any) =>
                                    item.id === userDefaultBank?.type
                                )?.faTitle
                              }
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={" نام شعبه"}
                              value={userDefaultBank?.branchName}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <LabelValue
                              title={"کد شعبه"}
                              value={userDefaultBank?.branchCode}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"شماره‌حساب"}
                              value={userDefaultBank?.accountNumber}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"شماره شبا"}
                              value={userDefaultBank?.sheba}
                            />
                          </td>
                          <td>
                            <LabelValue
                              title={"نام شعبه"}
                              value={userDefaultBank?.branchName}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-right mt-4">
                    <p>
                      <span className="font-bold">
                        * میزان آشنایی شما با مفاهیم مالی و سرمایه‌گذاری در
                        اوراق بهادار:
                      </span>
                      {
                        tradingKnowledgeLevelEnums.find(
                          (item: { id: string; title: string }) =>
                            item.id ===
                            userData?.financialInfo?.tradingKnowledgeLevel
                        )?.title
                      }
                    </p>
                    <p>
                      <span className="font-bold">
                        * متوسط درآمد ماهیانه شما از مشاغل و منابع مختلف در حال
                        حاضر چقدراست؟
                      </span>
                      {formatNumber(userData?.financialInfo?.inComingAverage)}
                    </p>
                    <p>
                      <span className="font-bold">
                        * پیش‌ بینی می‌کنید سطح معاملات شما در بازار سرمایه طی
                        یک سال چه مبلغی باشد؟
                      </span>
                      {
                        transactionLevelPrivatePersonEnums.find(
                          (item: { id: string; title: string }) =>
                            item.id ===
                            userData?.financialInfo?.transactionLevel
                        )?.title
                      }
                    </p>
                    <p>
                      <span className="font-bold">
                        {" "}
                        * نام شرکت کارگزاري که شما قبلاً از طریق آن معامله
                        نموده‌اید، ذکر نمایید:
                      </span>
                    </p>
                  </div>
                  <div className="text-right mt-4">
                    <p>
                      با قبول تعهدنامه فوق، مشتری صحت این اطلاعات را تائید نموده
                      و این اطلاعات در سایر تعهدنامه ها و توافق نامه ها با شرکت
                      کارگزاری توانا مورد استفاده قرار خواهد گرفت.
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
