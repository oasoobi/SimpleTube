
const axios = require("axios");
const express = require("express");
const iconv = require('iconv-lite');
const router = express.Router();

router.get("/suggest", async (req, res) => {
  const query = req.query.q;
  try {
    const result = await axios("https://www.google.com/complete/search?client=youtube&hl=ja&ds=yt&q=" + query, { responseType: 'arraybuffer' });
    const data = await result.data;

    const decodedString = JSON.parse(iconv.decode(data, 'Shift_JIS').replace('window.google.ac.h(', "").replace(")", ""));
    let responsedata = [];
    for (let i = 0; i < decodedString[1].length; i++) {
      responsedata.push(decodedString[1][i][0])
    }
    res.json(responsedata);
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
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error('Error fetching and sending image:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.get("/videos/:id/comments", async (req, res) => {
  try {
    const vid = req.params.id;
    const apiUrl = `https://yt.artemislena.eu/api/v1/comments/${vid}`;
    const response = await axios.get(apiUrl);
    const data = await response.data;
    res.json(data);
  } catch (error) {
    console.error("Error: ", error); 7
    res.status(500).send("Internal Server Error");
  }

})

router.get("/videos/:id/comments/:continuation", async (req, res) => {
  try {
    const vid = req.params.id;
    const continuation = req.params.continuation;
    const apiUrl = `https://yt.artemislena.eu/api/v1/comments/${vid}?hl=ja&thin_mode=false&continuation=${continuation}&action=action_get_comment_replies`;
    console.log(apiUrl)
    const response = await axios.get(apiUrl);
    const data = await response.data;
    res.json(data);
  } catch (error) {
    console.error("Error: ", error); 7
    res.status(500).send("Internal Server Error");
  }
})

router.get("/videos/:id", async (req, res) => {
  try {
    const vid = req.params.id;
    const apiUrl = `https://yt.artemislena.eu/api/v1/videos/${vid}`;
    const response = await axios.get(apiUrl);
    const data = await response.data;
    res.json(data);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;