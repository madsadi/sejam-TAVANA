import ImageUploading from 'react-images-uploading';
import { useState } from 'react';
import {
    CloudArrowUpIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image';

export default function UploadComponent({ title, id, documents }: { title: string, id: string, documents: any }) {
    const [images, setImages] = useState([]);
    const onChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        setImages(imageList);
        console.log(documents);

        documents[id].image = imageList[0].data_url
    };

    return (
        <div>
            <div className='text-xs mb-2'>{title}</div>
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
                        {imageList.length > 0 ? imageList.map((image, index) => (
                            <div role={'button'} key={index} className="image-item w-full h-full relative" onClick={() => onImageUpdate(index)}>
                                <Image src={image['data_url']} alt="" fill />
                            </div>
                        )) :
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