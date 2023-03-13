import React, {useEffect, useState} from "react";
import AccordionComponent from "../../common/component/Accordion.component";
import BeforeAfterComponent from "../../common/component/Before&After.component";
import {getAllPossibleAgreements} from "../../../api/agreement.api";
import {agreement} from "./types";
import OnlineRegistrationAgreement from "../final/تعهد نامه ثبت نام غیر حضوری";
import TotalBrokerageAgreement from "../final/قرارداد جامع مشتري و کارگزار (در خصوص اوراق بهادار)";
import PrivatePersonAgreement from "../final/تفاهم‌نامه شخص حقیقی";
import PhoneTradingAgreement from "../final/قرارداد معاملات تلفنی";
import OfflineTradingAgreement from "../final/قرارداد معاملات اینترنتی";
import OnlineTradingAgreement from "../final/قرارداد استفاده از خدمات معاملات برخط اوراق بهادار";

export default function AgreementLevel() {
    const [agreements, setAgreements] = useState<agreement[]>([])

    useEffect(() => {
        const getAgreements = async () => {
            await getAllPossibleAgreements()
                .then((res) => setAgreements(res?.result?.agreements))
        }
        getAgreements()
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
            <div className="grow bg-white p-5">
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