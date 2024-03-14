/* eslint-disable react-hooks/exhaustive-deps */
import { MdOutlineFileUpload } from "react-icons/md";
import { Typography } from "@material-tailwind/react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useImageUploadStore } from "../../states/imageUploadInfo";
import useImageUpload from "../../hooks/useImageUpload";
import { useEffect } from "react";
export function ImagePost() {
    const { imageInfo, setImageInfo } = useImageUploadStore();
    const [imageUrl, handleUploadImage, clearImage] = useImageUpload();
    useEffect(() => {
        setImageInfo({ ...imageInfo, url: imageUrl });
    }, [imageUrl]);

    return (
        <>
            {imageInfo.url ? (
                <div className="max-w-[375px] rounded-3xl relative">
                    <img
                        src={imageInfo.url}
                        alt="post"
                        className="object-cover w-full h-full max-h-[700px] rounded-3xl"
                    />
                    <HiOutlineXMark
                        className="absolute transition-all duration-300 bg-white rounded-full cursor-pointer top-2 right-3 size-8 hover:bg-gray-200"
                        onClick={() => clearImage()}
                    />
                </div>
            ) : (
                <div
                    className="bg-gray-300 max-w-[375px] h-full rounded-3xl relative flex flex-col-reverse text-center items-start cursor-pointer"
                    onClick={() => handleUploadImage()}
                >
                    <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <MdOutlineFileUpload className="size-20" />
                        <Typography className="text-lg font-semibold">
                            Upload Image
                        </Typography>
                    </div>
                    <Typography className="mb-4 font-medium text-md">
                        We recommend using high-quality .jpg or .png images less
                        than 20MB
                    </Typography>
                </div>
            )}
        </>
    );
}
