export const sejamStatusEnums = [
    {
        "id": 1,
        "code": 1,
        "enTitle": "Init",
        "title": "وضعیت اولیه"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "SuccessPayment",
        "title": "پرداخت موفق"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "PolicyAccepted",
        "title": "تعهدات"
    },
    {
        "id": 4,
        "code": 4,
        "enTitle": "PendingValidation",
        "title": "استعلام اطلاعات"
    },
    {
        "id": 5,
        "code": 5,
        "enTitle": "InvalidInformation",
        "title": "اطلاعات نامعتبر"
    },
    {
        "id": 6,
        "code": 6,
        "enTitle": "TraceCode",
        "title": "کد پیگیری"
    },
    {
        "id": 7,
        "code": 7,
        "enTitle": "Sejami",
        "title": "سجامی"
    },
    {
        "id": 8,
        "code": 8,
        "enTitle": "Suspend",
        "title": "سجامی ناقص-منقضی شده"
    },
    {
        "id": 9,
        "code": 9,
        "enTitle": "Dead",
        "title": "فوت شده"
    },
    {
        "id": 10,
        "code": 10,
        "enTitle": "SemiSejami",
        "title": "سجامی ناقص-نقص مدرک/عدم احرازهویت"
    }
]

export const onlineRegistrationStatus =  [
    {
        "id": 1,
        "code": 1,
        "enTitle": "AccountCreated",
        "title": "ایجاد کاربر"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "NotSejami",
        "title": "سجامی نیست"
    },
    {
        "id": 3,
        "code": 3,
        "enTitle": "IncompleteSejam",
        "title": "نقص سجام"
    },
    {
        "id": 4,
        "code": 4,
        "enTitle": "PassedAway",
        "title": "فوت شده"
    },
    {
        "id": 5,
        "code": 5,
        "enTitle": "Sejami",
        "title": "سجامی"
    },
    {
        "id": 6,
        "code": 6,
        "enTitle": "SejamProfileReceived",
        "title": "دریافت اطلاعات سجام"
    },
    {
        "id": 7,
        "code": 7,
        "enTitle": "IdentificationInfoCompleted",
        "title": "تکمیل اطلاعات هویتی"
    },
    {
        "id": 8,
        "code": 8,
        "enTitle": "AgentInfoCompleted",
        "title": "تکمیل اطلاعات نماینده"
    },
    {
        "id": 9,
        "code": 9,
        "enTitle": "ShareholderInfoCompleted",
        "title": "تکمیل اطلاعات صاحبان سهام"
    },
    {
        "id": 10,
        "code": 10,
        "enTitle": "StakeholderInfoCompleted",
        "title": "تکمیل اطلاعات ذینفعان"
    },
    {
        "id": 11,
        "code": 11,
        "enTitle": "JobInfoCompleted",
        "title": "تکمیل اطلاعات شغلی"
    },
    {
        "id": 12,
        "code": 12,
        "enTitle": "AddressInfoCompleted",
        "title": "تکمیل آدرس"
    },
    {
        "id": 13,
        "code": 13,
        "enTitle": "BankAccountInfoCompleted",
        "title": "تکمیل شماره حساب بانکی"
    },
    {
        "id": 15,
        "code": 15,
        "enTitle": "IdentitficationScanUploaded",
        "title": "بارگذاری مدارک"
    },
    {
        "id": 14,
        "code": 14,
        "enTitle": "FinancialInfoCompleted",
        "title": "تکمیل اطلاعات مالی"
    },
    {
        "id": 16,
        "code": 16,
        "enTitle": "AgreementsConfirmed",
        "title": "تمکیل آزمون"
    },
    {
        "id": 17,
        "code": 17,
        "enTitle": "ExamPassed",
        "title": "تکمیل تعهدنامه ها"
    },
    {
        "id": 18,
        "code": 18,
        "enTitle": "CusomerConfirmed",
        "title": "تائید مشتری"
    },
    {
        "id": 19,
        "code": 19,
        "enTitle": "WaittingForAdminApproval",
        "title": "در حال بررسی"
    },
    {
        "id": 20,
        "code": 20,
        "enTitle": "RejectedByAdmin",
        "title": "رد شده"
    },
    {
        "id": 21,
        "code": 21,
        "enTitle": "AcceptedByAdmin",
        "title": "تائید شده"
    },
    {
        "id": 22,
        "code": 22,
        "enTitle": "SentToSejam",
        "title": "ارسال شده به سجام"
    },
    {
        "id": 23,
        "code": 23,
        "enTitle": "CustomerRegistered",
        "title": "ثبت شده"
    }
]

