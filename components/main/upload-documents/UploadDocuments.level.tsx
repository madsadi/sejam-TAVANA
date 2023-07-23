import UploadComponent from './UploadCompnent';
import { useContext, useEffect, useState } from "react";
import BeforeAfterComponent from "../../common/component/Before&After.component";
import AccordionComponent from "../../common/component/Accordion.component";
import useQuery from "../../../hooks/useQuery";
import { FILE_SERVER_URL, SEJAM_URL } from "../../../api/constants";
import { SejamContext } from '../../../pages/main';

export default function UploadDocumentsLevel() {
    const { regInfo } = useContext<any>(SejamContext)
    const { fetchAsyncData: getContent } = useQuery({ url: `${FILE_SERVER_URL}/api/file-manager/get-content` })
    const [loading, setLoading] = useState(false)
    let initialDocuments: any = [
        {
            title: 'تصویر امضاء دریافت شده از سجام',
            fileType: 1,
            image: null
        },
        {
            title: 'تصویر صفحه اول شناسنامه',
            fileType: 3,
            image: null
        },
        {
            title: 'تصویر صفحه توضیحات شناسنامه',
            fileType: 4,
            image: null
        },
        {
            title: 'تصویر روی کارت ملی',
            fileType: 6,
            image: null
        }
    ]
    let agentDocuments: any = [
        {
            title: 'تصویر امضاء دریافت شده از سجام',
            fileType: 1,
            image: null
        },
        {
            title: 'تصویر صفحه اول شناسنامه',
            fileType: 3,
            image: null
        },
        {
            title: 'تصویر صفحه توضیحات شناسنامه',
            fileType: 4,
            image: null
        },
        {
            title: 'تصویر روی کارت ملی',
            fileType: 6,
            image: null
        },
        {
            fileType: 8,
            title: "تصویر صفحه اول شناسنامه وکیل",
            image: null
        },
        {
            fileType: 10,
            title: "تصویر روی کارت ملی وکیل",
            image: null
        },
        {
            fileType: 11,
            title: "تصویر وکالت نامه",
            image: null
        },
    ]
    let legalDocuments: any = [
        {
            fileType: 8,
            title: "تصویر صفحه اول شناسنامه وکیل",
            image: null
        },
        {
            fileType: 9,
            title: "تصویر صفحه توضیحات شناسنامه وکیل",
            image: null
        },
        {
            fileType: 10,
            title: "تصویر روی کارت ملی وکیل",
            image: null
        },
        {
            fileType: 12,
            title: "تصویر آخرین روزنامه رسمی اعضای هیات مدیره",
            image: null
        },
        {
            fileType: 13,
            title: "تصویر امضاء رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 14,
            title: "تصویر صفحه اول شناسنامه رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 15,
            title: "تصویر صفحه توضیحات شناسنامه رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 16,
            title: "تصویر روی کارت ملی رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 17,
            title: "تصویر امضاء مدیر عامل",
            image: null
        },
        {
            fileType: 18,
            title: "تصویر صفحه اول شناسنامه مدیر عامل",
            image: null
        },
        {
            fileType: 19,
            title: "تصویر صفحه توضیحات شناسنامه مدیر عامل",
            image: null
        },
        {
            fileType: 20,
            title: "تصویر روی کارت ملی مدیر عامل",
            image: null
        },
        {
            fileType: 21,
            title: "تصویر امضاء عضو هیئت مدیره",
            image: null
        },
        {
            fileType: 22,
            title: "تصویر صفحه اول شناسنامه عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
        {
            fileType: 23,
            title: "تصویر صفحه توضیحات شناسنامه عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
        {
            fileType: 24,
            title: "تصویر روی کارت ملی عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
    ]
    const [document, setDocuments] = useState<any>(initialDocuments)

    let firstDeck = [
        {
            fileType: 8,
            title: "تصویر صفحه توضیحات شناسنامه وکیل",
            image: null
        },
        {
            fileType: 10,
            title: "تصویر روی کارت ملی وکیل",
            image: null
        },
        {
            fileType: 11,
            title: "تصویر وکالت نامه",
            image: null
        }
    ]
    let secondDeck = [
        {
            fileType: 12,
            title: "تصویر آخرین روزنامه رسمی اعضای هیات مدیره",
            image: null
        },
        {
            fileType: 13,
            title: "تصویر امضاء رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 14,
            title: "تصویر صفحه اول شناسنامه رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 15,
            title: "تصویر صفحه توضیحات شناسنامه رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 16,
            title: "تصویر روی کارت ملی رئیس هیات مدیره",
            image: null
        }
    ]
    let thirdDeck = [
        {
            fileType: 17,
            title: "تصویر امضاء مدیر عامل",
            image: null
        },
        {
            fileType: 18,
            title: "تصویر صفحه اول شناسنامه مدیر عامل",
            image: null
        },
        {
            fileType: 19,
            title: "تصویر صفحه توضیحات شناسنامه مدیر عامل",
            image: null
        },
        {
            fileType: 20,
            title: "تصویر روی کارت ملی مدیر عامل",
            image: null
        }
    ]
    let forthDeck = [
        {
            fileType: 21,
            title: "تصویر امضاء عضو هیئت مدیره",
            image: null
        },
        {
            fileType: 22,
            title: "تصویر صفحه اول شناسنامه عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
        {
            fileType: 23,
            title: "تصویر صفحه توضیحات شناسنامه عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
        {
            fileType: 24,
            title: "تصویر روی کارت ملی عضو هیات مدیره (صاحب امضاء)",
            image: null
        }
    ]

    useEffect(() => {
        const getDocument = async (D: any) => {
            setLoading(true)
            await getContent({ fileOwnerSoftware: 1 })
                .then((res) => {
                    let _document = D
                    res?.data.result?.map((item: any) => {
                        let _documentIndex = _document.findIndex((i: any) => i.fileType === item.fileType)
                        if (_documentIndex >= 0 && item?.content) {
                            _document.splice(_documentIndex, 1, {
                                ..._document[_documentIndex],
                                id: item.id,
                                image: `data:image/${(item.extension).split('.')[1]};base64,` + item.content
                            })
                        }
                    })
                    setDocuments(_document)
                })
                .finally(() => setLoading(false))
        }
        if (regInfo) {
            let _D: any
            if (regInfo.hasAgent) {
                _D = agentDocuments;
            } else if (regInfo.personType === 2) {
                _D = legalDocuments;
            } else {
                _D = initialDocuments;
            }
            getDocument(_D)
        }
    }, [regInfo])

    return (
        <>
            {regInfo?.personType === 2 ? <div>
                <AccordionComponent title={'مدارک وکیل'}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {firstDeck.map((item: any) => {
                            return (
                                <UploadComponent item={item} loading={loading} documents={document} setDocs={setDocuments}
                                    key={item.fileType} />
                            )
                        })}
                    </div>
                </AccordionComponent>
                <AccordionComponent title={'مدارک مدیر عامل'}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {secondDeck.map((item: any) => {
                            return (
                                <UploadComponent item={item} loading={loading} documents={document} setDocs={setDocuments}
                                    key={item.fileType} />
                            )
                        })}
                    </div>
                </AccordionComponent>
                <AccordionComponent title={'مدارک مدیر عامل'}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {thirdDeck.map((item: any) => {
                            return (
                                <UploadComponent item={item} loading={loading} documents={document} setDocs={setDocuments}
                                    key={item.fileType} />
                            )
                        })}
                    </div>
                </AccordionComponent>
                <AccordionComponent title={'مدارک عضو هیئت مدیره'}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {forthDeck.map((item: any) => {
                            return (
                                <UploadComponent item={item} loading={loading} documents={document} setDocs={setDocuments}
                                    key={item.fileType} />
                            )
                        })}
                    </div>
                </AccordionComponent>
            </div>
                :
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3">
                    {
                        document.map((item: any) => {
                            return (
                                <UploadComponent item={item} loading={loading} documents={document} setDocs={setDocuments}
                                    key={item.fileType} />
                            )
                        })}
                </div>}
            <div className='grow mt-5'>
                <span className={'font-semibold text-lg'}>فایل های ارسالی می بایست شرایط زیر را داشته باشند:</span>
                <ul className='list-disc pr-7 space-y-2 mt-5'>
                    <li>حجم فایل باید حداکثر 2 مگابایت باشد</li>
                    <li>فرمت فایل میتواند Jpg و Jpeg و BMP و PNG باشد. در صورت بروز مشکل در بارگذاری تصاویر می توانید
                        فرمت فایل را تغییر دهید و سپس فایل با فرمت جدید بارگذاری نمایید
                    </li>
                    <li>تصویر رنگی و کامل از اصل مدارک (تصویر شناسنامه همراه سریال شناسنامه و تصویر پشت کارت ملی هوشمند
                        همراه با بارکد پشت کارت ملی) باشد
                    </li>
                    <li>در صورت نداشتن کارت ملی هوشمند، تصویر کامل و واضح از رسید کارت ملی را بارگزاری کنید</li>
                    <li>صفحه توضیحات در شناسنامه های قدیمی صفحه آخر می باشد و در شناسنامه های جدید صفحه دوم هست</li>
                    <li>چنانچه مشتری زیر سن قانونی (18 سال) هست و دارای کارت ملی نمی باشد، در فیلد تصویر کارت ملی می
                        توانید مجددا تصویر شناسنامه مشتری را بارگزاری نمایید
                    </li>
                </ul>
            </div>
            <BeforeAfterComponent condition={document.every((item: any) => item.image)}
                warning={'لطفا مدارک لازم را بارگذاری کنید'} />
        </>
    )
}