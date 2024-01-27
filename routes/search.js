const express = require("express");
const axios = require("axios");
const router = express.Router();
const instance = [
    "https://yt.artemislena.eu/api/v1/"
]
router.get("/:q/:p?", async (req, res) => {
    const keyword = req.params.q;
    const page = req.params.p || "1" //指定がない場合、1ページ目のデータを表示.
    // console.log(keyword);
    // console.log(instance[0]);
    // const getSearchResult = await axios.get(instance[0] + "search?q=" + keyword + "&page=" + page + "&region=JP");
    // const searchResult = await getSearchResult.data;
    // console.log(getSearchResult)
    const searchResult = {
        "s": null
    }
    res.render("search", {searchWord : keyword.replace(/\+/g, ' '), result : searchResult });
})

module.exports = router;
