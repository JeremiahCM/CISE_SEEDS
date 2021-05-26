// routes/api/articles.js

const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const secret = `simplaysecret`;

// Load Article model
const Article = require('../../models/Article');
const Collection = require("../../models/Collection");

const addCollectStatusToArticles = async (req, articles) => {
  let queries;
  let userName;
  let queryResult;
  const token = req.cookies.token;
  if (!token) return articles;
  const payload = jwt.verify(token, secret);
  if (!payload) {
    return articles;
  }
  userName = payload.username;
  queries = articles.map(item => {
    return Collection.findOne({articleID: item._id, userName});
  });
  queryResult = await Promise.all(queries);
  articles.forEach((article, index) => {
    article.collected = Boolean(queryResult[index]);
  });
 
  return articles;
};

// @route GET api/articles/test
// @description tests articles route
// @access Public
router.get('/test', (req, res) => res.send('article route testing!'));

// @route GET api/articles
// @description Get all articles
// @access Public
router.get('/', (req, res) => {
  Article.find()
    .then(async articles => res.json(await addCollectStatusToArticles(req, articles)))
    .catch(err => {
      console.log(err)
      res.status(404).json({ noarticlesfound: 'No Articles found' })
    });
});

// @route GET api/articles/:id
// @description Get single article by id
// @access Public
router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(404).json({ noarticlefound: 'No Article found' }));
});

// @route GET api/articles
// @description add/save article
// @access Public
router.post('/',async (req, res) => {
  try {
    let userName;
    const token = req.cookies.token;
    const payload = jwt.verify(token, secret);
    const article = req.body;
    
    if (!payload) {
      res.status(400).json({message: 'Dined'});
      return;
    }

    userName = payload.username;
    article.uploader = userName;
    await Article.create(article);
    
    res.status(200).json({message: 'Add article successfully'});
  } catch(err) {
    
    res.status(400).json({message: err.message});
  }
});

// @route GET api/articles/search
// @description search articles
// @access Public
router.get('/search/*', async (req, res) => {
  try {
    let column, keyword, articles, regx;
    const url = req.url;
    const match = url.match(/\/search\/(.+)\/(.*)$/);
    if (match && match[1]) {
      column = match[1];
      keyword = match[2];
      regx = new RegExp(`.*${keyword}.*`);
      articles = await Article.find({[column]: {$regex: regx, $options: 'i'}});
      res.status(200).json({data: await addCollectStatusToArticles(req, articles)});
    } else {
      res.status(200).json({data: []});
    }
  } catch(err) {
    res.status(400).json({message: 'Unable to search'});
  }
});

// @route GET api/articles/:id
// @description Update article
// @access Public
router.put('/:id', (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body)
    .then(article => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/articles/:id
// @description Delete article by id
// @access Public
router.delete('/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id, req.body)
    .then(article => res.json({ mgs: 'Article entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such article' }));
});

module.exports = router;