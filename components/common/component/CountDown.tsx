import React, {useState, useEffect, useContext} from "react";
import {IdpContext} from "../../../pages";

export default function CountDown({step}:{step:string}){
    const {setLevel} = useContext<any>(IdpContext)
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [disable, setDisabled] = useState(true);

    useEffect(() => {
        let myInterval = setInterval(() => {
            setDisabled(true)
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setDisabled(false)
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });
    return(
        <div className={'flex my-auto justify-center text-sm'}>
            <div className={'w-[35px]'}> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
            <div className={'mr-2'}> تا امکان ارسال مجدد کد</div>
            {/*<button className={'py-0 px-2 mr-auto bg-tavanBrown text-white p-1 rounded disabled:text-gray-400 disabled:bg-gray-300'} type={"button"} disabled={disable}*/}
            {/*        onClick={()=>setLevel(step)}>ارسال مجدد کد</button>*/}
        </div>
    )
}