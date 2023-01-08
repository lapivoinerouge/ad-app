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
app.use(session({ 
  secret: process.env.SECRET,
  cookie: {
    secure: process.env.NODE_ENV == 'production',
    httpOnly: true,
  },
  store: MongoStore.create(mongoose.connection), 
  resave: false, 
  saveUninitialized: false }));

/* routes */
const adRoutes = require('./routes/ads.routes');
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

/* standard middleware */
if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

/* API */
app.use('/api', adRoutes);
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

app.use('/', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

/* server */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});