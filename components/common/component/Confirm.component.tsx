import React, {useContext, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";

export default function ConfirmComponent(){
    const {setLevel,level} = useContext<any>(SejamContext)
    const [isChecked,setIsChecked]=useState(false)

    const proceed = ()=>{
        if (isChecked){
            setLevel(level+1)
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