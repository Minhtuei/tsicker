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
                <div className="min-w-[375px] rounded-3xl relative">
                    <img
                        src={imageInfo.url}
                        alt="post"
                        className="object-cover w-full h-full rounded-3xl"
                    />
                    <HiOutlineXMark
                        className="absolute top-2 right-3 size-8 bg-white rounded-full cursor-pointer hover:bg-gray-200 transition-all duration-300"
                        onClick={() => clearImage()}
                    />
                </div>
            ) : (
                <div
                    className="bg-gray-300 min-w-[375px] h-full rounded-3xl relative flex flex-col-reverse text-center items-start cursor-pointer"
                    onClick={() => handleUploadImage()}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <MdOutlineFileUpload className="size-20" />
                        <Typography className="font-semibold text-lg">
                            Upload Image
                        </Typography>
                    </div>
                    <Typography className="text-md font-medium mb-4">
                        We recommend using high-quality .jpg or .png images less
                        than 20MB
                    </Typography>
                </div>
            )}
        </>
    );
}
