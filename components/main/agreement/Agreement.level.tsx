import React, {useContext, useEffect, useState} from "react";
import AccordionComponent from "../../common/component/Accordion.component";
import {agreement} from "./types";
import OnlineRegistrationAgreement from "./تعهد نامه ثبت نام غیر حضوری";
import TotalBrokerageAgreement from "./قرارداد جامع مشتري و کارگزار (در خصوص اوراق بهادار)";
import PrivatePersonAgreement from "./تفاهم\u200Cنامه شخص حقیقی";
import PhoneTradingAgreement from "./قرارداد معاملات تلفنی";
import OfflineTradingAgreement from "./قرارداد معاملات اینترنتی";
import OnlineTradingAgreement from "./قرارداد استفاده از خدمات معاملات برخط اوراق بهادار";
import {SejamContext} from "../../../pages/main";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {toast} from "react-toastify";
import OptionalAgreement from "./قراردادمعاملات اختیاری";
import useQuery from "../../../hooks/useQuery";
import {SEJAM_URL} from "../../../api/constants";
import useMutation from "../../../hooks/useMutation";

export default function AgreementLevel() {
    const {fetchAsyncData:getAllPossibleAgreements} = useQuery({url:`${SEJAM_URL}/api/request/GetAllPossibleAgreements`})
    const {fetchAsyncData:getSejamInfo} = useQuery({url:`${SEJAM_URL}/api/request/GetSejamInfo`})
    const {fetchAsyncData:getBankAccounts} = useQuery({url:`${SEJAM_URL}/api/request/GetAllBankAccounts`})
    const {mutate:approveAgreements} = useMutation({url:`${SEJAM_URL}/api/request/ApproveUserAgreements`})

    const {setLevel,level} = useContext<any>(SejamContext)
    const initialApprovedStates = [
        {
            agreementId:'0864ddc1-d7c3-4046-887f-1e94ad0ec1ca',
            status:3,
        },
        {
            agreementId:'9a09f999-7d05-4cdf-8c53-293563666397',
            status:3,
        },
        {
            agreementId:'ae3fde88-04c4-4ba2-a589-d88b7b05bdf2',
            status:3,
        },
        {
            agreementId:'f8aefb04-b0eb-4e39-b074-d7293f648aac',
            status:3,
        },
        {
            agreementId:'89a75475-b23d-4592-a985-704915dbfc88',
            status:3,
        },
        {
            agreementId:'b8966013-1d76-47d6-a962-f87d2ffef944',
            status:3,
        },
        {
            agreementId:'bfd4daf5-5b1e-4e3c-b0fe-75713131913b',
            status:3,
        },
    ]
    const {userData,setUserData,setUserDefaultBank,userDefaultBank} = useContext<any>(SejamContext)
    const [agreements, setAgreements] = useState<agreement[]>([])
    const [approvedAgreements, setApprove] = useState<any>(initialApprovedStates)
    const [loading, setLoading] = useState<boolean>(false)

    const approveHandler = (key:string,status:number=-1)=>{
        let _approves:any = [...approvedAgreements];
        let index = _approves.findIndex((item:any)=>item.agreementId===key);
        if (status>0){
            _approves.splice(index,1,{agreementId:key,status:status})
        }else{
            if (_approves[index].status===3){
                _approves.splice(index,1,{agreementId:key,status:2})
            }else{
                _approves.splice(index,1,{agreementId:key,status:3})
            }
        }
        setApprove(_approves)
    }

    useEffect(() => {
        const getAgreements = async () => {
            await getAllPossibleAgreements()
                .then((res) => {
                    let agreements = res?.data.result?.agreements
                    let _approves:any = [...approvedAgreements];
                    setAgreements(agreements)
                    agreements?.map((a:any)=>{
                        let index = _approves.findIndex((item:any)=>item.agreementId===a.id);
                        _approves.splice(index,1,{agreementId:a.id,status:a.status})
                    })
                    setApprove(_approves)
                })
        }
        const sejamInfo = async () => {
            await getSejamInfo()
                .then((res) => {
                    setUserData(JSON.parse(res?.data.result?.sejamProfile))
                })
        }
        const bankAccounts = async () => {
            await getBankAccounts()
                .then((res) => {
                    setUserDefaultBank(res?.data.result?.bankAccounts.find((item:any)=>item.isDefault))
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
        '0864ddc1-d7c3-4046-887f-1e94ad0ec1ca':<OnlineRegistrationAgreement/>,
        '9a09f999-7d05-4cdf-8c53-293563666397':<TotalBrokerageAgreement/>,
        'ae3fde88-04c4-4ba2-a589-d88b7b05bdf2':<PrivatePersonAgreement/>,
        'f8aefb04-b0eb-4e39-b074-d7293f648aac':<PhoneTradingAgreement/>,
        '89a75475-b23d-4592-a985-704915dbfc88':<OfflineTradingAgreement/>,
        'b8966013-1d76-47d6-a962-f87d2ffef944':<OnlineTradingAgreement/>,
        'bfd4daf5-5b1e-4e3c-b0fe-75713131913b':<OptionalAgreement/>,
    }

    const proceed =async ()=>{
        setLoading(true)
        await approveAgreements({agreements:approvedAgreements})
            .then(()=>setLevel(level+1))
            .catch((err)=>toast.error(`${err?.response?.data?.error?.message}`))
            .finally(()=>setLoading(true))
    }

    return (
        <>
            <div className="grow">
                {agreements.filter((item:any)=>!item.isDeleted).map((a:agreement) => {
                    return (
                        <div className={'flex'} key={a.id}>
                            <input className={'checkbox checkbox-accent ml-2 md:ml-7 mt-4'} checked={approvedAgreements.find((item:any)=>item.agreementId===a.id)?.status===2} onChange={()=>approveHandler(a.id)} type="checkbox" />
                            <AccordionComponent title={a.name} extra={a.isRequired ? <div className={'min-w-5 mr-auto md:mr-2'}><ExclamationCircleIcon className={'h-5 w-5 text-red-500'}/></div>:null}>
                                {agreementsContext[a.id]}
                            </AccordionComponent>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-between mt-5">
                <button className="prevButton w-fit" onClick={() => setLevel(level-1)}>
                    مرحله قبل
                </button>
                <button className="button w-fit flex items-center" onClick={proceed}>
                    تایید قراردادها
                    {loading && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                </button>
            </div>
        </>
    )
}

//2 taeed 3 rad