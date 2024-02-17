export function PostReview() {
    const randomHeight = Math.floor(Math.random() * (500 - 250 + 1)) + 250;

    return (
        <div
            className={`rounded-3xl bg-red-100 w-[250px] h-[${randomHeight}px]`}
        ></div>
    );
}
