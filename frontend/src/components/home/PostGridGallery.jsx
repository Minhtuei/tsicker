import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";
import { usePostStore } from "../../states/post.state";
import { AppSkeleton } from "../AppSkeleton";
import { PostReview } from "../PostReview";
export function PostGridGallery() {
    const { posts, getAllPosts } = usePostStore();
    const { screenSize } = useScreenSize();
    const [numColumns, setNumColumns] = useState(
        Math.max(1, Math.min(6, screenSize + 1))
    );

    useLayoutEffect(() => {
        setNumColumns(Math.max(1, Math.min(6, screenSize + 1)));
    }, [screenSize]);
    useEffect(() => {
        getAllPosts();
    }, []);
    const chunkedPosts = useMemo(() => {
        const chunks = (arr, chunkSize) =>
            Array.from({ length: chunkSize }, (_, i) =>
                arr.filter((_, j) => j % chunkSize === i)
            );

        return chunks(posts, numColumns);
    }, [numColumns, posts]);

    return (
        <div className="flex flex-col items-center">
            {posts.length === 0 ? (
                <AppSkeleton />
            ) : (
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
                            {chunk?.map((post) => (
                                <div key={post?.id} className="px-2 pb-4 h-fit">
                                    <PostReview post={post} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
