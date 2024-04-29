const prisma = require("../repositories/prisma");
const getPostUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                username: true,
                avatar: true,
            },
        });
        const subscribers = await prisma.subscribe.count({
            where: {
                subscribed_id: id,
            },
        });
        const returnUser = {
            username: user.username,
            avatar: user.avatar,
            subscribers: subscribers,
        };

        res.status(200).json({ success: true, user: returnUser });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
module.exports = {
    getPostUser,
};
