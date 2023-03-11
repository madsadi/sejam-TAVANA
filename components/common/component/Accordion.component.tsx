import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function AccordionComponent({children,title}:{children:any,title:string}){

    return(
        <div className="collapse border-b-2 first:border-t-2 border-border font-[PelakFA]">
            <input type="checkbox" className="peer w-full" />
            <div className="collapse-title bg-transparent flex items-center px-2 py-4 peer-checked:hidden">
                <ChevronLeftIcon className={'h-7 w-7 '} />
                <h4>{title}</h4>
            </div>
            <div className="collapse-title bg-transparent hidden px-2 py-4 peer-checked:flex transition-all ">
                <ChevronDownIcon className={'h-7 w-7 '} />
                <h4>{title}</h4>
            </div>
            <div className="collapse-content bg-transparent">
                {children}
            </div>
        </div>
    )
}