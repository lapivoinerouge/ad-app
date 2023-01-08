const express = require('express');
const cors = require('cors');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

/* mongoose */
require('./db');

/* Session initialization */
app.use(session({ secret: process.env.SECRET, store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false }));

/* routes */
const adRoutes = require('./routes/ads.routes');
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

/* standard middleware */
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

/* server */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});

/* API */
app.use('/api', adRoutes);
app.use('/api', userRoutes);
app.use('/auth', authRoutes);