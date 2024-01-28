const express = require("express");
const axios = require("axios");
const router = express.Router();
const instance = [
    "https://yt.artemislena.eu/api/v1/"
]
router.get("/:vid", async (req, res) => {
    const vid = req.params.vid;
    res.render("watch", {apiUrl : `/api/videos/${vid}`});
})

module.exports = router;