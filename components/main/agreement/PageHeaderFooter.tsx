import moment from "jalali-moment";
import Image from 'next/image'

export default function PageHeaderFooter(){
    return(
        <>
            {/*<div className="page-header flex justify-between">*/}
            {/*    <div className="logo-card">*/}
            {/*        <Image src="/icons/logo.jpg" height={90} width={150} alt="singPhoto"/>*/}
            {/*    </div>*/}
            {/*    <div className="mt-5 font-weight-bold">*/}
            {/*        <div> تاریخ :</div>*/}
            {/*        <div>*/}
            {/*            {moment().locale('fa').format('YYYY/MM/DD')}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="page-footer flex justify-between">*/}
            {/*    <div className="text-right">*/}
            {/*        <h4>نمونه امضاء مشتري / نماینده :</h4>*/}
            {/*        <div className="sign-card">*/}
            {/*            <Image src={"/icons/logo.jpg"} height={90} width={150} alt="singPhoto"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="text-left">*/}
            {/*        <h4>نمونه امضاء مسئول پذیرش :</h4>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}