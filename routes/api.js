const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/suggest", async (req, res) => {
    const query = req.query.q;
    try {
        const result = await axios("https://yukimath.onrender.com/suggest?keyword=" + query);
        const data = await result.data;
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
