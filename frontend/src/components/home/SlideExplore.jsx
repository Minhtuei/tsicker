import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Carousel, Typography } from "@material-tailwind/react";
// eslint-disable-next-line react/prop-types
export function SlideExplore({ onButtonClick }) {
    // const handleFadeOut = () => {
    //     setFadeOut(true);
    // };
    // const handleTransitionEnd = () => {
    //     // Reset fadeOut and move to the next slide
    //     setFadeOut(false);
    //     setActiveSlide((prev) => (prev === SLIDE_INFO.length ? 0 : prev + 1));
    // };
    const SLIDE_INFO = [
        {
            title: "Get your next",
            subtitle: "New look outfit",
            images: [
                "/slides/slide_1_1.jpg",
                "/slides/slide_1_2.jpg",
                "/slides/slide_1_3.jpg",
                "/slides/slide_1_4.jpg",
                "/slides/slide_1_5.jpg",
                "/slides/slide_1_6.jpg",
                "/slides/slide_1_7.jpg",
            ],
            color: "red-500",
        },
        {
            title: "Get your next",
            subtitle: "New cute selfie",
            images: [
                "/slides/slide_2_1.jpg",
                "/slides/slide_2_2.jpg",
                "/slides/slide_2_3.jpg",
                "/slides/slide_2_4.jpg",
                "/slides/slide_2_5.jpg",
                "/slides/slide_2_6.jpg",
                "/slides/slide_2_7.jpg",
            ],
            color: "blue-500",
        },
        {
            title: "Get your next",
            subtitle: "New couple style",
            images: [
                "/slides/slide_3_1.jpg",
                "/slides/slide_3_2.jpg",
                "/slides/slide_3_3.jpg",
                "/slides/slide_3_4.jpg",
                "/slides/slide_3_5.jpg",
                "/slides/slide_3_6.jpg",
                "/slides/slide_3_7.jpg",
            ],
            color: "green-500",
        },
    ];
    return (
        <div className="relative h-full w-full">
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
                        <div className="flex flex-col items-center justify-center gap-4 w-full">
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
                        className={`w-full h-full absolute top-0 left-0 overflow-hidden z-${
                            (SLIDE_INFO.length - index) * 10
                        }`}
                    >
                        {slide.images.map((image, index) => (
                            <div
                                key={index}
                                className={`w-[240px] h-[350px] absolute`}
                                style={
                                    index <=
                                    Math.floor(slide.images.length / 2.0)
                                        ? {
                                              bottom: `${300 - index * 100}px`, // Adjust the vertical spacing between images
                                              left: `${index * 280}px`, // Adjust the horizontal spacing between images
                                          }
                                        : {
                                              left: `${index * 280}px`, // Adjust the horizontal spacing between images
                                              bottom: `${
                                                  (index -
                                                      Math.floor(
                                                          slide.images.length /
                                                              2.0
                                                      )) *
                                                  100
                                              }px`, // Adjust the vertical spacing between images
                                          }
                                }
                            >
                                <img
                                    className="rounded-3xl w-full h-full object-cover object-center shadow-xl shadow-blue-gray-900/50"
                                    src={image}
                                    alt={`slide_${index}`}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
            <div className="absolute flex flex-col bottom-0 left-0">
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
                        className="w-12 h-12 bg-blue-600 rounded-full animate-bounce mx-auto cursor-pointer z-40"
                    >
                        <div className="flex items-center justify-center h-full ">
                            <ChevronDownIcon className="h-7 w-7 text-white" />
                        </div>
                    </div>
                </div>

                <div
                    onClick={onButtonClick}
                    className="bg-yellow-200 w-screen z-40 cursor-pointer "
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
