const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("../../models/User");
const secret = `simplaysecret`;

let saltRounds;
let router;

saltRounds = 10;
router = express.Router();

router.get('/check', async(req, res) => {
  try {
    const token = req.cookies.token;
    const payload = jwt.verify(token, secret);
    res.status(200).json({ payload });
  } catch(err) {
    res.status(500).json({message: `Unable to check`});
  }
})

router.post('/signup', async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({username});

    let hash;
    let newUser;

    if (user) {
      res.status(400).json({message: 'User existed'});
      return;
    }

    hash = await bcrypt.hash(password, saltRounds);
    newUser = new User({username, hash});
    await newUser.save();

    res.status(200).json({message: 'Sign up successfully'});
  } catch(err) {
    res.status(500).json({message: `Unable to sign up`});
  }
});

router.post('/signin', async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({username}); 
   
    let matched;
    let payload;
    let token;

    if (!user) {
      res.status(404).json({message: 'No User Found'});
      return;
    }

    matched = await bcrypt.compare(password, user.hash);
    if (!matched) {
      res.status(400).json({message: 'Password is not true'});
      return;
    }

    payload = { username };
    token = jwt.sign(payload, secret);
    res.cookie('token', token, {maxAge: 1000000000});

    res.status(200).json({message: 'Log in Successfully!'});
  } catch(err) {
    res.status(500).json({message: `Unable to log in`});
  }
});

router.get('/signout', async(req, res) => {
  try {
    res.cookie('token', '', {maxAge: 100000000000});
    res.send({message: 'sign out successfully'});
  } catch(err) {
    res.status(500).json({message: `Unable to log out`});
  }
});

module.exports = router;