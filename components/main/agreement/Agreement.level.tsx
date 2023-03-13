import React, {useContext, useEffect, useState} from "react";
import AccordionComponent from "../../common/component/Accordion.component";
import BeforeAfterComponent from "../../common/component/Before&After.component";
import {getAllPossibleAgreements} from "../../../api/agreement.api";
import {agreement} from "./types";
import OnlineRegistrationAgreement from "./تعهد نامه ثبت نام غیر حضوری";
import TotalBrokerageAgreement from "./قرارداد جامع مشتري و کارگزار (در خصوص اوراق بهادار)";
import PrivatePersonAgreement from "./تفاهم\u200Cنامه شخص حقیقی";
import PhoneTradingAgreement from "./قرارداد معاملات تلفنی";
import OfflineTradingAgreement from "./قرارداد معاملات اینترنتی";
import OnlineTradingAgreement from "./قرارداد استفاده از خدمات معاملات برخط اوراق بهادار";
import {SejamContext} from "../../../pages/main";
import {getBankAccounts, getSejamInfo} from "../../../api/sejam-info.api";

export default function AgreementLevel() {
    const {userData,setUserData,setUserDefaultBank,userDefaultBank} = useContext<any>(SejamContext)
    const [agreements, setAgreements] = useState<agreement[]>([])

    useEffect(() => {
        const getAgreements = async () => {
            await getAllPossibleAgreements()
                .then((res) => setAgreements(res?.result?.agreements))
        }
        const sejamInfo = async () => {
            await getSejamInfo()
                .then((res) => {
                    setUserData(JSON.parse(res?.result?.sejamProfile))
                })
        }
        const bankAccounts = async () => {
            await getBankAccounts()
                .then((res) => {
                    setUserDefaultBank(res?.result?.bankAccounts.find((item:any)=>item.isDefault))
                })
        }
        getAgreements()
        if (!userData){
            sejamInfo()
        }
        if (!userDefaultBank){
            bankAccounts()
        }
    }, [])

    const agreementsContext:any = {
        'OnlineRegistrationAgreement':<OnlineRegistrationAgreement/>,
        'TotalBrokerageAgreement':<TotalBrokerageAgreement/>,
        'PrivatePersonAgreement':<PrivatePersonAgreement/>,
        'PhoneTradingAgreement':<PhoneTradingAgreement/>,
        'OfflineTradingAgreement':<OfflineTradingAgreement/>,
        'OnlineTradingAgreement':<OnlineTradingAgreement/>,
    }

    return (
        <>
            <div className="grow bg-white p-5 rounded-md">
                {agreements.map((a:agreement) => {
                    return (
                        <AccordionComponent key={a.id} title={a.name}>
                            {agreementsContext?.OnlineRegistrationAgreement}
                        </AccordionComponent>
                    )
                })}
            </div>
            <BeforeAfterComponent warning={''} condition={true}/>
        </>
    )
}