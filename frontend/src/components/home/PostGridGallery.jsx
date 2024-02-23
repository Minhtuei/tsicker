import { PostReview } from "../PostReview";
import { useLayoutEffect, useState, useMemo } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";
import { POST_INFO } from "../../constants/postInfo";

export function PostGridGallery() {
    const { screenSize } = useScreenSize();
    const [numColumns, setNumColumns] = useState(
        Math.max(1, Math.min(6, screenSize + 1))
    );

    useLayoutEffect(() => {
        setNumColumns(Math.max(1, Math.min(6, screenSize + 1)));
    }, [screenSize]);

    const chunkedPosts = useMemo(() => {
        const chunks = (arr, chunkSize) =>
            Array.from({ length: chunkSize }, (_, i) =>
                arr.filter((_, j) => j % chunkSize === i)
            );

        return chunks(POST_INFO(), numColumns);
    }, [numColumns]);

    return (
        <div
            className={"grid gap-0.5 h-full w-full px-[60px]"}
            style={{
                gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
            }}
        >
            {chunkedPosts?.map((chunk, index) => (
                <div
                    key={index}
                    className={`flex flex-col items-center w-[${
                        100 / numColumns
                    }%]`}
                >
                    {chunk?.map((post, index) => (
                        <div key={index} className="pb-4 px-2 h-fit">
                            <PostReview post={post} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
