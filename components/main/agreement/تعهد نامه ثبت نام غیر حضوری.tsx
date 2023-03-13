import {useContext} from "react";
import {SejamContext} from "../../../pages/main";
import {formatNumber, jalali} from "../../common/functions";
import {accountTypeEnums, tradingKnowledgeLevelEnums, transactionLevelPrivatePersonEnums} from "../../common/enums";

export default function OnlineRegistrationAgreement() {
    const {userData,userDefaultBank} = useContext<any>(SejamContext)

    return (
        <div className={'leading-8 text-justify'}>
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
                    <li>اطلاعات این فرم محرمانه محسوب شده و در اختیار اشخاص غیر مجاز قرار داده نمی‌شود. تکمیل قسمت هاي
                        ستاره‌دار
                        الزامی و سایر قسمت‌ها اختیاري است.
                    </li>
                    <li className="mt-4">بخش‌های مشترك این فرم باید توسط مشتري یا نماینده تکمیل شود سایر بخش‌ها که با
                        عبارت‌های
                        "اطلاعات مشتري" و"اطلاعات نماینده" مشخص شده است با توجه به نقش شخص تکمیل کننده (مشتري یا
                        نماینده)
                        بخش مربوط
                        به شخص تکمیل گردد.
                    </li>
                </ul>
                <p>
                    نماینده شخص حقوقی و اشخاص مجاز به ارائه سفارش از طرف شخص حقوقی، طبق تبصره 1 بند 4-2-1 ماده 4
                    دستورالعمل
                    شناسایی مشتریان در بازار سرمایه، باید طبق ضوابط مقرر در مورد اشخاص حقیقی مورد شناسایی قرار گیرند.
                </p>
            </div>

            <div className="text-right mt-4">
                <h5>اطلاعات هویتی</h5>
                <table className={'table table-compact w-full'}>
                    <tbody>
                    <tr>
                        <td>
                            <span>نام:</span>
                            <span>{userData.privatePerson?.firstName}</span>
                        </td>
                        <td>
                            <span>نام خانوادگی:</span>
                            <span>{userData.privatePerson?.lastName}</span>
                        </td>
                        <td>
                            <span>کد ملی:</span>
                            <span>{userData.uniqueIdentifier}</span>
                        </td>
                        <td>
                            <span>به شماره شناسنامه:</span>
                            <span>{userData.uniqueIdentifier}</span>
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
                            <span>{userData.privatePerson?.firstName + '-' + userData.privatePerson?.lastName}</span>
                        </td>
                        <td>
                            <span> نوع حساب:  </span>
                            <span>{accountTypeEnums.find((item:any)=>item.id===userDefaultBank?.type)?.faTitle}</span>
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
    )
}