import { Typography } from "@material-tailwind/react";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import CARTOONIFY_SLIDE_INFO from "../../constants/cartoon";
// eslint-disable-next-line react/prop-types
export function SidePost({ isOpen, setOpen }) {
    return (
        <div
            className={`h-full flex flex-col ${
                isOpen ? "basis-1/6" : "w-[80px]"
            } `}
        >
            <div className="h-[80px] px-4 flex items-center justify-between border-t border-b border-t-gray-300 border-b-gray-300 shrink-0">
                {isOpen ? (
                    <>
                        <Typography className="font-semibold text-lg" size="xl">
                            Custom Theme
                        </Typography>
                        <LuChevronsLeft
                            className="text-[#11111] size-10 hover:bg-gray-300 cursor-pointer rounded-full transition-all duration-300"
                            onClick={() => setOpen(!isOpen)}
                        />
                    </>
                ) : (
                    <LuChevronsRight
                        className="text-[#11111] size-10 hover:bg-gray-300 cursor-pointer rounded-full transition-all duration-300"
                        onClick={() => setOpen(!isOpen)}
                    />
                )}
            </div>
            {isOpen && (
                <div className="h-full flex flex-col flex-1 mt-4 gap-y-2">
                    {CARTOONIFY_SLIDE_INFO.map((slide, index) => (
                        <div
                            key={index}
                            className="h-[80px] w-full flex items-center gap-x-4 px-4 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                        >
                            <div
                                className="size-20 bg-gray-300 rounded-lg bg-cover bg-center shrink-0"
                                style={{
                                    backgroundImage: `url(${slide.url})`,
                                }}
                            ></div>
                            <Typography
                                className="font-semibold text-lg flex-1 "
                                size="xl"
                            >
                                {slide.name}
                            </Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
