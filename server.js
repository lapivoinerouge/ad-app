const express = require('express');
const cors = require('cors');

const app = express();

/* standard middleware */
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

/* mongoose */
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

mongoose.connect('mongodb://localhost:27017/adApp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

/* server */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});