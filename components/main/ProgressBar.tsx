export default function ProgressBar({ level }: { level: number }) {

    const progress = [
        {
            title: 'دریافت اطلاعات سجامی',
            level: 1,
        },
        {
            title: 'اطلاعات مالی',
            level: 2,
        },
        {
            title: 'بارگذاری مدارک',
            level: 3,
        },
        {
            title: 'آزمون آنلاین بورس',
            level: 4,
        },
        {
            title: 'خدمات کارگزاری',
            level: 5,
        },
        {
            title: 'در انتظار تایید مشتری',
            level: 6,
        }
    ]
    return (
        <div className="flex mb-10">
            {
                progress.map((step: any) => {
                    return (
                        <div className={`flex ${step.level === 6 ? 'w-fit' : 'grow'}`} key={step.level}>
                            <div className="text-center mx-2 text-xs ">
                                <div className={`bg-white py-1 px-2 w-fit mx-auto rounded-full border-2 ${level >= step.level ? 'border-tavanaGreen' : 'border-gray-400'}`}>
                                    {step.level}
                                </div>
                                <div className="mt-3">{step.title}</div>
                            </div>
                            {step.level !== 6 && <div className="relative overflow-hidden grow my-auto bg-gray-400 h-2 rounded">
                                <div className={`absolute bg-green-500 h-full right-0 transition-all duration-500 ${level > step.level ? 'w-full' : 'w-0'}`}>

                                </div>
                            </div>}
                        </div>
                    )
                })
            }
        </div >
    )
}