import { useState, useRef, useEffect } from "react";

export function PostReview({ post }) {
    const [isHover, setIsHover] = useState(false);
    const ref = useRef(null);

    return (
        <div className="relative">
            <img
                ref={ref}
                src={post?.images}
                alt="Post"
                className="rounded-3xl object-fill cursor-pointer "
            />

            <div className="absolute top-0 left-0 bg-none h-full w-full rounded-3xl cursor-pointer hover:bg-black hover:opacity-50 transition-all duration-300 ease-in-out"></div>
        </div>
    );
}
