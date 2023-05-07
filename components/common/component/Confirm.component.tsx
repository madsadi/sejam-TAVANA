import React, {useContext, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {toast} from "react-toastify";
import {requestMock} from "../functions";

export default function ConfirmComponent({banks}:{banks:any}){
    const {setLevel,level} = useContext<any>(SejamContext)
    const [isChecked,setIsChecked]=useState(false)

    const proceed = ()=>{
        if (isChecked){
            const updateReg = async ()=>{
                await requestMock()
                    .then((res)=>setLevel(level+1))
                    .catch((err)=> toast.error(`${err?.response?.data?.error?.message}`))
            }
            updateReg()
        }else{
            toast.warning('You Must Confirm The Information')
        }
    }

    return(
        <div className="flex justify-between mt-5">
            <div className="flex items-center">
                <input className="mr-2 checkbox checkbox-accent" checked={isChecked} onChange={(e)=>setIsChecked(e.target.checked)} type="checkbox" dir={'ltr'} name="confirm"/>
                <label htmlFor="confirm">I confirm the information</label>
            </div>
            <button className="button w-fit" onClick={proceed}>
                Next
            </button>
        </div>
    )
}