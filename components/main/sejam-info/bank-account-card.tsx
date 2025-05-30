import React from 'react';
import { findBank } from "../../common/functions";
import Image from 'next/image'
import { accountNumber } from "./types";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function BankAccountCard({ accountInfo, setDefaultBank }: { accountInfo: accountNumber, setDefaultBank: Function }) {
    const bank_info = findBank(accountInfo?.bank.name)

    const separator = (account: string) => {
        if (account) {
            const cardValue = account
                .match(/.{1,4}/g)

            return cardValue?.reverse().join(' ')
        } else {
            ''
        }
    }

    return (
        <div>
            <div className="p-3 px-8 bg-bankCard rounded-md relative cursor-pointer" onClick={() => setDefaultBank(accountInfo)}>
                {accountInfo?.isDefault ? <div className={'absolute -top-2 -right-2'}>
                    <CheckBadgeIcon className={'h-5 w-5 text-tavanaPurple'} />
                </div> : null}
                <div className="flex items-center justify-between">
                    <div className="highlight">{bank_info?.name}</div>
                    <div>
                        <Image src={`/bankIcons/${bank_info?.logo}.svg`} height={24}
                            width={24} alt={bank_info?.name} />
                    </div>
                </div>
                <div className="my-5 text-lg font-bold text-center">
                    <span>{separator(accountInfo?.accountNumber)}</span>
                </div>
                <div className={'space-y-3'}>
                    <div className={'flex items-center'}>
                        <div className={'ml-2 text-xs font-light'}>شعبه:</div>
                        {accountInfo?.branchName && <div
                            className={'font-semibold'}>{accountInfo?.branchName + ' ' + accountInfo?.branchCode}</div>}
                    </div>
                    <div className={'text-sm'}>{accountInfo?.sheba}</div>
                </div>
            </div>
            {accountInfo?.isDefault ?
                <p className={'mt-2 text-tavanaPurple text-xs text-center w-full'}> حساب پیش فرض </p> : null}
        </div>
    )
}