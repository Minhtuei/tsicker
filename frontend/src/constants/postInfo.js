export const POST_INFO = () => {
    let postInfo = [];
    const names = ["", "john", "emma", "alex"];
    const domains = ["example", "test", "website"];
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 7; j++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomDomain =
                domains[Math.floor(Math.random() * domains.length)];
            postInfo.push({
                title: "Post " + i + "_" + j,
                images: `/slides/slide_${i}_${j}.jpg`,
                redirectUrl: `${randomName}${
                    randomName ? "." + randomDomain : ""
                }`,
            });
        }
    }
    postInfo.push(...postInfo);
    postInfo.push(...postInfo);

    return postInfo;
};
