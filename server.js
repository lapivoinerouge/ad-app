const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

/* server */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});

/* websocket config */
const Ad = require('./models/ad.model');
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', (socket) => {
  Ad.find().then((ads) => {
    socket.emit('updatedAds', ads);
  })
});

app.use((req, res, next) => {
  req.io = io;
  next();
});