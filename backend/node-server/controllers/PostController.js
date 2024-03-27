const prisma = require("../repositories/prisma");
const { uploadImage } = require("../utils/uploadImage");
const createPost = async (req, res) => {
    const post = req.body;
    const file = req.file;
    const imageURL = await uploadImage(file);
    try {
        const newPost = await prisma.post.create({
            data: {
                title: post.title,
                description: post.description,
                user_id: post.user_id,
                image: {
                    create: {
                        url: imageURL,
                        style: post.style || "Original",
                        price: JSON.parse(post.commercialUse) ? 10 : 0,
                    },
                },
                tag: {
                    create: post.tags
                        ? post.tags.map((tag) => ({ name: tag }))
                        : [],
                },
                commentsEnabled: JSON.parse(post.allowComment),
                link: post.link,
            },
        });
        res.status(201).json({ success: true, post: newPost });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
    }
    // try {
    //     const newPost = await prisma.post.create({
    //         data: {
    //             title: post.title,
    //             description: post.description,
    //             user_id: post.user_id,
    //             tag: post.tag,
    //             commentsEnabled: post.commentsEnabled,
    //             link: post.link,
    //             image: {
    //                 style: post.image.style,
    //                 price: post.image.price,
    //                 url: post.image.url,
    //             },
    //         },
    //     });
    //     res.status(201).json({ success: true, post: newPost });
    // } catch (error) {
    //     res.status(400).json({ success: false, error: error });
    // }
};
module.exports = {
    createPost,
};
