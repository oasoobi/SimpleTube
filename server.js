const express = require('express');
const path = require("path");
const apiRouter = require("./routes/api");
const searchRouter = require("./routes/search");
const app = express();
const port = 3000;
app.use(express.json());
app.set("view engine", "ejs");



app.use((req, res, next) => {
    if (req.url === "/") {
        return res.sendFile(path.join(__dirname, "static/pages", "top.html"));
    }

    if (req.url.startsWith("/watch/")) {
        return res.sendFile(path.join(__dirname, "static/pages", "watch.html"));
    }

    if (req.url.startsWith("/channel/")) {
        return res.sendFile(path.join(__dirname, "static/pages", "channel.html"));
    }

    if (req.url.startsWith("/playlist/")) {
        return res.sendFile(path.join(__dirname, "static/pages", "playlist.html"));
    }

    if (req.url === "/setting") {
        return res.sendFile(path.join(__dirname, "static/pages", "setting.html"));
    }

    if (req.url.startsWith("/icons/")) {
        const filename = req.url.split("/")[2] + ".svg"; // icons/[file]から[file]を取得
        console.log(filename);
        return res.sendFile(path.join(__dirname, "static/icons", filename));
    }
    next(); // 次のミドルウェアに処理を渡す

    // res.sendFile(path.join(__dirname, "static/pages/error", "404.html"));
});

app.use("/api", apiRouter); //ルートの読み込み
app.use("/search", searchRouter);

app.use((req, res, err) => {
    res.sendFile(path.join(__dirname, "static/pages/error", "404.html"));
    console.log(err);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});