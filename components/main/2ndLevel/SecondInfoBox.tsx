import {
    ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import { Select, Option, Input } from "@material-tailwind/react";
import BankAccountCard from './BankAccountCard';

export default function SecondInfoBox({ setLevel }: { setLevel: any }) {
    return (
        <>
            <div className="grow bg-white p-5">
                <div className="bg-yellow-200 border border-gray-400 px-2 md:px-5 py-2 flex items-center">
                    <ExclamationCircleIcon className='min-w-fit h-7 w-7 text-tavanaGreen' />
                    <span>تکمیل اطلاعات ساناز صادقی صدر ثبت نام خود را تکمیل نمایید</span>
                </div>
                <form className='my-5 bg-blue-100 p-5 flex flex-col'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <Select variant="outlined" label="کشور">
                            <Option>ایران</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                        <Select variant="outlined" label="استان">
                            <Option>تهران</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                        <Select variant="outlined" label="شهر">
                            <Option>تهران</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                        <div>
                            <Input label="ایمیل" />
                        </div>
                    </div>
                    <button className='button mx-auto text-xs w-fit'>
                        ثبت اطلاعات
                    </button>
                </form>
                <div className="border border-gray-400 p-5 py-2 flex items-center">
                    <ExclamationCircleIcon className='h-7 w-7 text-tavanaGreen' />
                    <span>اطلاعات ساناز صادقی صدر با موفقیت از سامانه سجام دریافت شد، لطفا ثبت نام خود را تکمیل نمایید</span>
                </div>
                <div className={'grid grid-cols-3 gap-3 my-2'}>
                    {/*<BankAccountCard />*/}
                </div>
            </div>
            <div className="flex mt-5">
                <button className="button w-fit mr-auto" onClick={() => setLevel(3)}>
                    مرحله بعد
                </button>
            </div>
        </>
    )
}