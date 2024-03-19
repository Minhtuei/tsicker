import { Typography, Slider, Button } from "@material-tailwind/react";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import CARTOONIFY_SLIDE_INFO from "../../constants/cartoon";
import SKETCH_SLIDE_INFO from "../../constants/sketch";
import { useEffect, useState } from "react";
import { useImageUploadStore } from "../../states/imageUploadInfo";
import { postService } from "../../services/postService";
// eslint-disable-next-line react/prop-types
export function SidePost({ isOpen, setOpen }) {
    const [blurValue, setBlurValue] = useState(3);
    const [sharpnessValue, setSharpnessValue] = useState(10);
    const [openSketch, setOpenSketch] = useState(false);
    const [cache, setCache] = useState({});
    const { imageInfo, setImageInfo, setIsLoading } = useImageUploadStore();
    const [theme, setTheme] = useState("");
    const [sketch, setSketch] = useState(false);
    useEffect(() => {
        setCache({});
        setTheme("");
        setBlurValue(3);
        setSharpnessValue(10);
    }, [imageInfo.url]);
    useEffect(() => {
        console.log(imageInfo);
    }, [imageInfo]);

    useEffect(() => {
        const handleChooseEffect = async () => {
            if (imageInfo.url) {
                try {
                    const updatedImageInfo = {
                        ...imageInfo,
                        theme: theme,
                        sketch:
                            theme === "Sketch"
                                ? { blur: blurValue, sharpness: sharpnessValue }
                                : imageInfo.sketch,
                    };

                    if (!cache[theme]) {
                        setIsLoading(true);
                        const response = await postService.cartoonify(
                            updatedImageInfo
                        );
                        setIsLoading(false);
                        if (response.success) {
                            setCache((prev) =>
                                theme === "Sketch"
                                    ? {
                                          ...prev,
                                          [theme
                                              .concat(blurValue)
                                              .concat(sharpnessValue)]:
                                              response.imageURL,
                                      }
                                    : { ...prev, [theme]: response.imageURL }
                            );
                            setImageInfo({ cartoonURL: response.imageURL });
                        } else {
                            console.log(response.error);
                        }
                    } else {
                        setImageInfo({ cartoonURL: cache[theme] });
                    }
                    setImageInfo({ theme: theme });
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Please upload an image");
            }
        };
        handleChooseEffect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, sketch]);

    return (
        <div
            className={`max-h-[calc(100vh-100px)] flex flex-col overflow-y-auto ${
                isOpen ? "basis-1/6" : "w-[80px]"
            } `}
        >
            <div className="h-[80px] px-4 flex items-center justify-between border-t border-b border-t-gray-300 border-b-gray-300 shrink-0">
                {isOpen ? (
                    <>
                        <Typography className="text-lg font-semibold" size="xl">
                            Custom Effect
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
                <div className="flex flex-col flex-1 h-full mt-4 overflow-y-auto select-none gap-y-2 scrollbar-hide">
                    <div
                        onClick={() => setOpenSketch((prev) => !prev)}
                        className="h-[80px] w-full flex items-center gap-x-4 px-4 hover:bg-gray-100 cursor-pointer transition-all duration-200 "
                    >
                        <div className="bg-gray-300 rounded-lg size-20 shrink-0">
                            {" "}
                            <img
                                className="object-cover w-full h-full rounded-lg"
                                src={SKETCH_SLIDE_INFO[1].url}
                            />
                        </div>
                        <Typography
                            className="flex-1 text-lg font-semibold "
                            size="xl"
                        >
                            Sketch
                        </Typography>
                    </div>
                    {openSketch && (
                        <div className="flex flex-col w-full p-2 px-4 gap-y-2 ">
                            <Typography
                                className="text-lg font-semibold "
                                size="xl"
                            >
                                Blur : {blurValue}
                            </Typography>
                            <Slider
                                min={0}
                                max={100}
                                step={1}
                                value={blurValue}
                                onChange={(e) =>
                                    setBlurValue(parseInt(e.target.value))
                                }
                                className="w-full"
                            />
                            <Typography
                                className="text-lg font-semibold "
                                size="xl"
                            >
                                Sharpness : {sharpnessValue}
                            </Typography>
                            <Slider
                                min={0}
                                max={100}
                                step={1}
                                value={sharpnessValue}
                                onChange={(e) =>
                                    setSharpnessValue(parseInt(e.target.value))
                                }
                                className="w-full"
                            />
                            <div className="flex flex-row-reverse">
                                <Button
                                    onClick={() => {
                                        setTheme("Sketch");
                                        setSketch((prev) => !prev);
                                    }}
                                    className="button button--secondary !bg-black !text-white hover:!opacity-80 !py-2"
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    )}
                    {CARTOONIFY_SLIDE_INFO.map((slide, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setTheme(slide.name);
                                setSketch((prev) => !prev);
                            }}
                            className="h-[80px] w-full flex items-center gap-x-4 px-4 hover:bg-gray-100 cursor-pointer transition-all duration-200 "
                        >
                            <div
                                className="bg-gray-300 bg-center bg-cover rounded-lg size-20 shrink-0"
                                style={{
                                    backgroundImage: `url(${slide.url})`,
                                }}
                            ></div>
                            <Typography
                                className="flex-1 text-lg font-semibold "
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
