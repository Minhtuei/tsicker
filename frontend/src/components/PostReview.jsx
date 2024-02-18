export function PostReview({ post }) {
    return (
        <img
            src={post?.images}
            alt="Post"
            className="rounded-3xl object-fill cursor-pointer"
        />
    );
}
