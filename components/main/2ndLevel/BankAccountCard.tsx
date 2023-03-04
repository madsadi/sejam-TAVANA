import {findBank} from "../../common/functions";
import Image from 'next/image'

export default function BankAccountCard({account='603799'}) {
    const bank_info = findBank(account)

    const separator = (account:string)=>{
        const cardValue = account
            .match(/.{1,4}/g)

        return cardValue?.reverse().join(' ')
    }
    return (
        <div className="p-3 bg-gray-200 rounded-md">
            <div className="flex items-center justify-between">
                <div>
                    <Image src={`/bankIcons/${bank_info.logo}.svg`} height={24}
                           width={24} alt={bank_info.name}/>
                </div>
                <div className="highlight">{bank_info.name}</div>
                <div>
                    <Image src={`/bankIcons/${bank_info.logo}.svg`} height={24}
                           width={24} alt={bank_info.name}/>
                </div>
            </div>
            <div className="my-7 text-lg font-bold text-center">
                    <span>{separator('6037997572947886')}</span>
            </div>
            <div className={'flex justify-between'}>
                <div>
                    <div>محمد سعید انوری</div>
                    <div>IR380170000000225216721008</div>
                </div>
                <div></div>
            </div>
        </div>
    )
}