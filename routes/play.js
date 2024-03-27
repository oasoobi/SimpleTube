const express = require("express");
const axios = require("axios");
const router = express.Router();
const instance = [
    "https://invidious.fdn.fr/api/v1/"
]
router.get("/:vid", async (req, res) => {
    const vid = req.params.vid;
    res.render("watch", {videoId : `${vid}`});
})

module.exports = router;