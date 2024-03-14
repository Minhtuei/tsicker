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
                <div className="flex-1 h-full border-l basis-5/6 border-l-gray-300">
                    <div className="h-[80px] px-4 flex items-center justify-between border-t border-b border-t-gray-300 border-b-gray-300">
                        <Typography className="text-lg font-semibold" size="xl">
                            Create a Post
                        </Typography>
                        <Button className="px-3 py-3 shadow-none rounded-full hover:shadow-none text-md capitalize transition-all duration-300 min-w-[50px] bg-red-500 hover:bg-red-700">
                            Create Post
                        </Button>
                    </div>
                    <div className="flex-1 h-[calc(100vh-80px)] flex items-center justify-center">
                        <div className="box-border flex flex-col h-full pt-4">
                            <div className="flex flex-1">
                                <div className="px-4 basis-2/5">
                                    <ImagePost />
                                </div>
                                <div className="flex flex-col w-full h-full gap-4 px-4 basis-3/5 gap-y-6">
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
