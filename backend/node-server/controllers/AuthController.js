const prisma = require("../repositories/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../middlewares/jwt");
const select_user_info = {
    id: true,
    username: true,
    password: true,
    email: true,
    date_created: true,
    total_sub: true,
};

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, error: "Invalid input" });
    }
    try {
        const user =
            (await prisma.user.findFirst({
                select: select_user_info,
                where: {
                    username: username,
                },
            })) ||
            (await prisma.user.findFirst({
                select: select_user_info,
                where: {
                    email: username,
                },
            }));
        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Wrong Username or Email",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: "Wrong Password",
            });
        }
        result_user = {
            id: user.id,
            username: user.username,
            email: user.email,
            date_created: user.date_created,
            total_sub: user.total_sub,
        };
        const accessToken = generateAccessToken({
            id: result_user.id,
            username: result_user.username,
        });
        const refreshToken = generateRefreshToken({ id: result_user.id });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        await prisma.user.update({
            where: { id: result_user.id },
            data: { refresh_token: refreshToken },
        });
        return res.json({ success: true, accessToken, user: result_user });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
};
const register = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ success: false, error: "Invalid input" });
    }
    try {
        // Check if username already exists
        const existingUsername = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        if (existingUsername) {
            return res
                .status(400)
                .json({ success: false, error: "Username already exists" });
        }
        // Check if email already exists
        const existingEmail = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (existingEmail) {
            return res
                .status(400)
                .json({ success: false, error: "Email already exists" });
        }
        // If neither username nor email exists, proceed with user creation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            select: { ...select_user_info, password: false },
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        return res.json({ success: true, data: newUser });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};
const verify = async (req, res) => {
    const { id } = req.user;
    res.json({ success: true, id });
};
const refreshToken = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) {
        return res
            .status(400)
            .json({ success: false, error: "No refresh token" });
    }
    try {
        const verified = jwt.verify(
            cookie.refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const response = await prisma.user.findFirst({
            select: { id: true, username: true },
            where: { id: verified.id, refresh_token: cookie.refreshToken },
        });
        if (!response) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid refresh token" });
        }
        const accessToken = generateAccessToken({
            id: response.id,
            username: response.username,
        });
        return res.json({ success: true, accessToken });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};
const logout = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) {
        return res
            .status(400)
            .json({ success: false, error: "No refresh token" });
    }
    try {
        await prisma.user.update({
            where: { refresh_token: cookie.refreshToken },
            data: { refresh_token: null },
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.json({ success: true, message: "Logged out" });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};

module.exports = {
    login,
    register,
    verify,
    refreshToken,
    logout,
};
