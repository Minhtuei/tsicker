/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { MdOutlineFileUpload } from "react-icons/md";
import { Typography, Tooltip } from "@material-tailwind/react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useImageUploadStore } from "../../states/imageUploadInfo";
import useImageUpload from "../../hooks/useImageUpload";
import { useState, useEffect } from "react";
import ReactCompareImage from "react-compare-image";
import { getImageUrl } from "../../utils/convertImageFile";
export function ImagePost() {
    const { imageInfo, setImageInfo, setImageFile } = useImageUploadStore();
    const [file, handleUploadImage, clearImage] = useImageUpload();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);
    useEffect(() => {
        const fetchImageUrl = async () => {
            if (file) {
                setImageFile(file);
                try {
                    const url = await getImageUrl(file);
                    setImageInfo({ url });
                } catch (error) {
                    console.log(error);
                }
            } else {
                setImageInfo({
                    url: "",
                    cartoonURL: "",
                    theme: "",
                    sketch: {},
                    style: "",
                });
                setImageFile(null);
            }
        };
        fetchImageUrl();
        console.log(file);
    }, [file]);

    return (
        <>
            {imageInfo.url ? (
                <div className="max-w-[375px] rounded-3xl relative w-[375px] select-none">
                    {imageInfo.cartoonURL ? (
                        <Tooltip
                            content="Drag this slider to compare two images"
                            placement="left"
                        >
                            <div className="div">
                                <ReactCompareImage
                                    leftImage={imageInfo.url}
                                    rightImage={
                                        imageInfo.cartoonURL || imageInfo.url
                                    }
                                    leftImageCss={{
                                        borderRadius: "2.5rem",
                                        objectFit: "cover",
                                    }}
                                    rightImageCss={{
                                        borderRadius: "2.5rem",
                                        objectFit: "cover",
                                    }}
                                    aspectRatio="wider"
                                    sliderPositionPercentage={0}
                                />
                            </div>
                        </Tooltip>
                    ) : (
                        <img
                            src={imageInfo.url}
                            alt="post"
                            className="object-cover w-full h-full max-h-[700px] rounded-3xl"
                            onClick={() => handleOpenDialog()}
                        />
                    )}

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
