
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
router.get("/search/:q/:page?", async (req, res) => {
    const apiUrl = `https://yt.artemislena.eu/api/v1/search?q=${req.params.q}&page=${req.params.page || "1"}&region=JP`;
    const response = await axios.get(apiUrl);
    const data = await response.data;
    res.json(data);
})

router.get('/image', async (req, res) => {
    try {
      const vid = req.query.id;
      const apiUrl = `https://yt.artemislena.eu/vi/${vid}/mqdefault.jpg`;
      console.log(apiUrl);
      
      // Fetch the image data
      const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
  
      // Set the Content-Type to image/jpeg
      res.setHeader('Content-Type', 'image/jpeg');
  
      // Send the image data as the response
      res.send(Buffer.from(response.data));
    } catch (error) {
      console.error('Error fetching and sending image:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = router;
