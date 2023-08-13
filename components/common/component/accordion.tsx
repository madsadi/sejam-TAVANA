import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {useMediaQuery} from "react-responsive";
import {useContext, useEffect, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {ChevronUpIcon} from "@heroicons/react/20/solid";

export default function AccordionComponent({children,title,extra}:{children:any,title:string,extra:any}){
    const isMobile = useMediaQuery({query: `(max-width: 760px)`});
    const [checked,isChecked] = useState(false);

    return(
        <div className="relative collapse grow border-b-2 first:border-t-2 border-black font-[PelakFA]">
            <input type="checkbox" className="peer w-full" onChange={(e)=>isChecked(e.target.checked)}/>
            <div className={`collapse-title flex bg-transparent px-2 py-4 transition-all ${isMobile ? 'text-xs':''}`}>
                <div className={'min-w-7 ml-5'}>{checked ? <ChevronUpIcon className={'h-7 w-7 '}/>:<ChevronDownIcon className={'h-7 w-7 '} />}</div>
                <h4 className={'text-right'}>{title}</h4>
                {extra}
            </div>
            <div className={`collapse-content bg-transparent ${checked ? 'max-h-[none] pb-4':''}`}>
                {children}
            </div>
        </div>
    )
}

AccordionComponent.defaultProps = {
    extra:''
}