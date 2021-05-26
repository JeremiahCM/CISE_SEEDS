// app.js

const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
var cors = require('cors');

// routes
const articles = require('./routes/api/articles');
const users = require("./routes/api/users");
const collections = require("./routes/api/collections");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// cookie
app.use(cookieParser());

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/articles', articles);
app.use('/api/users', users);
app.use('/api/collection', collections);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));