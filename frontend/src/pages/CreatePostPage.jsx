import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { FormPost } from "../components/post/FormPost";
import { ImagePost } from "../components/post/ImagePost";
import { SidePost } from "../components/post/SidePost";
export function CreatePostPage() {
    const [openTheme, setOpenTheme] = useState(false);
    return (
        <div className="h-screen overflow-hidden">
            <NavigationBar />
            <div className="mt-[80px] h-full flex">
                <SidePost isOpen={openTheme} setOpen={setOpenTheme} />
                <div className="basis-5/6 h-full border-l border-l-gray-300 flex-1">
                    <div className="h-[80px] px-4 flex items-center justify-between border-t border-b border-t-gray-300 border-b-gray-300">
                        <Typography className="font-semibold text-lg" size="xl">
                            Create a Post
                        </Typography>
                        <Button className="px-3 py-3 shadow-none rounded-full hover:shadow-none text-md capitalize transition-all duration-300 min-w-[50px] bg-red-500 hover:bg-red-700">
                            Create Post
                        </Button>
                    </div>
                    <div className="flex-1 h-[calc(100%-80px)] relative">
                        <div className="h-full flex flex-col absolute left-1/2 -translate-x-1/2 box-border pt-4">
                            <div className="flex flex-1">
                                <div className="basis-2/5 px-4">
                                    <ImagePost />
                                </div>
                                <div className="w-full h-full flex flex-col gap-4 basis-3/5 px-4 gap-y-6">
                                    <FormPost />
                                </div>
                            </div>
                            <span className="h-[200px] shrink-0"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
