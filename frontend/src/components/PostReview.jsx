/* eslint-disable react/prop-types */
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { GrUpload } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";

export function PostReview({ post }) {
    const [isHover, setIsHover] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const currentRef = ref.current;
        if (currentRef) {
            const handleMouseEnter = () => {
                setIsHover(true);
            };
            const handleMouseLeave = () => {
                setIsHover(false);
            };
            currentRef.addEventListener("mouseenter", handleMouseEnter);
            currentRef.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                currentRef.removeEventListener("mouseenter", handleMouseEnter);
                currentRef.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);
    return (
        <div className="relative">
            <img
                src={post?.images}
                alt="Post"
                className="object-cover cursor-pointer rounded-3xl "
            />

            <div
                ref={ref}
                className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out bg-none rounded-3xl cursor-magnifying-glass hover:bg-black/70"
            >
                {isHover && (
                    <div className="flex flex-col items-end justify-between w-full h-full p-4">
                        <Button className="px-3 py-3 shadow-none rounded-full hover:shadow-none text-md capitalize transition-all duration-300 min-w-[50px] bg-red-500 hover:bg-red-700">
                            Save
                        </Button>
                        <div
                            className="flex w-full "
                            style={{
                                justifyContent: post?.redirectUrl
                                    ? "space-between"
                                    : "flex-end",
                                alignItems: post?.redirectUrl ? "center" : "",
                            }}
                        >
                            {post?.redirectUrl && (
                                <Button className="p-2 shadow-none rounded-full hover:shadow-none transition-all duration-300 ease-in-out max-w-[200px] max-h-[32px] bg-white hover:bg-white/90 flex items-center gap-x-1 text-[#111111] text-sm font-semibold lowercase truncate">
                                    <GoArrowUpRight className="w-3 h-3 shrink-0 " />
                                    <Typography className="flex-1 w-full text-sm font-semibold truncate">
                                        {post.redirectUrl}
                                    </Typography>
                                </Button>
                            )}
                            <div className="flex items-center p-1 gap-x-1">
                                <IconButton
                                    size="sm"
                                    className="transition-all duration-300 ease-in-out rounded-full hover:bg-white/90"
                                    color="white"
                                >
                                    <GrUpload className="w-4 h-4" />
                                </IconButton>
                                <IconButton
                                    size="sm"
                                    className="transition-all duration-300 ease-in-out rounded-full hover:bg-white/90"
                                    color="white"
                                >
                                    <FiMoreHorizontal className="w-4 h-4" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
