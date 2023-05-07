import React, {useContext, useState} from "react";
import AccordionComponent from "../../common/component/Accordion.component";
import {agreement} from "./types";
import OnlineRegistrationAgreement from "./تعهد نامه ثبت نام غیر حضوری";
import {SejamContext} from "../../../pages/main";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";

export default function AgreementLevel() {
    const {setLevel,level} = useContext<any>(SejamContext)
    const initialApprovedStates = [
        {
            agreementId:'agreement',
            status:3,
        }
    ]
    const {userData,setUserData,setUserDefaultBank,userDefaultBank} = useContext<any>(SejamContext)
    const [agreements, setAgreements] = useState<agreement[]>([{
        id:'agreement',
        name:'agreement',
        isRequired:true
    }])
    const [approvedAgreements, setApprove] = useState<any>(initialApprovedStates)

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

    const agreementsContext:any = {
        'agreement':<OnlineRegistrationAgreement/>,
    }

    const proceed =async ()=>{
        setLevel(level+1)
    }

    return (
        <>
            <div className="grow bg-white p-5 rounded-md backdrop-blur-md">
                {agreements.filter((item:any)=>!item.isDeleted).map((a:agreement) => {
                    return (
                        <div className={'flex border-b-2 last:border-b-0 border-border'} key={a.id}>
                            <input className={'checkbox checkbox-accent ml-2 md:ml-7 mt-4'} checked={approvedAgreements.find((item:any)=>item.agreementId===a.id)?.status===2} onChange={()=>approveHandler(a.id)} type="checkbox" />
                            <AccordionComponent title={a.name} extra={a.isRequired ? <div className={'min-w-5 ml-auto md:ml-2'}><ExclamationCircleIcon className={'h-5 w-5 text-red-500'}/></div>:null}>
                                {agreementsContext[a.id]}
                            </AccordionComponent>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-between mt-5">
                <button className="prevButton w-fit" onClick={() => setLevel(level-1)}>
                    Previous
                </button>
                <button className="button w-fit" onClick={proceed}>
                    Next
                </button>
            </div>
        </>
    )
}
