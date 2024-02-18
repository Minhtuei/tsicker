import { PostReview } from "../PostReview";
import { useEffect, useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";
export function PostGridGallery() {
    const [numColumns, setNumColumns] = useState(7);
    const POST_INFO = [];
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 7; j++) {
            POST_INFO.push({
                title: "Post " + i + "_" + j,
                images: `/slides/slide_${i}_${j}.jpg`,
            });
        }
    }
    POST_INFO.push(...POST_INFO);
    POST_INFO.push(...POST_INFO);
    const chunks = (arr, chunkSize) => {
        const chunks = Array.from({ length: chunkSize }, () => []);
        for (let i = 0; i < arr.length; i++) {
            const columnIndex = i % chunkSize;
            chunks[columnIndex]?.push(arr[i]);
        }
        return chunks;
    };
    const { screenSize } = useScreenSize();
    useEffect(() => {
        if (screenSize === 0) {
            setNumColumns(2);
        } else if (screenSize === 1) {
            setNumColumns(3);
        } else if (screenSize === 2) {
            setNumColumns(4);
        } else if (screenSize === 3) {
            setNumColumns(5);
        } else if (screenSize === 4) {
            setNumColumns(6);
        } else if (screenSize === 5) {
            setNumColumns(7);
        }
        console.log("Screen size: ", screenSize);
    }, [screenSize]);
    const chunkedPosts = chunks(POST_INFO, numColumns);
    return (
        <div
            className={`grid grid-cols-${numColumns} gap-0.5 h-full w-full px-[60px]`}
        >
            {chunkedPosts.map((chunk, index) => (
                <div key={index} className="flex flex-col w-fit">
                    {chunk.map((post, index) => (
                        <div
                            key={index}
                            className={`w-[${
                                (1 / chunkedPosts.length) * 100
                            }%] pb-4 px-2`}
                        >
                            <PostReview post={post} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