export const transactionLevelPrivatePersonEnums = [
    {
        title:'کمتر از 250 میلیون ریال',
        id:'One'
    },{
        title:'بین 250 تا 1,000 میلیون ریال ',
        id:'Two'
    },{
        title:'بین 1,000 تا 5,000 میلیون ریال ',
        id:'Three'
    },{
        title:'بین 5,000 تا 10,000 میلیون ریال',
        id:'Four'
    },{
        title:'بیش از 10,000 میلیون ریال ',
        id:'Five'
    },
]

export const transactionLevelLegalPersonEnums = [
    {
        title:'کمتر از 500 میلیون ریال',
        id:'eleven'
    },{
        title:'بین 500 تا 1,000 میلیون ریال ',
        id:'twelve'
    },{
        title:'بین 1,000 تا 5,000 میلیون ریال',
        id:'thirteen'
    },{
        title:'بین 5,000 تا 10,000 میلیون ریال ',
        id:'fourteen'
    },{
        title:'بیش از 10,000 میلیون ریال',
        id:'fifteen'
    },
]

export const tradingKnowledgeLevelEnums = [
    {
        title:'عالی',
        id:'Excellent'
    },{
        title:'خوب',
        id:'Good'
    },{
        title:'متوسط',
        id:'Medium'
    },{
        title:'کم',
        id:'Low'
    },{
        title:'بسیار کم',
        id:'VeryLow'
    },
]

export const fileTypeEnums = [
    {
        "code": 1,
        "title": "تصویر امضاء دریافت شده از سجام",
        "enTitle": "SejamSignature",
        "description": null
    },
    {
        "code": 2,
        "title": "تصویر امضاء آپلود شده توسط کاربر",
        "enTitle": "OnlineRegSignature",
        "description": null
    },
    {
        "code": 3,
        "title": "شناسه تصویر صفحه اول شناسنامه",
        "enTitle": "IdDocPage1Scan",
        "description": null
    },
    {
        "code": 4,
        "title": "شناسه تصویر صفحه دوم شناسنامه",
        "enTitle": "IdDocPage2Scan",
        "description": null
    },
    {
        "code": 5,
        "title": "شناسه تصویر صفحه آخر شناسنامه",
        "enTitle": "IdDocPage3Scan",
        "description": null
    },
    {
        "code": 6,
        "title": "شناسه تصویر روی کارت ملی",
        "enTitle": "IdCardFrontScan",
        "description": null
    },
    {
        "code": 7,
        "title": "شناسه تصویر پشت کارت ملی",
        "enTitle": "IdCardBackScan",
        "description": null
    },
    {
        "code": 11,
        "title": "فاکتور کارمزد بازاریاب",
        "enTitle": "MarketerCommissionBill",
        "description": null
    }
]

export const accountTypeEnums = [
    {
        id: 1,
        faTitle:'بلند مدت',
        enTitle: "LongTermAccount"
    },
    {
        id: 2,
        faTitle:'کوناه مدت',
        enTitle: "ShortTermAccount"
    },
    {
        id: 3,
        faTitle:'حساب جاری',
        enTitle: "CurrentAccount"
    },
    {
        id: 4,
        faTitle:'قرض الحسنه',
        enTitle: "SavingAccount"
    }
]

export const personType = [
    {
        "id": 1,
        "code": 1,
        "enTitle": "PrivatePerson",
        "title": "حقیقی"
    },
    {
        "id": 2,
        "code": 2,
        "enTitle": "LegalPerson",
        "title": "حقوقی"
    },
    // {
    //     "id": 3,
    //     "code": 3,
    //     "enTitle": "PrivatePortfolio",
    //     "title": "سبد اختصاصی"
    // }
]

