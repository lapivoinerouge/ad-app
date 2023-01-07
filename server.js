const express = require('express');
const cors = require('cors');
const connectToDB = require('./db');
require('dotenv').config();

const app = express();

/* routes */
const adRoutes = require('./routes/ads.routes');
const userRoutes = require('./routes/users.routes');

/* standard middleware */
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

/* mongoose */
connectToDB();

/* server */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});

/* API */
app.use('/api', adRoutes);
app.use('/api', userRoutes);