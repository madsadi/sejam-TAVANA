import React, {useState, useEffect, useContext} from "react";
import {IdpContext} from "../../../pages";

export default function CountDown(){
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
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
        <div className={'flex mt-4 text-sm'}>
            <div className={'ml-2'}>Code is valid until:</div>
            <div className={'w-[35px] ml-auto'}> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
        </div>
    )
}