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
};
const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                date_created: true,
                user_id: true,
                image: {
                    select: {
                        url: true,
                    },
                },
                tag: {
                    select: {
                        name: true,
                    },
                },
                commentsEnabled: true,
                link: true,
            },
            orderBy: {
                date_created: "desc",
            },
        });

        res.status(200).json({ success: true, posts: posts });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
    }
};
const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
                image: {
                    select: {
                        url: true,
                    },
                },
                tag: {
                    select: {
                        name: true,
                    },
                },
                comment: {
                    select: {
                        id: true,
                        content: true,
                        date_created: true,
                        user_id: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true,
                            },
                        },
                    },
                    orderBy: {
                        date_created: "desc",
                    },
                },
            },
        });
        const totalSubscriber = await prisma.subscribe.count({
            where: {
                subscribed_id: post.user.id,
            },
        });
        post.user.totalSubscriber = totalSubscriber;
        res.status(200).json({ success: true, post: post });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPost,
};
