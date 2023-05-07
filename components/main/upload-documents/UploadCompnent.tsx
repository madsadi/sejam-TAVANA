import React, {Dispatch, useEffect, useState} from 'react';
import ImageUploading, {ImageType} from 'react-images-uploading';
import {
    CloudArrowUpIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image';

export default function UploadComponent({ item, documents,setDocs }: { item: any, documents: any ,setDocs:Dispatch<any>}) {
    const [images, setImages] = useState<ImageType[]>([]);
    let _documents = [...documents];
    const onChange = async (imageList: any, addUpdateIndex: any) => {
        setImages(imageList);
        let index = _documents.findIndex((i:any)=>i.fileType===item.fileType)
        _documents.splice(index,1,{...item,image:imageList[0].data_url})
        setDocs(_documents)
    };

    return (
        <div>
            <div className='text-xs mb-2 md:h-[32px] lg:h-auto sm:h-auto h-[32px]'>{item.title}</div>
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
                    <div className="upload__image-wrapper max-h-[150px] w-full h-[150px] aspect-video">
                        {imageList.length > 0 ? imageList.map((image, index) => {
                            return (
                                    <div role={'button'} key={index} className="image-item h-[150px] bg-contain relative"
                                         onClick={() => onImageUpdate(index)}>
                                        <Image src={image['data_url']} fill alt="" />
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