import moment from "jalali-moment";
import Image from 'next/image'
import {memo, useCallback, useEffect, useState} from "react";
import Resizer from "react-image-file-resizer";
import useQuery from "../../../hooks/useQuery";
import {FILE_SERVER_URL} from "../../../api/constants";

const PageHeaderFooter=()=>{
    const {fetchAsyncData:getContent} = useQuery({url:`${FILE_SERVER_URL}/api/file-manager/get-content`})

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
        await getContent({fileOwnerSoftware:1,type:1})
            .then((res)=> {
                let _D = initialDocuments;
                if (res?.data.result.length){
                    res?.data.result?.map((item:any)=>{
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
                    <img src={"/logo-black.svg"} className={'h-20 w-20'} alt="tavana"/>
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
                        <Image src={`${document?.[0]?.image ? document?.[0]?.image:''}` || 'null'} fill alt="signPhoto" quality={0} unoptimized={true}/>
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