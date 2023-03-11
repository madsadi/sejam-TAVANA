import {toast} from "react-toastify";
import {useContext} from "react";
import {SejamContext} from "../../../pages/main";

export default function BeforeAfterComponent({condition,warning}:{condition:boolean,warning:string}){
    const {setLevel,level} = useContext<any>(SejamContext)

    const proceed = ()=>{
        if (condition){
            setLevel(level+1)
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