import {
    ExclamationCircleIcon,
} from '@heroicons/react/24/solid'

export default function ForthInfoBox({ setLevel }: { setLevel: any }) {

    const questions = [
        {
            title: 'در نماد وبانک، حرف اول *و* چه چیز را نشان می دهد؟',
            options: ['صنعت', 'نوع اوراق', 'نام شرکت', 'هیچکدام']
        },
        {
            title: 'اولوّیت انجام معاملات به چه صورتی می باشد؟',
            options: ['قیمت سفارش', 'قیمت سپس زمان ورود سفارش', 'زمان سپس قیمت ورود', 'زمان سفارش']
        },
        {
            title: 'کارگزار ناظر کیست؟',
            options: ['کارگزاری می باشد که سهامدار می تواند تعداد سهام های خود را در آن افزایش دهد', 'کارگزاری می باشد که سهامدار از طریق آن شرکت اقدام به خرید سهام نموده است.', 'کارگزاری است که سهامداران می توانند دارایی سهام خود تحت نظر آن کارگزار را صرفاً از طریق همان کارگزار به فروش برسانند', 'همه موارد']
        },
        {
            title: 'تسویه معاملات در چند روز بعد از انجام معامله صورت می گیرد؟',
            options: ['٢ روز', '٣ روز', '٣ روز کاری', '٢ روز کاری']
        },
        {
            title: 'کدام یک از وظایف مجمع عمومی فوق العاده است؟',
            options: ['تغییر اساسنامه', 'انحلال شرکت', 'تغییر سرمایه شرکت', 'همه موارد']
        },
        {
            title: 'نماد شپنا مربوط به کدامیک از شرکت های زیر می باشد؟',
            options: ['پالایش نفت تهران', 'پالایش نفت تبریز', 'پالایش نفت اصفهان', 'پالایش نفت بندرعباس']
        },
        {
            title: 'جامع ترین و بهترین گزینه کدام است؟',
            options: ['قیمت سهام در بازار توسط خریدار تعیین می شود', 'قیمت سهام در بازار بر اساس عرضه و تقاضا تعیین می شود', 'قیمت سهام در بازار توسط فروشنده تعیین می شود', 'قیمت سهام در بازار توسط شرکت بورس تعیین می شود']
        },
        {
            title: ' کدام "دامنه نوسان قیمت مجاز" در بازار سرمایه صحیح است:',
            options: ['از -5 تا +5', 'از -10 تا +10', 'از -3 تا +3', 'همه موارد (پاسخ صحیح)']
        },
        {
            title: ' معاملات اوراق بهادار در بورس تهران در چه ساعاتی انجام می گیرد؟',
            options: ['09:00 تا 12:30', '08:30 تا 11:50', '08:50 تا 12:50', '08:30 تا 12:00']
        },
        {
            title: 'ارزش اسمی هر سهم شرکت‌های سهامی عام معمولاً چند ریال است؟',
            options: ['100 ریال', '10000 ریال', '10 ریال', '1000 ریال']
        }
    ]
    return (
        <div className='pb-5'>
            <div className="bg-white p-5">
                <div className="flex items-center mb-5">
                    <ExclamationCircleIcon className='h-7 w-7 ml-2 text-tavanaGreen' />
                    <span> آزمون آنلاین بورس را تکمیل نمایید</span>
                </div>
                {
                    questions.map((question: any, index: number) => {
                        return (
                            <div key={question.title} className='mb-3 border border-gray-300 p-3'>
                                <span className='text-tavanaGreen text-lg'>
                                    {index + 1}
                                    -
                                    {question.title}
                                </span>
                                <div className='space-y-2 mt-3'>
                                    {
                                        question.options.map((option: string) => {
                                            return (
                                                <div key={option}>
                                                    <input type="checkbox" />
                                                    <label className='mr-2'>{option}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-between mt-5">
                <button className="bg-tavanBrown text-white rounded" onClick={() => setLevel(3)}>
                    مرحله قبل
                </button>
                <button className="bg-tavanaGreen text-white rounded" onClick={() => setLevel(5)}>
                    مرحله بعد
                </button>
            </div>
        </div>
    )
}