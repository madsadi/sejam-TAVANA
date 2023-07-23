import React, { Dispatch, useEffect, useState } from 'react';
import ImageUploading, { ImageType } from 'react-images-uploading';
import {
    CloudArrowUpIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image';
import { toast } from "react-toastify";
import useMutation from "../../../hooks/useMutation";
import { FILE_SERVER_URL } from "../../../api/constants";

export default function UploadComponent({ item, documents, setDocs, loading }: { item: any, documents: any, setDocs: Dispatch<any>, loading: boolean }) {
    const { mutate: uploadPhoto } = useMutation({ url: `${FILE_SERVER_URL}/api/file-manager/upload` })

    const [images, setImages] = useState<ImageType[]>([]);
    const target = documents.findIndex((i: any) => i.fileType === item.fileType)
    const onChange = async (imageList: any, addUpdateIndex: any) => {
        if (item.fileType === 1) {
            toast.warning('تصویر امضا قابل بارگزاری نمی باشد.')
        } else {
            let formData: any = new FormData()
            formData.append('file', imageList[0].file)
            formData.append('fileOwnerSoftware', 1)
            formData.append('fileType', item.fileType)
            await uploadPhoto({ formData }, {}, {
                'Content-Type': 'multipart/form-data'
            })
                .then(() => {
                    setImages(imageList);
                    let _documents = [...documents]
                    let index = _documents.findIndex((i: any) => i.fileType === item.fileType)
                    _documents.splice(index, 1, { ...item, image: imageList[0].data_url })
                    setDocs(_documents)
                })
                .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
        }
    };


    useEffect(() => {
        if (item?.image) {
            setImages([{ data_url: item.image }])
        }
    }, [item?.image])


    return (
        <div>
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
                    <div className="upload__image-wrapper md:max-h-[250px] max-h-[150px] w-full md:h-[250px] h-[150px] aspect-video">
                        {imageList.length > 0 ? imageList.map((image, index) => {
                            return (
                                <div role={'button'} key={index} className="image-item md:h-[250px] h-[150px] bg-contain relative"
                                    onClick={() => item.fileType === 1 ? toast.warning('تصویر امضا قابل بارگزاری نمی باشد.') : onImageUpdate(index)}>
                                    <Image src={image['data_url']} fill alt="" />
                                </div>
                            )
                        }) :
                            <button
                                className='border-2 border-dashed border-black bg-bankCard w-full h-full flex'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <div className='m-auto flex flex-col'>
                                    <div className={`h-8 w-8 relative m-auto ${loading ? 'animate-spin' : ''}`}>
                                        <Image src={loading ? '/icons/spinner-light.svg' : '/upload.svg'} fill alt="" />
                                    </div>
                                    {loading ? null : <p className={'mt-1'}>آپلود فایل</p>}
                                </div>
                            </button>}
                    </div>
                )}
            </ImageUploading>
            <div className='text-xs text-center mt-2 font-semibold md:h-[32px] lg:h-auto sm:h-auto h-[32px]'>{item.title}</div>
        </div>
    )
}