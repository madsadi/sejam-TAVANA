import {toast} from "react-toastify";
import {useContext} from "react";
import {SejamContext} from "../../../pages/main";
import {updateRegState} from "../../../api/resgistration.api";

export default function BeforeAfterComponent({condition,warning}:{condition:boolean,warning:string}){
    const {setLevel,level} = useContext<any>(SejamContext)

    const proceed = ()=>{
        if (condition){
            const updateReg = async ()=>{
                await updateRegState(level===3 ? 16:17)
                    .then(()=>setLevel(level+1))
                    .catch((err)=> toast.error(`${err?.response?.data?.error?.message}`))
            }
            updateReg()
        }else{
            toast.warning(`${warning}`)
        }
    }

    return(
        <div className="flex justify-between mt-5">
            <button className="prevButton w-fit" onClick={() => setLevel(level-1)}>
                مرحله قبل
            </button>
            <button className="button w-fit" onClick={proceed}>
                مرحله بعد
            </button>
        </div>
    )
}