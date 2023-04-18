import React, {useContext, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";
import {updateRegState} from "../../../api/resgistration.api";
import {accountNumber} from "../../main/sejam-info/types";
import {accountTypeEnums} from "../enums";
import {registerBankAccount} from "../../../api/sejam-info.api";

export default function ConfirmComponent({banks}:{banks:any}){
    const {setLevel,level} = useContext<any>(SejamContext)
    const [isChecked,setIsChecked]=useState(false)

    const proceed = ()=>{
        if (isChecked){
            regBanks()
            const updateReg = async ()=>{
                await updateRegState(15)
                    .then((res)=>setLevel(level+1))
                    .catch((err)=> toast.error(`${err?.response?.data?.error?.message}`))
            }
            updateReg()
        }else{
            toast.warning('برای ادامه به مرحله بعدی، اطلاعات را می بایست تایید کنید.')
        }
    }

    const regBanks = async ()=>{
        let restOfAccounts = banks.map((b:accountNumber)=>{
            return ({
                "accountNumber": b.accountNumber,
                "iban": b.sheba,
                "type": accountTypeEnums.find((item:any)=>item.enTitle===b.type)?.id,
                "cityId": b.branchCity.id,
                "isDefault": b.isDefault
            })
        })
        await registerBankAccount({bankAccounts:restOfAccounts})
    }
    return(
        <div className="flex justify-between mt-5">
            <div className="flex items-center">
                <input className="ml-2 checkbox checkbox-accent" checked={isChecked} onChange={(e)=>setIsChecked(e.target.checked)} type="checkbox" dir={'ltr'} name="confirm"/>
                <label htmlFor="confirm">اطلاعات مورد تایید است</label>
            </div>
            <button className="button w-fit" onClick={proceed}>
                تایید
            </button>
        </div>
    )
}