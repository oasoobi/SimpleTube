const express = require('express');
const path = require("path");
const apiRouter = require("./routes/api")
const app = express();
const port = 3000;


app.use(express.json());

app.use("/api", apiRouter);
app.use((req, res) => {
    if (req.url === "/") {
        return res.sendFile(path.join(__dirname, "static/pages", "top.html"));
    }

    if (req.url.startsWith("/watch/")) {
        return res.sendFile(path.join(__dirname, "static/pages", "watch.html"));
    }

    if (req.url.startsWith("/channel/")) {
        return res.sendFile(path.join(__dirname, "static/pages", "channel.html"));
    }
    
    if (req.url.startsWith("/search/")) {
        return res.sendFile(path.join(__dirname, "static/pages", "search.html"));
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

    res.sendFile(path.join(__dirname, "static/pages/error", "404.html"));
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "static/pages/error", "404.html"));
});
 
app.use((req, res, err) => {
    res.sendFile(path.join(__dirname, "static/pages/error", "500.html"));
    console.log(err);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


