import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {useMediaQuery} from "react-responsive";

export default function AccordionComponent({children,title,extra}:{children:any,title:string,extra:any}){
    const isMobile = useMediaQuery({query: `(max-width: 760px)`});

    return(
        <div className="relative collapse border-b-2 last:border-b-0 border-border font-[PelakFA]">
            <input type="checkbox" className="peer w-full" />
            <div className={`collapse-title bg-transparent flex items-center px-2 py-4 peer-checked:hidden ${isMobile ? 'text-xs':''}`}>
                <div className={'min-w-7'}><ChevronLeftIcon className={'h-7 w-7 '} /></div>
                <h4 className={'text-right'}>{title}</h4>
                {extra}
            </div>
            <div className={`collapse-title bg-transparent hidden px-2 py-4 peer-checked:flex transition-all ${isMobile ? 'text-xs':''}`}>
                <div className={'min-w-7'}><ChevronDownIcon className={'h-7 w-7 '} /></div>
                <h4 className={'text-right'}>{title}</h4>
                {extra}
            </div>
            <div className="collapse-content bg-transparent">
                {children}
            </div>
        </div>
    )
}

AccordionComponent.defaultProps = {
    extra:''
}