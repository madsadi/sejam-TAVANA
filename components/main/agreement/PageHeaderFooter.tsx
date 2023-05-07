import moment from "jalali-moment";
import Image from 'next/image'
import {memo} from "react";

const PageHeaderFooter=()=>{

    return(
        <>
            <div className="page-header">
                <div className="logo-card relative">
                    <img src={"/logo.svg"} alt="tavana"/>
                </div>
                <div className="mt-5 flex font-bold">
                    <div className={'text-sm mr-2'}> Date:</div>
                    <span>
                        {moment().locale('en').format('YYYY/MM/DD')}
                    </span>
                </div>
            </div>
            <div className="page-footer">
                <div className="text-left">
                    <div className={'titleValue'}> Customer Signature :</div>
                    <div className="sign-card relative">
                        <Image src={"/img.png"} fill alt="signPhoto" quality={0} unoptimized={true}/>
                    </div>
                </div>
                <div className={'text-left'}>
                    <div className={'titleValue'}> Employee signature :</div>
                </div>
            </div>
        </>
    )
}

export default memo(PageHeaderFooter);