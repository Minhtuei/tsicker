const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
const generateRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
