import UploadComponent from './UploadCompnent';
import {useState} from "react";
import BeforeAfterComponent from "../../common/component/Before&After.component";

export default function UploadDocumentsLevel() {
    let initialDocuments: any = [
        {
            title: 'Signature',
            fileType: 1,
            image: null
        },
        {
            title: 'Passport',
            fileType: 3,
            image: null
        },
        {
            title: 'ID Card',
            fileType: 4,
            image: null
        },
        {
            title: 'Driving License',
            fileType: 6,
            image: null
        }
    ]
    const [document, setDocuments] = useState<any>(initialDocuments)

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/50 backdrop-blur-md p-3 rounded-md">
                {
                    document.map((item: any) => {
                        return (
                            <UploadComponent item={item} documents={document} setDocs={setDocuments}
                                             key={item.fileType}/>
                        )
                    })}
            </div>
            <div className='grow mt-5'>
                <span className={'font-semibold text-lg'}>Files must have the following description to be allowed uploaded:</span>
                <ul className='list-disc pl-7 space-y-2 mt-5'>
                    <li>Size must not exceed 2MB</li>
                    <li>PNG,JPEG,BMP,JPG type of images are acceptable</li>
                    <li>Imges must be colorful and clear to see</li>
                </ul>
            </div>
            <BeforeAfterComponent condition={document.every((item: any) => item.image)}
                                  warning={'Please upload your documents'}/>
        </>
    )
}