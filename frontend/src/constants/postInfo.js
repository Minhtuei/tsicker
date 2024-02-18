export const POST_INFO = () => {
    let postInfo = [];
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 7; j++) {
            postInfo.push({
                title: "Post " + i + "_" + j,
                images: `/slides/slide_${i}_${j}.jpg`,
            });
        }
    }
    postInfo.push(...postInfo);
    postInfo.push(...postInfo);
    return postInfo;
};
