import moment from "jalali-moment";
import Image from 'next/image'
import {memo, useCallback, useEffect, useState} from "react";
import {getContent} from "../../../api/Upload-documents.api";
import Resizer from "react-image-file-resizer";

const PageHeaderFooter=()=>{

    let initialDocuments: any = [
        {
            title: 'تصویر امضاء دریافت شده از سجام',
            fileType:1,
            image: null
        }
    ]
    const [document,setDocuments] = useState<any>([])

    const resizeFile = (file:any) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                200,
                100,
                "PNG",
                20,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const resizeHandlder = async (file:any)=>{
        const image = await resizeFile(file);
        let __D = document;
        setDocuments([{...__D,image:image}])
    }
    const getDocument = useCallback(async ()=>{
        await getContent(1)
            .then((res)=> {
                let _D = initialDocuments;
                if (res?.result.length){
                    res?.result?.map((item:any)=>{
                        let _documentIndex = _D.findIndex((i:any)=>i.fileType===item.fileType)
                        if (_documentIndex>=0 && item?.content){
                            fetch(`data:image/${(item.extension).split('.')[1]};base64,`+item.content)
                                .then(res => res.blob())
                                .then(blob => {
                                    const file = new File([blob], "File name",{ type: "image/png" })
                                    resizeHandlder(file)
                                })
                        }
                    })
                }
                setDocuments(_D)
            })
    },[])

    useEffect(()=>{
        getDocument()
    },[])

    return(
        <>
            <div className="page-header">
                <div className="logo-card relative">
                    <img src={"/logo.svg"} alt="tavana"/>
                </div>
                <div className="mt-5 flex font-weight-bold">
                    <div className={'text-sm ml-2'}> تاریخ :</div>
                    <span>
                        {moment().locale('fa').format('YYYY/MM/DD')}
                    </span>
                </div>
            </div>
            <div className="page-footer">
                <div className="text-right">
                    <div className={'titleValue'}> امضاء مشتري / نماینده :</div>
                    <div className="sign-card relative">
                        <Image src={`${document?.[0]?.image ? document?.[0]?.image:''}`} fill alt="signPhoto" quality={0} unoptimized={true}/>
                    </div>
                </div>
                <div className="text-left">
                    <div className={'titleValue'}> امضاء مسئول پذیرش :</div>
                </div>
            </div>
        </>
    )
}

export default memo(PageHeaderFooter);