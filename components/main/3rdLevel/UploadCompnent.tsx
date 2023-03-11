import React,{useEffect, useState} from 'react';
import ImageUploading, {ImageType} from 'react-images-uploading';
import {
    CloudArrowUpIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image';
import {downloadContent, uploadPhoto} from "../../../api/Upload-documents.api";
import {toast} from "react-toastify";

export default function UploadComponent({ item, documents }: { item: any, documents: any }) {
    const [images, setImages] = useState<ImageType[]>([]);
    const target = documents.findIndex((i:any)=>i.fileType===item.fileType)

    const onChange = async (imageList: any, addUpdateIndex: any) => {
        let formData:any = new FormData()
        formData.append('file',imageList[0].file)
        formData.append('fileOwnerSoftware',1)
        formData.append('fileType',item.fileType)
        await uploadPhoto(formData)
            .then(()=>{
                setImages(imageList);
                let index = documents.findIndex((i:any)=>i.fileType===item.fileType)
                documents.splice(index,1,{...item,image:imageList[0].data_url})
            })
            .catch((err)=>toast.error(`${err?.response?.data?.error?.message}`))
        // data for submit
    };

    useEffect(()=>{
        if (documents[target]?.image){
            setImages([{data_url: documents[target].image}])
            const download = async ()=>{
                await downloadContent(documents[target]?.id)
                    .then((res)=> {
                        console.log(res)
                    })
            }
            if (documents[target]?.id){
                download()
            }
        }
    },[documents[target]?.image])


    return (
        <div>
            <div className='text-xs mb-2'>{item.title}</div>
            <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                dataURLKey="data_url"
                acceptType={['Jpg', 'Jpeg', 'BMP', 'PNG']}
                maxFileSize={2000000}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper max-h-[150px] h-[150px]">
                        {imageList.length > 0 ? imageList.map((image, index) => {
                            return (
                                    <div role={'button'} key={index} className="image-item w-full h-full relative"
                                         onClick={() => onImageUpdate(index)}>
                                        <Image src={image['data_url']} alt="" fill/>
                                    </div>
                                )
                            }) :
                            <button
                                className='border border-gray-200 w-full h-full flex'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <CloudArrowUpIcon className='h-8 w-8 text-gray-300 m-auto' />
                            </button>}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}