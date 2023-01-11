import UploadComponent from './UploadCompnent';

export default function ThirdInfoBox({ setLevel }: { setLevel: any }) {

    let documents: any = {
        'signature': {
            title: 'تصویر نمونه امضا ( سجام )',
            image: ''
        },
        'passport': {
            title: 'تصویر شناسنامه',
            image: ''
        },
        'id': {
            title: 'تصویر کارت ملی',
            image: ''
        },
        'id_back': {
            title: 'تصویر پشت کارت ملی',
            image: ''
        },
        'passport_description': {
            title: 'تصویر توضیحات شناسنامه',
            image: ''
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-3">
                {
                    Object.keys(documents).map((item: any) => {
                        return (
                            <UploadComponent title={documents[item].title} id={item} documents={documents} key={item} />
                        )
                    })
                }
            </div>
            <div className='grow mt-5'>
                <span>فایل های ارسالی می بایست شرایط زیر را داشته باشند:</span>
                <ul className='list-disc pr-7 space-y-2 mt-5'>
                    <li>حجم فایل باید حداکثر 2 مگابایت باشد</li>
                    <li>فرمت فایل میتواند Jpg و Jpeg و BMP و PNG باشد. در صورت بروز مشکل در بارگذاری تصاویر می توانید فرمت فایل را تغییر دهید و سپس فایل با فرمت جدید بارگذاری نمایید.</li>
                    <li>تصویر رنگی و کامل از اصل مدارک (تصویر شناسنامه همراه سریال شناسنامه و تصویر پشت کارت ملی هوشمند همراه با بارکد پشت کارت ملی) باشد</li>
                    <li>در صورت نداشتن کارت ملی هوشمند، تصویر کامل و واضح از رسید کارت ملی را بارگزاری کنید</li>
                    <li>صفحه توضیحات در شناسنامه های قدیمی صفحه آخر می باشد و در شناسنامه های جدید صفحه دوم هست</li>
                    <li>چنانچه مشتری زیر سن قانونی (18 سال) هست و دارای کارت ملی نمی باشد، در فیلد تصویر کارت ملی می توانید مجددا تصویر شناسنامه مشتری را بارگزاری نمایید</li>
                </ul>
            </div>
            <div className="flex justify-between mt-5">
                <button className="bg-tavanBrown text-white rounded" onClick={() => setLevel(2)}>
                    مرحله قبل
                </button>
                <button className="bg-tavanaGreen text-white rounded" onClick={() => setLevel(4)}>
                    مرحله بعد
                </button>
            </div>
        </>
    )
}