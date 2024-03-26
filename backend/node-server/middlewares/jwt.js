const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
const generateRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "14d" });
module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
