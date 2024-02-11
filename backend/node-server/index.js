const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 6666;
const PYTHON_SERVER = process.env.PYTHON_SERVER;
const axios = require("axios");
const config = require("./config");
const fs = require("fs");
const pg = require("pg");
const url = require("url");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
const client = new pg.Client(config);
client.connect(function (err) {
    if (err) throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err) throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err) throw err;
        });
    });
});
