const express = require("express");
const axios = require("axios");
const router = express.Router();
const instance = [
    "https://yt.artemislena.eu/api/v1/"
]
router.get("/:q/:p?", async (req, res) => {
    const keyword = req.params.q;
    const page = req.params.p || "1" //指定がない場合、1ページ目のデータを表示. 
    res.render("search", {searchWord : keyword.replace(/\+/g, ' '), apiUrl : `/api/search/${keyword}`, page : page});
})

module.exports = router;
