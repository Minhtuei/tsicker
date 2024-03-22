import { Button, Typography, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { FormPost } from "../components/post/FormPost";
import { ImagePost } from "../components/post/ImagePost";
import { SidePost } from "../components/post/SidePost";
import { useImageUploadStore } from "../states/imageUploadInfo";
import { useForm } from "react-hook-form"; // Import useForm and FormProvider
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert } from "@material-tailwind/react";
export function CreatePostPage() {
    const [openTheme, setOpenTheme] = useState(false);
    const [hasImage, setHasImage] = useState(true);
    const { isLoading } = useImageUploadStore();
    const schema = yup.object().shape({
        title: yup.string().required("Title is required").max(50),
        description: yup.string().optional().max(255),
        link: yup.string().url("Link is not valid").optional(),
        tags: yup.string().optional(),
        collection: yup.string(),
        allowComment: yup.boolean().required(),
        commercialUse: yup.boolean().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { imageInfo, size } = useImageUploadStore();
    const onSubmit = (data) => {
        const url = imageInfo.cartoonURL || imageInfo.url;
        if (!url) {
            setHasImage(false);
            return;
        }
        data = {
            ...data,
            image: { url, size },
        };

        console.log(data);
    };

    return (
        <div className="h-screen overflow-hidden">
            <NavigationBar />
            <div className="mt-[80px] h-full flex">
                <SidePost
                    isOpen={openTheme}
                    setOpen={setOpenTheme}
                    setHasImage={setHasImage}
                />
                <form
                    className="flex-1 h-full border-l basis-5/6 border-l-gray-300"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="relative h-[80px] px-4 flex items-center justify-between border-t border-b border-t-gray-300 border-b-gray-300">
                        <Typography className="text-lg font-semibold" size="xl">
                            Create a Post
                        </Typography>
                        <Button
                            type="submit"
                            className="px-3 py-3 shadow-none rounded-full hover:shadow-none text-md capitalize transition-all duration-300 min-w-[50px] bg-red-500 hover:bg-red-700"
                        >
                            Create Post
                        </Button>
                        {!hasImage && (
                            <Alert
                                open={!hasImage}
                                onClose={() => setHasImage(true)}
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 100 },
                                }}
                                className="absolute right-0 w-1/2 text-white bg-red-500 top-2"
                            >
                                Please upload an image first
                            </Alert>
                        )}
                    </div>
                    <div className="flex-1 h-[calc(100vh-80px)] flex items-center justify-center">
                        <div className="box-border flex flex-col h-full pt-4">
                            <div className="flex flex-1">
                                <div className="px-4 basis-2/5">
                                    <ImagePost
                                        register={register}
                                        errors={errors}
                                    />
                                </div>
                                <div className="flex flex-col w-full h-full gap-4 px-4 basis-3/5 gap-y-6">
                                    <FormPost
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                            </div>
                            <div className="h-[200px] shrink-0"></div>
                        </div>
                    </div>
                </form>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="flex items-center p-4 bg-white rounded-lg">
                            <Typography
                                className="mr-2 text-lg italic font-semibold"
                                size="xl"
                            >
                                Generating Image
                            </Typography>
                            <Spinner className="w-8 h-8" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
