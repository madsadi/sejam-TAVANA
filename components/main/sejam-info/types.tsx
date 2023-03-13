export type SejamInfoType = {
    addresses: addressesDetail[],
    accounts: accountNumber[],
    uniqueIdentifier: string,
    legalPersonShareholders:LegalPersonShareholderType[],
    legalPersonStakeholders:legalPersonStakeholdertype[]
    agent:{
        type:string,
        expirationDate:string,
        description:string,
        uniqueIdentifier:string,
        firstName:string,
        lastName:string,
        isConfirmed:string,
    },
    legalPerson: {
        companyName: string,
        registerNumber: string,
        registerPlace: string,
        registerDate: string,
        economicCode: string,
        evidenceReleaseCompany: string,
        evidenceReleaseDate: string,
        evidenceExpirationDate: string,
        legalPersonTypeCategory: string,
        legalPersonTypeSubCategory: string,
    },
    tradingCodes: tradingCode[],
    financialInfo: {
        assetsValue: number,
        cExchangeTransaction: number,
        companyPurpose: string
        financialBrokers: financialBrokers[]
        inComingAverage: number,
        outExchangeTransaction: number,
        rate: number,
        rateDate: string
        referenceRateCompany: string
        sExchangeTransaction: number
        tradingKnowledgeLevel: string
        transactionLevel: string
    },
    jobInfo: {
        companyAddress: string,
        companyCityPrefix: string,
        companyEmail: string,
        companyFax: string,
        companyFaxPrefix: string,
        companyName: string,
        companyPhone: string,
        companyPostalCode: string,
        companyWebSite: string,
        employmentDate: string,
        job: { id: number, title: string },
        jobDescription: string,
        position: string,
    },
    privatePerson: {
        birthDate: string,
        fatherName: string,
        firstName: string,
        gender: string,
        lastName: string,
        placeOfBirth: string,
        placeOfIssue: string,
        seriSh: string,
        seriShChar: string,
        serial: string,
        shNumber: string,
        signatureFile: any
    }
}

type addressesDetail = {
    alley: string,
    city: { id: number, name: string },
    cityPrefix: string,
    country: { id: number, name: string },
    countryPrefix: string,
    email: string,
    emergencyTel: string,
    emergencyTelCityPrefix: string,
    emergencyTelCountryPrefix: string,
    fax: string,
    faxPrefix: string,
    mobile: string,
    plaque: string,
    postalCode: string,
    province: { id: number, name: string },
    remnantAddress: string,
    section: { id: number, name: string },
    tel: string,
    website: string,
}

export type accountNumber = {
    accountNumber: string
    bank: { id: number, name: string }
    branchCity: { id: number, name: string }
    branchCode: string
    branchName: string
    isDefault: boolean
    sheba: string
    type: string
}
export type bankAccount = {
    "accountNumber": string,
    "iban": string,
    "type": number,
    "cityId": number,
    "isDefault": boolean
}
export type tradingCode = {
    code: string
    firstPart: string
    secondPart: string
    thirdPart: string
    type: string
}

export type countryType = {
    "countryId": number,
    "countryName": string,
}
export type provinceType = {
    "countryId": number,
    "countryName": string,
    "provinceId": number,
    "provinceName": string
}
export type cityType = {
    "countryId": number,
    "countryName": string,
    "provinceId": number,
    "provinceName": string,
    "cityId": number,
    "cityName": string
}

type financialBrokers = {
    broker: {
        id: number,
        title: string,
        code: string
    }
}


export type LegalPersonShareholderType = {
    uniqueIdentifier:string,
    firstName:string,
    lastName:string,
    postalCode:string,
    address:string,
    positionType:string,
    percentageVotingRight:number,
}

export type legalPersonStakeholdertype = {
    uniqueIdentifier:string,
    type:string,
    positionType:string,
    startAt:string,
    endAt:string,
    isOwnerSignature:boolean,
    lastName:string,
    firstName:string,
}