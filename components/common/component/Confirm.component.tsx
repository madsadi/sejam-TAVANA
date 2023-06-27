import React, {useContext, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";
import useMutation from "../../../hooks/useMutation";
import {SEJAM_URL} from "../../../api/constants";

export default function ConfirmComponent(){
    const {mutate:updateRegistrationState} = useMutation({url:`${SEJAM_URL}/api/request/UpdateRegistrationState`})
    const {setLevel,level} = useContext<any>(SejamContext)
    const [isChecked,setIsChecked]=useState(false)
    const [loading,setLoading]=useState(false)

    const proceed = ()=>{
        if (isChecked){
            const updateReg = async ()=>{
                setLoading(true)
                await updateRegistrationState({registrationState:14})
                    .then(()=>setLevel(level+1))
                    .catch((err)=> toast.error(`${err?.response?.data?.error?.message}`))
                    .finally(()=>setLoading(false))
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
            <button className="button flex items-center w-fit" onClick={proceed}>
                تایید
                {loading && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
            </button>
        </div>
    )
}