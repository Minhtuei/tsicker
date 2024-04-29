const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 6666;
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
// const userRouter = require("./routes/user");
const pgClient = require("./database/pgClient");
const firebaseClient = require("./database/firebaseClient");

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
// app.use("/api/v1/user", userRouter);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
