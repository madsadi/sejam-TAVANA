import UploadComponent from './UploadCompnent';
import {useEffect, useState} from "react";
import {getContent} from "../../../api/Upload-documents.api";
import BeforeAfterComponent from "../../common/component/Before&After.component";

export default function UploadDocumentsLevel() {

    let initialDocuments: any = [
        {
            title: 'تصویر امضاء دریافت شده از سجام',
            fileType:1,
            image: null
        },
        {
            title: 'شناسه تصویر صفحه اول شناسنامه',
            fileType:3,
            image: null
        },
        {
            title: 'شناسه تصویر روی کارت ملی',
            fileType:6,
            image: null
        },
        {
            title: 'شناسه تصویر پشت کارت ملی',
            fileType:7,
            image: null
        },
        {
            title: 'شناسه تصویر صفحه آخر شناسنامه',
            fileType:5,
            image: null
        }
    ]
    const [document,setDocuments] = useState<any>([])

    useEffect(()=>{
        const getDocument = async ()=>{
            await getContent()
                .then((res)=> {
                    let _D = initialDocuments;
                    res?.result?.map((item:any)=>{
                        let _documentIndex = _D.findIndex((i:any)=>i.fileType===item.fileType)
                        if (_documentIndex>=0 && item?.content){
                            _D.splice(_documentIndex,1,{..._D[_documentIndex],id:item.id,image:`data:image/${(item.extension).split('.')[1]};base64,`+item.content})
                        }
                    })
                    setDocuments(_D)
                })
        }
        getDocument()
    },[])

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-3">
                {
                    document.map((item: any) => {
                        return (
                            <UploadComponent item={item} documents={document} key={item} />
                        )
                    })
                }
            </div>
            <div className='grow mt-5'>
                <span className={'font-semibold text-lg'}>فایل های ارسالی می بایست شرایط زیر را داشته باشند:</span>
                <ul className='list-disc pr-7 space-y-2 mt-5'>
                    <li>حجم فایل باید حداکثر 2 مگابایت باشد</li>
                    <li>فرمت فایل میتواند Jpg و Jpeg و BMP و PNG باشد. در صورت بروز مشکل در بارگذاری تصاویر می توانید فرمت فایل را تغییر دهید و سپس فایل با فرمت جدید بارگذاری نمایید</li>
                    <li>تصویر رنگی و کامل از اصل مدارک (تصویر شناسنامه همراه سریال شناسنامه و تصویر پشت کارت ملی هوشمند همراه با بارکد پشت کارت ملی) باشد</li>
                    <li>در صورت نداشتن کارت ملی هوشمند، تصویر کامل و واضح از رسید کارت ملی را بارگزاری کنید</li>
                    <li>صفحه توضیحات در شناسنامه های قدیمی صفحه آخر می باشد و در شناسنامه های جدید صفحه دوم هست</li>
                    <li>چنانچه مشتری زیر سن قانونی (18 سال) هست و دارای کارت ملی نمی باشد، در فیلد تصویر کارت ملی می توانید مجددا تصویر شناسنامه مشتری را بارگزاری نمایید</li>
                </ul>
            </div>
            <BeforeAfterComponent condition={document.every((item:any)=>item.image)} warning={'لطفا مدارک لازم را بارگزاری کنید'}/>
        </>
    )
}