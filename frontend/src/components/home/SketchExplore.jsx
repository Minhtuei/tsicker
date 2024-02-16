import sketch_info_1 from "../../assets/sketch_info_1.jpg";
import sketch_info_2 from "../../assets/sketch_info_2.jpg";
import sketch_info_3 from "../../assets/sketch_info_3.jpg";
import sketch_info_4 from "../../assets/sketch_info_4.jpg";

import { Typography, Button } from "@material-tailwind/react";

export function SketchExplore() {
    return (
        <>
            <div className="flex items-center justify-around w-full h-full bg-gray-100">
                <div className="w-1/2 flex items-center justify-center ">
                    <div className="relative cursor-pointer">
                        <img
                            className="w-[300px] h-[455px] rounded-3xl object-cover object-center shadow-xl shadow-blue-gray-900/50 relative border-4 border-black z-30"
                            src={sketch_info_1}
                        />
                        <img
                            className="w-[200px] h-[250px] rounded-3xl object-cover object-center shadow-xl shadow-blue-gray-900/50 absolute top-5 -left-20 border-4	border-black z-40"
                            src={sketch_info_2}
                        />
                        <img
                            className="w-[200px] h-[250px] rounded-3xl object-cover object-center shadow-xl shadow-blue-gray-900/50 absolute top-2 -right-[120px] z-20 border-4 border-black"
                            src={sketch_info_3}
                        />
                        <img
                            className="w-[200px] h-[250px] rounded-3xl object-cover object-center shadow-xl shadow-blue-gray-900/50 absolute -bottom-[100px] -right-[100px] z-40 border-4 border-black"
                            src={sketch_info_4}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center w-1/2 h-full">
                    <div className="flex flex-col items-center justify-center  gap-4 text-center h-1/2">
                        <Typography
                            variant="h1"
                            className="text-[60px] font-bold text-gray-700"
                        >
                            Sketch your image
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xl text-gray-500 break-words max-w-[400px]"
                        >
                            Transform your online experience with our exciting
                            new sketch feature. Express ideas, annotate content,
                            and collaborate in real-time with our intuitive
                            drawing tools. Elevate your interaction, boost
                            engagement, and make your mark on the digital
                            canvas. Try it now and bring your creativity to
                            life!
                        </Typography>
                        <Button
                            className={
                                "px-3 py-2 shadow-none rounded-full hover:shadow-none text-lg capitalize transition-all duration-300 bg-[#E60023] hover:bg-red-800  hover:text-gray-200 text-white"
                            }
                        >
                            Explore
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
