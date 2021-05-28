// server.js
require("dotenv").config()

import express, { json, static } from 'express';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import cors from 'cors';

// routes
import articles from './routes/api/articles';
import users from "./routes/api/users";
import collections from "./routes/api/collections";

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// cookie
app.use(cookieParser());

// Init Middleware
app.use(json({ extended: false }));

app.use(static(join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"));
});

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/articles', articles);
app.use('/api/users', users);
app.use('/api/collection', collections);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));