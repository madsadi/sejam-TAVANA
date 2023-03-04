import {
    ExclamationCircleIcon, CheckIcon
} from '@heroicons/react/24/solid'

export default function FifthInfoBox({ setLevel }: { setLevel: any }) {
    return (
        <>
            <div className="grow min-h-fit bg-white p-5">
                <div className='border border-gray-200 p-5'>
                    <span>
                        انتخاب خدمات مورد نظر:
                    </span>
                    <div className='flex space-x-10 space-x-reverse mt-5'>
                        <div className='flex bg-green-100 rounded-full p-2 px-4 text-sm'>
                            <p>اینترنتی (آفلاین)</p>
                            <CheckIcon className='h-5 w-5 mr-3 text-tavanaGreen' />
                        </div>
                        <div className='flex bg-green-100 rounded-full p-2 px-4 text-sm'>
                            <p>معاملات بر خط (آنلاین)</p>
                            <CheckIcon className='h-5 w-5 mr-3 text-tavanaGreen' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col border border-gray-200 p-5 mt-2'>
                    <span>
                        انتخاب روش احراز هویت (کارگزاری):
                    </span>
                    <div className='flex w-fit my-5 bg-green-100 rounded-full p-2 px-4 text-sm'>
                        <p>الکترونیک (غیر حضوری)</p>
                        <CheckIcon className='h-5 w-5 mr-3 text-tavanaGreen' />
                    </div>
                    <div className="flex items-center">
                        <ExclamationCircleIcon className='h-7 w-7 text-tavanaGreen' />
                        <span>برای ادامه لطفا تعهدنامه را تایید کنید</span>
                    </div>
                    <button className='button w-fit mx-auto text-xs'>تایید تعهد نامه</button>
                </div>
            </div>
            <div className="flex justify-between mt-5">
                <button className="prevButton w-fit" onClick={() => setLevel(4)}>
                    مرحله قبل
                </button>
                <button className="button w-fit" onClick={() => setLevel(6)}>
                    مرحله بعد
                </button>
            </div>
        </>
    )
}