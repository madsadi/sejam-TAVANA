import {
    CheckCircleIcon,
} from '@heroicons/react/24/solid'

export default function BankAccountCard() {
    return (
        <div className="relative w-full border border-gray-200 px-5 py-2 bg-green-100">
            <CheckCircleIcon className='text-tavanaGreen h-7 w-7 absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 drop-shadow-md' />
            <div className="flex justify-between">
                <div className="flex space-x-2 space-x-reverse items-center">
                    <span>	سپرده کوتاه مدت</span>
                    <span className="highlight"> بانک ملی ایران - تهران</span>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                    <span>
                        <span>
                            شعبه
                        </span>
                        <span className="highlight mx-2">زبرجد</span>
                        و کد شعبه
                        <span className="highlight mx-2">1302</span>
                    </span>
                </div>
            </div>
            <div className="mt-5">
                <div className="flex space-x-2 space-x-reverse">
                    <span>شماره حساب:</span>
                    <span>0225216721008</span>
                </div>
                <div className="flex mt-3 space-x-2 space-x-reverse">
                    <span>شماره شبا:</span>
                    <span>IR380170000000225216721008</span>
                </div>
            </div>
        </div>
    )
}