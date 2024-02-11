const jwt = require("jsonwebtoken");
const verifyAccessToken = async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res
                    .status(401)
                    .json({ success: false, error: "Invalid token" });
            }
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({ success: false, error: "Require token" });
    }
};

module.exports = {
    verifyAccessToken,
};
