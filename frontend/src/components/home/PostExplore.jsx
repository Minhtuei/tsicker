import { Button, Typography } from "@material-tailwind/react";
import post_introduce from "../../assets/post_introduce.png";
export function PostExplore() {
    return (
        <>
            <div className="flex items-center justify-around w-full h-full">
                <div className="flex flex-col items-center justify-center w-3/5 h-full bg-purple-50">
                    <img
                        className="rounded-3xl border-8 border-black w-[600px] h-[400px] object-cover object-center shadow-xl shadow-blue-gray-900/50"
                        src={post_introduce}
                        alt="post_introduce"
                    />
                </div>
                <div className="flex items-center justify-center w-2/5 h-full bg-pink-50">
                    <div className="flex flex-col items-center justify-center gap-4 text-center h-1/2">
                        <Typography
                            variant="h1"
                            className="text-[40px] font-bold text-black max-w-[500px]"
                        >
                            Post your ideas and get feedback from the community.
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
