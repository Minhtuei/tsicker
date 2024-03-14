import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Carousel, Typography } from "@material-tailwind/react";
import SLIDE_INFO from "../../constants/slideInfo";
// eslint-disable-next-line react/prop-types
export function SlideExplore({ onButtonClick }) {
    return (
        <div className="relative h-full w-full px-[80px]">
            <Carousel
                transition={{ type: "fade", duration: 1 }}
                loop={true}
                autoplayDelay={5000}
                autoplay={true}
                className="rounded-xl"
                prevArrow={() => <div></div>}
                nextArrow={() => <div></div>}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute left-0 top-0 z-40 flex justify-center items-center gap-2 w-full h-[80%]">
                        {" "}
                        <div className="flex flex-col items-center justify-center w-full gap-4">
                            <Typography
                                variant="h1"
                                className=" text-black text-[60px] font-bold "
                            >
                                {SLIDE_INFO[activeIndex].title}
                            </Typography>
                            <Typography
                                variant="h1"
                                className={
                                    "text-[60px] font-bold text-" +
                                    SLIDE_INFO[activeIndex].color
                                }
                            >
                                {SLIDE_INFO[activeIndex].subtitle}
                            </Typography>
                            <div className="flex gap-2">
                                {new Array(length).fill("").map((_, i) => (
                                    <span
                                        key={i}
                                        className={`block h-4 w-4 cursor-pointer rounded-full transition-all content-[''] ${
                                            activeIndex === i
                                                ? `bg-${SLIDE_INFO[i].color}`
                                                : " bg-black"
                                        }`}
                                        onClick={() => {
                                            setActiveIndex(i);
                                            // handleFadeOut();
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            >
                {SLIDE_INFO.map((slide, index) => (
                    <div
                        key={index}
                        className={`relative w-full h-full overflow-hidden z-${
                            (SLIDE_INFO.length - index) * 10
                        }`}
                    >
                        {slide.images.map((image, imgIndex) => (
                            <div
                                key={imgIndex}
                                className={`w-[240px] h-[350px] absolute`}
                                style={{
                                    // Center the V formation
                                    bottom: `${
                                        Math.abs(
                                            imgIndex -
                                                Math.floor(
                                                    slide.images.length / 2.0
                                                )
                                        ) * (imgIndex % 2 === 0 ? 100 : 80)
                                    }px`, // Adjusted calculation
                                    left: `50%`, // Center the images horizontally
                                    transform: `translateX(-50%) translateX(${
                                        (imgIndex -
                                            Math.floor(
                                                slide.images.length / 2.0
                                            )) *
                                        250
                                    }px)`,
                                }}
                            >
                                <img
                                    className="object-cover object-center w-full h-full shadow-xl rounded-3xl shadow-blue-gray-900/50"
                                    src={image}
                                    alt={`slide_${imgIndex}`}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
            <div className="absolute bottom-0 left-0 flex flex-col">
                <div
                    className="w-screen z-30 h-[200px] flex flex-col-reverse"
                    style={{
                        background:
                            "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 70%)",
                    }}
                >
                    {" "}
                    <div
                        onClick={onButtonClick}
                        className="z-40 w-12 h-12 mx-auto bg-blue-600 rounded-full cursor-pointer animate-bounce"
                    >
                        <div className="flex items-center justify-center h-full ">
                            <ChevronDownIcon className="text-white h-7 w-7" />
                        </div>
                    </div>
                </div>

                <div
                    onClick={onButtonClick}
                    className="z-40 w-screen bg-yellow-200 cursor-pointer "
                >
                    <div className="flex items-center justify-center py-5 font-semibold text-md text-[#111111]">
                        <div className="flex items-center">
                            There's more interesting content here
                            <ChevronDownIcon className="h-7 w-7 text-[#111111]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