export const legalPersonTypeCategoryEnums = [
    {
        id:'commercial',
        title:'شرکتهای تجاری'
    },
    {
        id:'NonCommercial',
        title:'شرکتهای غیرتجاری'
    },
    {
        id:'RegisteredWithLaw',
        title:'ثبت شده به موجب قانون'
    },
    {
        id:'InvestmentFunds',
        title:'صندوق سرمایه گذاری'
    }
]

export const tradingCodeTypeEnums = [
    {
        id:'Energy',
        title:'انرژی'
    },
    {
        id:'Product',
        title:'کالا'
    },
    {
        id:'StockExchange',
        title:'بورس-فرابورس'
    },
    {
        id:'None',
        title:'نامشخص'
    }
]

export const legalPersonTypeSubCategory = [
    {
        id:'PrivateCompany',
        title:'سهامی خاص'
    },
    {
        id:'LimitedCompany',
        title:'با مسئولیت محدود'
    },
    {
        id:'PublicCompany',
        title:'سهامی عام'
    },
    {
        id:'CooperativeCompany',
        title:'تعاونی'
    },
    {
        id:'GeneralPartnership',
        title:'تضامنی'
    },
    {
        id:'ProportionalLiabilityPartnership',
        title:'نسبی'
    },
    {
        id:'JointMixedCompany',
        title:'مختلط سهامی'
    },
    {
        id:'Profit',
        title:'انتفاعی'
    },
    {
        id:'NonProfit',
        title:'غیر انتفاعی'
    },
    {
        id:'LimitedPartnershipCompany',
        title:'مختلط غیر سهامی'
    },
    {
        id:'Governmental',
        title:'شخصیت حقوقی دولتی'
    },
    {
        id:'NonGovernmental',
        title:'شخصیت حقوقی عمومی'
    },
    {
        id:'DedicatedMarketing',
        title:'اختصاصی بازارگردانی'
    },
    {
        id:'RealEstate',
        title:'امالک و مستغالت'
    },
    {
        id:'Project',
        title:'پروژه ای'
    },
    {
        id:'VentureCapitalFund',
        title:'جسورانه'
    },
    {
        id:'Private',
        title:'خصوصی'
    },
    {
        id:'FixedIncomeSecurities',
        title:'در اوراق بهادار با درآمد ثابت'
    },
    {
        id:'SecuritiesWithCommodityDeposits',
        title:'در اوراق بهادار مبتنی بر سپرده کاالیی'
    },
    {
        id:'InStock',
        title:'در سهام'
    },
    {
        id:'LandAndBuildings',
        title:'زمین و ساختمان'
    },
    {
        id:'Mixed',
        title:'مختلط'
    }
]

export const agentTypeEnums = [
    {
        id:'Attorney',
        title:'وکیل'
    },{
        id:'Province',
        title:'ولی'
    },{
        id:'Conspiracy',
        title:'قیم'
    },{
        id:'Prescriptive',
        title:'وصی'
    },
]

export const LegalPersonShareholderViewModelEnums = [
    {
        id:'Chairman',
        title:'رئیس هیئت مدیره'
    },
    {
        id:'DeputyChairman',
        title:'نایب رئیس هیئت مدیره'
    },
    {
        id:'Ceo',
        title:'مدیرعامل'
    },
    {
        id:'Member',
        title:'عضو هیئت مدیره'
    },
    {
        id:'others',
        title:'سایر'
    },
    {
        id:'inspector',
        title:'بازرس'
    },
    {
        id:'auditor',
        title:'حسابرس'
    },
    {
        id:'FinancialAccountHolder',
        title:'ذیحساب مالی'
    },{
        id:'Deputy',
        title:'قائم مقام'
    },{
        id:'Agent',
        title:'نماینده'
    }
]

export const LegalPersonStakeholderTypeEnums = [
    {
        id:'Manager',
        title:'عضو هیئت مدیره'
    },
    {
        id:'TakeAccess',
        title:'عضو دارای حق برداشت'
    },
    {
        id:'OrderAccess',
        title:'عضو دارای حق سفارش'
    },
    {
        id:'Agent',
        title:'نماینده'
    }
]