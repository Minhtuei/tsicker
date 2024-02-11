const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});
module.exports = prisma;
