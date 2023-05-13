import React, {useContext, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";
import useMutation from "../../../hooks/useMutation";
import {SEJAM_URL} from "../../../api/constants";

export default function ConfirmComponent({banks}:{banks:any}){
    const {mutate:updateRegistrationState} = useMutation({url:`${SEJAM_URL}/api/request/UpdateRegistrationState`})
    const {setLevel,level} = useContext<any>(SejamContext)
    const [isChecked,setIsChecked]=useState(false)

    const proceed = ()=>{
        if (isChecked){
            const updateReg = async ()=>{
                await updateRegistrationState({registrationState:14})
                    .then(()=>setLevel(level+1))
                    .catch((err)=> toast.error(`${err?.response?.data?.error?.message}`))
            }
            updateReg()
        }else{
            toast.warning('برای ادامه به مرحله بعدی، اطلاعات را می بایست تایید کنید.')
        }
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