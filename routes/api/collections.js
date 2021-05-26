const express = require('express');
const jwt = require("jsonwebtoken");
const Collection = require("../../models/Collection");
const Article = require("../../models/Article");
const router = express.Router();
const secret = `simplaysecret`;

router.get(`/`, async (req, res) => {
  try {
    let userName;
    let collections;
    let articleQueries;
    let articles;
    const token = req.cookies.token;
    const payload = jwt.verify(token, secret);
    if (!payload) {
      res.status(400).json({message: 'Dined'});
      return;
    }
    userName = payload.username;
    collections = await Collection.find({userName});
    articleQueries = collections.map(item => {
      return Article.findById(item.articleID); 
    });
    articles = await Promise.all(articleQueries);
    articles.forEach(article => article.collected = true);
    res.status(200).json({data: articles});
  } catch(err) {
    res.status(400).json({message: err.message});
  }
});

router.post(`/un-collect/:articleID`, async (req, res) => {
  try {
    let userName;
    const token = req.cookies.token;
    const payload = jwt.verify(token, secret);
    const articleID = req.params.articleID;
    if (payload) {
      userName = payload.username;
      await Collection.deleteOne({userName, articleID});
      res.status(200).json({message: 'Cancel collect successfully'});
    } else {
      res.status(400).json({message: 'Denied'});
    }
  } catch(err) {
    res.status(400).json({message: err.message});
  }
});

router.post('/collect/:articleID', async (req, res) => {
  try {
    let userName;
    let newCollection;
    const token = req.cookies.token;
    const payload = jwt.verify(token, secret);
    const articleID = req.params.articleID;
    if (payload) {
      userName = payload.username;
      newCollection = new Collection({userName, articleID});
      await newCollection.save();
      res.status(200).json({message: 'Collect successfully'});
    } else {
      res.status(400).json({message: 'Denied'});
    }
  } catch(err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;