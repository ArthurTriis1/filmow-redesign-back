
const express = require("express");
const serverless = require('serverless-http');
const Parser = require('rss-parser');
const cors = require('cors');

const app = express();

const router = express.Router();

const parser = new Parser();

const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

router.get("/news", async (req, res) => {
    const { items } = await parser.parseURL('https://filmow.com/noticias/rss/');
    const newsFormated = items.map(news => {
      return {
        title: news.title,
        imageURL: news.enclosure.url,
        description: news.content,
        link: news.link
      }
    })
    res.json(newsFormated)  
})

app.use('/.netlify/functions/api', router )

module.exports.handler = serverless(app)

