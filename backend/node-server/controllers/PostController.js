const prisma = require("../repositories/prisma");

const createPost = async (req, res) => {
    const post = req.body;
    try {
        const newPost = await prisma.post.create({
            data: {
                title: post.title,
                description: post.description,
                user_id: post.user_id,
                tag: post.tag,
                commentsEnabled: post.commentsEnabled,
                link: post.link,
                image: {
                    style: post.image.style,
                    price: post.image.price,
                    url: post.image.url,
                },
            },
        });
        res.status(201).json({ success: true, post: newPost });
    } catch (error) {
        res.status(400).json({ success: false, error: error });
    }
};
module.exports = {
    createPost,
};
