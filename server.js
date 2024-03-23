const express = require('express');
const path = require("path");
const apiRouter = require("./routes/api");
const searchRouter = require("./routes/search");
const watchRouter = require("./routes/play");
const config = require("./config");
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;
app.use(express.json());
app.set("view engine", "ejs");
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(req.path);
    if (req.path.startsWith("/api/auth")) {
        next();
    } else {
        try {
            if (config.auth.enabled) {
                const authCode = req.cookies.authcode;
                if (!authCode) return res.status(401).sendFile(path.join(__dirname, "static/pages/error", "401.html"));
                if (authCode === config.auth.auth_code) {
                    next();
                } else {
                    res.status(401).sendFile(path.join(__dirname, "static/pages/error", "401.html"));
                }
            } else {
                next();
            }
        } catch (error) {
            console.log(error);
        }
    }


});

app.use("/api", apiRouter); //ルートの読み込み


app.use((req, res, next) => {
    if (req.url === "/") {
        return res.sendFile(path.join(__dirname, "static/pages", "top.html"));
    }

    if (req.url.startsWith("/channel/")) {
        return res.sendFile(path.join(__dirname, "static/pages", "channel.html"));
    }

    if (req.url === "/setting") {
        return res.sendFile(path.join(__dirname, "static/pages", "setting.html"));
    }

    if (req.url.startsWith("/icons/")) {
        const filename = req.url.split("/")[2] + ".svg"; // icons/[file]から[file]を取得
        return res.sendFile(path.join(__dirname, "static/icons", filename));
    }

    if (req.url.startsWith("/styles/")) {
        const filename = req.url.split("/")[2] + ".css"; // styles/[file]から[file]を取得
        return res.sendFile(path.join(__dirname, "static/styles", filename));
    }
    next(); // 次のミドルウェアに処理を渡す

});

app.use("/search", searchRouter);
app.use("/watch", watchRouter);

app.use((req, res, err) => {
    res.sendFile(path.join(__dirname, "static/pages/error", "404.html"));
    console.log(err);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    if (config.auth.enabled) {
        console.log(`アクセスする前に認証が必要です。http://localhost:${port}/api/auth?c=${config.auth.auth_code}`);
    }

});